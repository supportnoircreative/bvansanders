import { siteConfig } from "@/config/site";

/**
 * EmailFooter — Branded email footer.
 */
export function EmailFooter() {
  const year = new Date().getFullYear();
  return (
    <table
      role="presentation"
      cellPadding="0"
      cellSpacing="0"
      border="0"
      width="100%"
      style={{ marginTop: "28px", borderTop: "1px solid #e6e2da", paddingTop: "20px" }}
    >
      <tr>
        <td align="center" style={{ textAlign: "center" }}>
          <p
            style={{
              margin: "0 0 6px 0",
              fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
              fontSize: "12px",
              fontWeight: "600",
              color: "#141414",
            }}
          >
            {siteConfig.name} Studio
          </p>
          <p
            style={{
              margin: "0 0 12px 0",
              fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
              fontSize: "11.5px",
              color: "#6e6b66",
              lineHeight: "1.5",
            }}
          >
            {siteConfig.contact.studio} · {siteConfig.contact.availability}
            <br />
            Questions? Contact us at{" "}
            <a
              href={`mailto:${siteConfig.contact.email}`}
              style={{ color: "#ff4e1f", textDecoration: "underline" }}
            >
              {siteConfig.contact.email}
            </a>
          </p>
          <p
            style={{
              margin: "0",
              fontFamily: "ui-monospace, monospace",
              fontSize: "10.5px",
              color: "#6e6b66",
            }}
          >
            © {year} {siteConfig.legalName || siteConfig.name}. All rights reserved.
          </p>
        </td>
      </tr>
    </table>
  );
}

export default EmailFooter;
