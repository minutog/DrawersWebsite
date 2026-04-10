# Drawers Mobile Email Capture

This Google Apps Script stores mobile email signups in a Google Sheet and sends an automatic email with the Drawers download link.

## Setup

1. Create a new Google Sheet where you want to store the emails.
2. In that Sheet, open `Extensions -> Apps Script`.
3. Replace the default script with the contents of [Code.gs](/Users/gonzalominuto/Documents/IDEP/DrawersWebsite/google-apps-script/Code.gs).
4. Replace the manifest with [appsscript.json](/Users/gonzalominuto/Documents/IDEP/DrawersWebsite/google-apps-script/appsscript.json).
5. If the script is not bound to the Sheet, paste your Sheet ID into `CONFIG.spreadsheetId` in `Code.gs`.
6. Deploy it as a Web App:
   - Execute as: `Me`
   - Who has access: `Anyone`
7. Copy the `/exec` URL from the deployment.
8. Paste that URL into `mobileEmailCapture.appsScriptEndpoint` in [script.js](/Users/gonzalominuto/Documents/IDEP/DrawersWebsite/script.js#L6).

## What Happens

- Every mobile email is appended to a tab named `Mobile Leads`.
- The visitor receives an automatic email with the Drawers download link.
- Until you paste the Apps Script URL into `script.js`, the site keeps using the current FormSubmit fallback.
