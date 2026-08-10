/**
 * EmailButton — Reusable bulletproof email button matching website button styling.
 */
export function EmailButton({ href, children }) {
  return (
    <table
      role="presentation"
      cellPadding="0"
      cellSpacing="0"
      border="0"
      width="100%"
      style={{ margin: "24px 0" }}
    >
      <tr>
        <td align="center">
          <table role="presentation" cellPadding="0" cellSpacing="0" border="0">
            <tr>
              <td
                align="center"
                style={{
                  backgroundColor: "#141414",
                  borderRadius: "9999px",
                  padding: "0",
                }}
              >
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: "inline-block",
                    padding: "14px 32px",
                    fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
                    fontSize: "12.5px",
                    fontWeight: "bold",
                    color: "#ffffff",
                    textDecoration: "none",
                    textTransform: "uppercase",
                    letterSpacing: "1.5px",
                    borderRadius: "9999px",
                    border: "2px solid #141414",
                    backgroundColor: "#141414",
                  }}
                >
                  {children}
                </a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
}

export default EmailButton;
