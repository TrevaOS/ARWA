/**
 * Attiguppe Residents Welfare Association
 * Google Apps Script handles Contact & Join Us form submissions
 *
 * SETUP INSTRUCTIONS:
 * 1. Open your Google Sheet:
 *    https://docs.google.com/spreadsheets/d/1KpAb50781nLooXNTORr7qYheqOF0pcT7iq9GVsTYGbA/edit
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code and paste this entire file
 * 4. Click Deploy > New Deployment > Web App
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the deployment URL and paste it in:
 *    - src/pages/Contact.jsx   → GOOGLE_SCRIPT_URL
 *    - src/pages/Membership.jsx → GOOGLE_SCRIPT_URL
 * 6. Run installDailyTrigger() once manually from the Apps Script editor
 * 7. When you update the script: Deploy > Manage Deployments > Edit (pencil) > New version > Deploy
 *
 * HOW IT WORKS:
 * - Contact form submissions go to sheet "Contact"
 * - Join Us / Membership form submissions go to sheet "JoinUs"
 * - Every submission fires a confirmation email to the person + admin notification
 * - Admin notification goes to: tech@treva.in (To), ullas@treva.in & info@treva.in (BCC)
 * - A "Mail Status" column records: SENT / FAILED <reason>
 * - A daily trigger retries any failed emails
 */

// ── CONFIG ────────────────────────────────────────────────────────────────────
var SPREADSHEET_ID  = '1KpAb50781nLooXNTORr7qYheqOF0pcT7iq9GVsTYGbA';
var ADMIN_EMAIL     = 'tech@treva.in';
var BCC_EMAILS      = 'ullas@treva.in,info@treva.in';
var SENDER_NAME     = 'Attiguppe Residents Welfare Association';

// ── MAIN HANDLER ─────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    // formType: 'JoinUs' is set by the Membership form; Contact form does not set it
    var type = (data.formType === 'JoinUs' || data.fullName) ? 'JoinUs' : 'Contact';

    var ss    = SpreadsheetApp.openById(SPREADSHEET_ID);
    var sheet = getOrCreateSheet(ss, type);

    var mailStatus = 'PENDING';
    var mailReason = '';

    try {
      sendEmails(data, type);
      mailStatus = 'SENT';
    } catch (mailErr) {
      mailStatus = 'FAILED';
      mailReason = mailErr.toString();
    }

    var row = buildRow(data, type, mailStatus + (mailReason ? ' ' + mailReason : ''));
    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'ok' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    try {
      MailApp.sendEmail({
        to: ADMIN_EMAIL,
        bcc: BCC_EMAILS,
        subject: '[ARWA] Script Error',
        body: err.toString(),
      });
    } catch (e2) { /* ignore */ }

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ── SHEET SETUP ───────────────────────────────────────────────────────────────

function getOrCreateSheet(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
    if (name === 'Contact') {
      sheet.appendRow(['Timestamp', 'Name', 'Email', 'Phone', 'Subject', 'Message', 'Mail Status']);
    } else {
      sheet.appendRow(['Timestamp', 'Full Name', 'Email', 'Phone', 'Address', 'House No', 'Occupation', 'Member Type', 'Agreed', 'Mail Status']);
    }
    sheet.getRange(1, 1, 1, sheet.getLastColumn()).setFontWeight('bold');
  }
  return sheet;
}

// ── ROW BUILDER ───────────────────────────────────────────────────────────────

function buildRow(data, type, mailStatus) {
  var ts = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  if (type === 'Contact') {
    return [ts, data.name || '', data.email || '', data.phone || '', data.subject || '', data.message || '', mailStatus];
  } else {
    return [ts, data.fullName || '', data.email || '', data.phone || '', data.address || '', data.houseNo || '', data.occupation || '', data.memberType || data.plan || '', data.agree ? 'Yes' : 'No', mailStatus];
  }
}

// ── EMAIL SENDER ──────────────────────────────────────────────────────────────

function sendEmails(data, type) {
  var userEmail = data.email || '';
  var userName  = data.name || data.fullName || 'Resident';

  if (type === 'Contact') {
    if (userEmail) {
      MailApp.sendEmail({
        to:      userEmail,
        replyTo: ADMIN_EMAIL,
        name:    SENDER_NAME,
        subject: 'We received your message Attiguppe RWA',
        htmlBody: contactConfirmationHtml(userName, data),
      });
    }
    MailApp.sendEmail({
      to:      ADMIN_EMAIL,
      bcc:     BCC_EMAILS,
      name:    SENDER_NAME,
      subject: '[ARWA Contact] New message from ' + userName,
      htmlBody: adminContactHtml(data),
    });

  } else {
    if (userEmail) {
      MailApp.sendEmail({
        to:      userEmail,
        replyTo: ADMIN_EMAIL,
        name:    SENDER_NAME,
        subject: 'Membership Application Received Attiguppe RWA',
        htmlBody: membershipConfirmationHtml(userName, data),
      });
    }
    MailApp.sendEmail({
      to:      ADMIN_EMAIL,
      bcc:     BCC_EMAILS,
      name:    SENDER_NAME,
      subject: '[ARWA Join Us] New application from ' + userName,
      htmlBody: adminMembershipHtml(data),
    });
  }
}

// ── DAILY RETRY TRIGGER ───────────────────────────────────────────────────────
// Run this once manually to install the daily trigger

