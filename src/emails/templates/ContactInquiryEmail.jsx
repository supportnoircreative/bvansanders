import { EmailContainer } from "../components/EmailContainer";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";
import { EmailButton } from "../components/EmailButton";

export function ContactInquiryEmail({ name, email, interest, message, item, itemSize, isNotification = true }) {
  return (
    <EmailContainer previewText={isNotification ? `New Inquiry from ${name}: ${interest}` : `Thank you for contacting B. Van Sanders`}>
      <EmailHeader />

      <table
        role="presentation"
        cellPadding="0"
        cellSpacing="0"
        border="0"
        width="100%"
        className="email-card"
        style={{
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #e6e2da",
          padding: "32px 28px",
        }}
      >
        {/* Category Pill */}
        <tr>
          <td align="center" style={{ paddingBottom: "20px" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: "#fbf3e8",
                color: "#ff4e1f",
                fontFamily: "ui-monospace, monospace",
                fontSize: "11px",
                fontWeight: "bold",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "6px 16px",
                borderRadius: "9999px",
                border: "1px solid #e6e2da",
              }}
            >
              {isNotification ? "New Studio Inquiry 📩" : "Inquiry Received 💬"}
            </span>
          </td>
        </tr>

        {/* Heading */}
        <tr>
          <td align="center" style={{ paddingBottom: "16px" }}>
            <h1
              style={{
                margin: "0",
                fontFamily: "'Archivo Black', 'Arial Black', Arial, sans-serif",
                fontSize: "22px",
                fontWeight: "bold",
                color: "#141414",
                textTransform: "uppercase",
                letterSpacing: "-0.5px",
              }}
            >
              {isNotification ? "Studio Inquiry Received" : "Thank You For Reaching Out"}
            </h1>
          </td>
        </tr>

        {/* Intro */}
        <tr>
          <td style={{ paddingBottom: "20px" }}>
            <p
              style={{
                margin: "0",
                fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#6e6b66",
              }}
            >
              {isNotification
                ? `You have received a new website message from ${name} regarding ${interest}.`
                : `Hi ${name}, thank you for getting in touch with B. Van Sanders Art Studio. We have received your inquiry regarding "${interest}" and will get back to you shortly.`}
            </p>
          </td>
        </tr>

        {/* Details Box */}
        <tr>
          <td style={{ paddingBottom: "24px" }}>
            <table
              role="presentation"
              cellPadding="0"
              cellSpacing="0"
              border="0"
              width="100%"
              style={{
                backgroundColor: "#fafaf7",
                borderRadius: "8px",
                border: "1px solid #e6e2da",
                padding: "20px",
              }}
            >
              <tr>
                <td style={{ paddingBottom: "12px" }}>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "10.5px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      display: "block",
                    }}
                  >
                    Sender Name & Email
                  </span>
                  <strong style={{ fontFamily: "-apple-system, sans-serif", fontSize: "14px", color: "#141414" }}>
                    {name}
                  </strong>{" "}
                  &lt;
                  <a href={`mailto:${email}`} style={{ color: "#ff4e1f", textDecoration: "underline" }}>
                    {email}
                  </a>
                  &gt;
                </td>
              </tr>
              <tr>
                <td style={{ paddingBottom: "12px" }}>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "10.5px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      display: "block",
                    }}
                  >
                    Topic of Interest
                  </span>
                  <strong style={{ fontFamily: "ui-monospace, monospace", fontSize: "13px", color: "#141414" }}>
                    {interest}
                  </strong>
                </td>
              </tr>
              {item && (
                <tr>
                  <td style={{ paddingBottom: "12px" }}>
                    <span
                      style={{
                        fontFamily: "ui-monospace, monospace",
                        fontSize: "10.5px",
                        color: "#6e6b66",
                        textTransform: "uppercase",
                        letterSpacing: "1px",
                        display: "block",
                      }}
                    >
                      Item of Interest
                    </span>
                    <strong style={{ fontFamily: "-apple-system, sans-serif", fontSize: "14px", color: "#141414" }}>
                      &ldquo;{item}&rdquo;
                      {itemSize && (
                        <span style={{ fontFamily: "ui-monospace, monospace", fontSize: "12.5px", color: "#6e6b66" }}>
                          {" "}
                          &mdash; {itemSize}
                        </span>
                      )}
                    </strong>
                  </td>
                </tr>
              )}
              <tr>
                <td style={{ borderTop: "1px solid #e6e2da", paddingTop: "12px" }}>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "10.5px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Message Content
                  </span>
                  <p
                    style={{
                      margin: 0,
                      fontFamily: "-apple-system, sans-serif",
                      fontSize: "13.5px",
                      lineHeight: "1.6",
                      color: "#141414",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {message}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {!isNotification && (
          <tr>
            <td align="center">
              <EmailButton href="https://bvansanders.com/originals">Explore Catalog</EmailButton>
            </td>
          </tr>
        )}
      </table>

      <EmailFooter />
    </EmailContainer>
  );
}

export function getContactInquiryText({ name, email, interest, message, item, itemSize, isNotification = true }) {
  const itemLabel = item ? `Item: ${item}${itemSize ? ` (${itemSize})` : ""}` : null;

  if (isNotification) {
    return `
NEW STUDIO INQUIRY — B. VAN SANDERS

From: ${name} <${email}>
Topic: ${interest}
${itemLabel ? `${itemLabel}\n` : ""}
Message:
${message}
`.trim();
  }

  return `
INQUIRY RECEIVED — B. VAN SANDERS

Hi ${name},

Thank you for reaching out to B. Van Sanders. We have received your message regarding "${interest}" and will get back to you soon.

${itemLabel ? `${itemLabel}\n\n` : ""}Your Message:
${message}

B. Van Sanders Art Studio
`.trim();
}

export default ContactInquiryEmail;
