/* eslint-disable @next/next/no-head-element */
/**
 * EmailContainer — Bulletproof email container component.
 * Uses table layouts and inline CSS compatible with Gmail, Outlook, and mobile clients.
 */
export function EmailContainer({ children, previewText = "" }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>B. Van Sanders</title>
        <style dangerouslySetInnerHTML={{ __html: `
          body {
            margin: 0;
            padding: 0;
            background-color: #fafaf7;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            -webkit-font-smoothing: antialiased;
            color: #141414;
          }
          a {
            color: #141414;
            text-decoration: underline;
          }
          @media only screen and (max-width: 600px) {
            .email-container {
              width: 100% !important;
              padding-left: 12px !important;
              padding-right: 12px !important;
            }
            .email-card {
              padding: 20px 16px !important;
            }
            .item-image {
              width: 56px !important;
              height: 56px !important;
            }
          }
        `}} />
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: "#fafaf7", width: "100%" }}>
        {previewText && (
          <div style={{ display: "none", maxHeight: 0, overflow: "hidden", fontSize: 1, lineHeight: 1, color: "#fff", opacity: 0 }}>
            {previewText}
          </div>
        )}
        <table
          role="presentation"
          cellPadding="0"
          cellSpacing="0"
          border="0"
          width="100%"
          style={{ backgroundColor: "#fafaf7", tableLayout: "fixed" }}
        >
          <tr>
            <td align="center" style={{ padding: "32px 12px" }}>
              <table
                role="presentation"
                cellPadding="0"
                cellSpacing="0"
                border="0"
                width="100%"
                className="email-container"
                style={{ maxWidth: "600px", margin: "0 auto" }}
              >
                <tr>
                  <td>{children}</td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
}

export default EmailContainer;