function installDailyTrigger() {
  ScriptApp.getProjectTriggers().forEach(function(t) {
    if (t.getHandlerFunction() === 'retryUnsentEmails') ScriptApp.deleteTrigger(t);
  });
  ScriptApp.newTrigger('retryUnsentEmails')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();
}

function retryUnsentEmails() {
  var ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  ['Contact', 'JoinUs'].forEach(function(sheetName) {
    var sheet = ss.getSheetByName(sheetName);
    if (!sheet) return;

    var data        = sheet.getDataRange().getValues();
    var mailColIdx  = data[0].indexOf('Mail Status');
    if (mailColIdx === -1) return;

    for (var i = 1; i < data.length; i++) {
      var row = data[i];
      var status = String(row[mailColIdx]);
      if (status.indexOf('SENT') === -1) {
        var obj = {};
        if (sheetName === 'Contact') {
          obj = { name: row[1], email: row[2], phone: row[3], subject: row[4], message: row[5] };
        } else {
          obj = { fullName: row[1], email: row[2], phone: row[3], address: row[4], houseNo: row[5], occupation: row[6], memberType: row[7], agree: true };
        }
        try {
          sendEmails(obj, sheetName);
          sheet.getRange(i + 1, mailColIdx + 1).setValue('SENT (retried)');
        } catch (err) {
          sheet.getRange(i + 1, mailColIdx + 1).setValue('FAILED ' + err.toString());
        }
      }
    }
  });
}

// ── EMAIL TEMPLATES ───────────────────────────────────────────────────────────

function contactConfirmationHtml(name, d) {
  return '<div style="font-family:sans-serif;max-width:600px;margin:0 auto">'
    + '<div style="background:linear-gradient(135deg,#2D6A4F,#1B4332);padding:32px;border-radius:12px 12px 0 0;text-align:center">'
    + '<h1 style="color:white;margin:0;font-size:22px">Attiguppe Residents Welfare Association</h1>'
    + '<p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:13px">By the people, for the people, with the people</p>'
    + '</div>'
    + '<div style="background:#fff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5">'
    + '<p style="font-size:16px">Dear <strong>' + name + '</strong>,</p>'
    + '<p>Thank you for reaching out to us. We have received your message and our team will get back to you within 24 hours.</p>'
    + '<table style="width:100%;border-collapse:collapse;margin:20px 0">'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold;width:30%">Subject</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.subject || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.message || '–') + '</td></tr>'
    + '</table>'
    + '<p style="color:#888;font-size:13px">For urgent concerns, call us at +91 9986020447 (Dr. Chandana Pradeep, President).</p>'
    + '<p style="margin-top:24px">Warm regards,<br><strong>Attiguppe RWA Team</strong></p>'
    + '</div></div>';
}

function adminContactHtml(d) {
  return '<div style="font-family:sans-serif;max-width:600px">'
    + '<h2 style="color:#1a2a3a">New Contact Form Submission ARWA Website</h2>'
    + '<table style="width:100%;border-collapse:collapse">'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold;width:30%">Name</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.name || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.email || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.phone || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Subject</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.subject || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Message</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.message || '–') + '</td></tr>'
    + '</table></div>';
}

function membershipConfirmationHtml(name, d) {
  return '<div style="font-family:sans-serif;max-width:600px;margin:0 auto">'
    + '<div style="background:linear-gradient(135deg,#2D6A4F,#1B4332);padding:32px;border-radius:12px 12px 0 0;text-align:center">'
    + '<h1 style="color:white;margin:0;font-size:22px">Attiguppe Residents Welfare Association</h1>'
    + '<p style="color:rgba(255,255,255,0.7);margin:8px 0 0;font-size:13px">By the people, for the people, with the people</p>'
    + '</div>'
    + '<div style="background:#fff;padding:32px;border-radius:0 0 12px 12px;border:1px solid #e5e5e5">'
    + '<p style="font-size:16px">Dear <strong>' + name + '</strong>,</p>'
    + '<p>Thank you for applying to join the Attiguppe Residents Welfare Association! We are thrilled to welcome you to our community.</p>'
    + '<table style="width:100%;border-collapse:collapse;margin:20px 0">'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold;width:35%">Member Type</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.memberType || d.plan || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.phone || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Address</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.address || '–') + '</td></tr>'
    + '</table>'
    + '<p>Our team will review your application and confirm your membership within <strong>3–5 working days</strong>. You will be contacted with further details.</p>'
    + '<p style="color:#888;font-size:13px">For questions, call us at +91 9986020447 (Dr. Chandana Pradeep, President).</p>'
    + '<p style="margin-top:24px">Welcome to the community!<br><strong>Attiguppe RWA Team</strong></p>'
    + '</div></div>';
}

function adminMembershipHtml(d) {
  return '<div style="font-family:sans-serif;max-width:600px">'
    + '<h2 style="color:#1a2a3a">New Membership Application ARWA Website</h2>'
    + '<table style="width:100%;border-collapse:collapse">'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold;width:35%">Full Name</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.fullName || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.email || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Phone</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.phone || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Member Type</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.memberType || d.plan || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">House No</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.houseNo || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Address</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.address || '–') + '</td></tr>'
    + '<tr><td style="padding:8px;background:#f4f9fd;font-weight:bold">Occupation</td><td style="padding:8px;border:1px solid #e5e5e5">' + (d.occupation || '–') + '</td></tr>'
    + '</table></div>';
}
