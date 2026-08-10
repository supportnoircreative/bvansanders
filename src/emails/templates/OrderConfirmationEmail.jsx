import { EmailContainer } from "../components/EmailContainer";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";
import { EmailButton } from "../components/EmailButton";
import { formatUSD } from "@/utils/format";

function formatDate(iso) {
  if (!iso) return "—";
  try {
    return new Date(iso).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return String(iso);
  }
}

/**
 * OrderConfirmationEmail — React template for order confirmation emails.
 */
export function OrderConfirmationEmail({ order, appUrl = "http://localhost:3000" }) {
  const customerName = order?.customer?.name || "Valued Customer";
  const items = order?.items || [];
  const orderId = order?.id || "N/A";
  const orderDate = formatDate(order?.createdAt);
  const total = order?.total ?? order?.subtotal ?? 0;
  const subtotal = order?.subtotal ?? total;
  const shipping = order?.shipping ?? 0;
  const myOrdersUrl = `${appUrl}/orders`;

  return (
    <EmailContainer previewText={`Order Confirmed #${orderId} — Thank you for your purchase from B. Van Sanders`}>
      <EmailHeader />

      {/* Main Content Card */}
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
        {/* Banner Badge */}
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
              Order Confirmed 🎉
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
                fontSize: "24px",
                fontWeight: "bold",
                color: "#141414",
                textTransform: "uppercase",
                letterSpacing: "-0.5px",
              }}
            >
              Thank You For Your Order!
            </h1>
          </td>
        </tr>

        {/* Greeting & Intro Message */}
        <tr>
          <td style={{ paddingBottom: "24px" }}>
            <p
              style={{
                margin: "0 0 12px 0",
                fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
                fontSize: "15px",
                fontWeight: "600",
                color: "#141414",
              }}
            >
              Hi {customerName},
            </p>
            <p
              style={{
                margin: "0",
                fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
                fontSize: "14px",
                lineHeight: "1.6",
                color: "#6e6b66",
              }}
            >
              Thank you for shopping with B. Van Sanders. We have received your order and payment, and our studio is getting your artwork carefully prepared for shipment.
            </p>
          </td>
        </tr>

        {/* Order Details Metadata Box */}
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
                padding: "16px 20px",
              }}
            >
              <tr>
                <td style={{ paddingBottom: "8px" }}>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "11px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Order Number
                  </span>
                  <br />
                  <strong
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "13.5px",
                      color: "#141414",
                    }}
                  >
                    {orderId}
                  </strong>
                </td>
                <td align="right" style={{ paddingBottom: "8px" }}>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "11px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Order Date
                  </span>
                  <br />
                  <strong
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "13px",
                      color: "#141414",
                    }}
                  >
                    {orderDate}
                  </strong>
                </td>
              </tr>
              <tr>
                <td style={{ paddingTop: "8px", borderTop: "1px solid #e6e2da" }}>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "11px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Payment Status
                  </span>
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#141414",
                      color: "#ffffff",
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      marginTop: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    PAID
                  </span>
                </td>
                <td align="right" style={{ paddingTop: "8px", borderTop: "1px solid #e6e2da" }}>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "11px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                      letterSpacing: "1px",
                    }}
                  >
                    Order Status
                  </span>
                  <br />
                  <span
                    style={{
                      display: "inline-block",
                      backgroundColor: "#ffc93c",
                      color: "#141414",
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "10px",
                      fontWeight: "bold",
                      padding: "2px 8px",
                      borderRadius: "9999px",
                      marginTop: "2px",
                      textTransform: "uppercase",
                    }}
                  >
                    PROCESSING
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Purchased Products Header */}
        <tr>
          <td style={{ paddingBottom: "12px", borderBottom: "1px solid #141414" }}>
            <span
              style={{
                fontFamily: "ui-monospace, monospace",
                fontSize: "11.5px",
                fontWeight: "bold",
                color: "#141414",
                textTransform: "uppercase",
                letterSpacing: "1.5px",
              }}
            >
              Purchased Artwork ({items.length} {items.length === 1 ? "item" : "items"})
            </span>
          </td>
        </tr>

        {/* Purchased Products List */}
        <tr>
          <td style={{ paddingBottom: "20px" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%">
              {items.map((item, idx) => {
                const itemMeta = [item.frameLabel, item.size].filter(Boolean).join(" · ");
                return (
                  <tr key={idx} style={{ borderBottom: idx < items.length - 1 ? "1px solid #e6e2da" : "none" }}>
                    <td style={{ padding: "14px 0", verticalAlign: "top" }}>
                      <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%">
                        <tr>
                          {item.image && (
                            <td width="64" style={{ paddingRight: "14px", verticalAlign: "top" }}>
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={item.image}
                                alt={item.title || "Artwork"}
                                width="56"
                                height="56"
                                className="item-image"
                                style={{
                                  borderRadius: "6px",
                                  border: "1px solid #e6e2da",
                                  objectFit: "contain",
                                  backgroundColor: "#fafaf7",
                                  display: "block",
                                }}
                              />
                            </td>
                          )}
                          <td style={{ verticalAlign: "top" }}>
                            <p
                              style={{
                                margin: "0 0 4px 0",
                                fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
                                fontSize: "14px",
                                fontWeight: "bold",
                                color: "#141414",
                              }}
                            >
                              {item.title}
                            </p>
                            {itemMeta && (
                              <p
                                style={{
                                  margin: "0",
                                  fontFamily: "ui-monospace, monospace",
                                  fontSize: "11.5px",
                                  color: "#6e6b66",
                                }}
                              >
                                {itemMeta}
                              </p>
                            )}
                          </td>
                          <td align="right" style={{ verticalAlign: "top", paddingLeft: "12px" }}>
                            <p
                              style={{
                                margin: "0",
                                fontFamily: "ui-monospace, monospace",
                                fontSize: "13.5px",
                                fontWeight: "bold",
                                color: "#141414",
                              }}
                            >
                              {formatUSD(item.price ?? 0)}
                            </p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                );
              })}
            </table>
          </td>
        </tr>

        {/* Order Financial Summary */}
        <tr>
          <td style={{ paddingBottom: "24px", borderTop: "1px solid #e6e2da", paddingTop: "16px" }}>
            <table role="presentation" cellPadding="0" cellSpacing="0" border="0" width="100%">
              <tr>
                <td
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "12.5px",
                    color: "#6e6b66",
                    paddingBottom: "6px",
                  }}
                >
                  Subtotal
                </td>
                <td
                  align="right"
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    color: "#141414",
                    paddingBottom: "6px",
                  }}
                >
                  {formatUSD(subtotal)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "12.5px",
                    color: "#6e6b66",
                    paddingBottom: "10px",
                  }}
                >
                  Shipping
                </td>
                <td
                  align="right"
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "12.5px",
                    fontWeight: "600",
                    color: "#141414",
                    paddingBottom: "10px",
                  }}
                >
                  {shipping === 0 ? "Free (Insured)" : formatUSD(shipping)}
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "15px",
                    fontWeight: "bold",
                    color: "#141414",
                    paddingTop: "10px",
                    borderTop: "1px solid #141414",
                  }}
                >
                  Total Paid
                </td>
                <td
                  align="right"
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "16px",
                    fontWeight: "900",
                    color: "#ff4e1f",
                    paddingTop: "10px",
                    borderTop: "1px solid #141414",
                  }}
                >
                  {formatUSD(total)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Shipping Address (if present) */}
        {order?.customer?.address && (
          <tr>
            <td style={{ paddingBottom: "24px" }}>
              <div
                style={{
                  backgroundColor: "#fafaf7",
                  borderRadius: "8px",
                  border: "1px border #e6e2da",
                  padding: "16px",
                }}
              >
                <span
                  style={{
                    fontFamily: "ui-monospace, monospace",
                    fontSize: "10.5px",
                    fontWeight: "bold",
                    color: "#6e6b66",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Shipping Address
                </span>
                <p
                  style={{
                    margin: "0",
                    fontFamily: "-apple-system, BlinkMacSystemFont, Arial, sans-serif",
                    fontSize: "13px",
                    color: "#141414",
                    lineHeight: "1.5",
                  }}
                >
                  <strong>{order.customer.name}</strong>
                  <br />
                  {order.customer.address}
                  <br />
                  {[order.customer.city, order.customer.state, order.customer.zip].filter(Boolean).join(", ")}
                </p>
              </div>
            </td>
          </tr>
        )}

        {/* CTA Button */}
        <tr>
          <td align="center">
            <EmailButton href={myOrdersUrl}>View My Orders</EmailButton>
          </td>
        </tr>
      </table>

      <EmailFooter />
    </EmailContainer>
  );
}

/**
 * Plain text fallback generator for Order Confirmation.
 */
export function getOrderConfirmationText(order, appUrl = "http://localhost:3000") {
  const customerName = order?.customer?.name || "Customer";
  const orderId = order?.id || "N/A";
  const items = order?.items || [];
  const total = formatUSD(order?.total ?? order?.subtotal ?? 0);

  const itemLines = items
    .map((item) => `- ${item.title} x1 — ${formatUSD(item.price ?? 0)}`)
    .join("\n");

  return `
ORDER CONFIRMED — B. VAN SANDERS

Hi ${customerName},

Thank you for your order! We have received your payment and are preparing your artwork.

Order Number: ${orderId}
Total Paid: ${total}

PURCHASED ARTWORK:
${itemLines}

View your order on our site:
${appUrl}/orders

If you have any questions, reply to this email or contact us at bvansanders@gmail.com.

B. Van Sanders Art Studio
`.trim();
}

export default OrderConfirmationEmail;
