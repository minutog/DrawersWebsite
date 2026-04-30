const CONFIG = {
  spreadsheetId: "1pFhU1NLxoplmKX1rKiXnqEzU6Q-B6O-ArmpjxlNlqAg",
  sheetName: "Drawers Mobile Leads",
  fromName: "Drawers",
  replyTo: "gonzalominuto@gmail.com",
  downloadUrl: "https://download.drawers.computer/Drawers.dmg",
  emailSubject: "Your Drawers download link",
};

function doGet() {
  return buildHtmlResponse_("Drawers mobile capture is running.");
}

function doPost(e) {
  try {
    const email = readParam_(e, "email");
    const source = readParam_(e, "source") || "Drawers mobile landing";
    const userAgent = readParam_(e, "userAgent");

    if (!isValidEmail_(email)) {
      return buildHtmlResponse_("invalid_email");
    }

    const sheet = getSheet_();
    sheet.appendRow([new Date(), email, source, userAgent, CONFIG.downloadUrl]);

    MailApp.sendEmail({
      to: email,
      subject: CONFIG.emailSubject,
      name: CONFIG.fromName,
      replyTo: CONFIG.replyTo,
      htmlBody: buildEmailHtml_(),
    });

    return buildHtmlResponse_("ok");
  } catch (error) {
    console.error(error);
    return buildHtmlResponse_("error");
  }
}

function getSheet_() {
  const spreadsheet = CONFIG.spreadsheetId
    ? SpreadsheetApp.openById(CONFIG.spreadsheetId)
    : SpreadsheetApp.getActiveSpreadsheet();

  if (!spreadsheet) {
    throw new Error("No spreadsheet found. Bind this Apps Script to a Google Sheet or set CONFIG.spreadsheetId.");
  }

  let sheet = spreadsheet.getSheetByName(CONFIG.sheetName);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.sheetName);
    sheet.appendRow(["Submitted At", "Email", "Source", "User Agent", "Download URL"]);
  }

  return sheet;
}

function buildEmailHtml_() {
  return [
    "<p>Thanks so much for your interest in Drawers.</p>",
    "<p>You can download it on your Mac here:</p>",
    `<p><a href="${CONFIG.downloadUrl}">${CONFIG.downloadUrl}</a></p>`,
    "<p>Enjoy.</p>",
  ].join("");
}

function buildHtmlResponse_(message) {
  return HtmlService.createHtmlOutput(`<html><body>${message}</body></html>`)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function readParam_(event, key) {
  return String((event && event.parameter && event.parameter[key]) || "").trim();
}

function isValidEmail_(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}
