/**
 * EmailHeader — Branded header for B. Van Sanders transactional emails.
 */
export function EmailHeader() {
  return (
    <table
      role="presentation"
      cellPadding="0"
      cellSpacing="0"
      border="0"
      width="100%"
      style={{ marginBottom: "24px" }}
    >
      <tr>
        <td
          align="center"
          style={{
            padding: "24px 20px 20px 20px",
            backgroundColor: "#141414",
            borderRadius: "12px 12px 0 0",
            borderBottom: "3px solid #ff4e1f",
          }}
        >
          <table role="presentation" cellPadding="0" cellSpacing="0" border="0">
            <tr>
              <td align="center">
                <span
                  style={{
                    fontFamily: "'Archivo Black', 'Arial Black', Arial, sans-serif",
                    fontSize: "22px",
                    fontWeight: "900",
                    letterSpacing: "3px",
                    color: "#ffffff",
                    textTransform: "uppercase",
                    display: "block",
                  }}
                >
                  B. VAN SANDERS
                </span>
                <span
                  style={{
                    fontFamily: "ui-monospace, 'IBM Plex Mono', monospace, Arial",
                    fontSize: "10px",
                    letterSpacing: "2.5px",
                    color: "#ff4e1f",
                    textTransform: "uppercase",
                    display: "block",
                    marginTop: "4px",
                    fontWeight: "600",
                  }}
                >
                  FINE ART & ORIGINAL PRINTS
                </span>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  );
}

export default EmailHeader;
