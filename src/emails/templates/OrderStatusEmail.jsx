import { EmailContainer } from "../components/EmailContainer";
import { EmailHeader } from "../components/EmailHeader";
import { EmailFooter } from "../components/EmailFooter";
import { EmailButton } from "../components/EmailButton";
import { formatUSD } from "@/utils/format";

const STATUS_CONFIG = {
  placed: {
    badge: "Order Placed",
    heading: "Order Received",
    message: "We've received your order and it is now being prepared in our studio.",
    badgeColor: "#ffc93c",
    textColor: "#141414",
  },
  pending: {
    badge: "Order Received",
    heading: "Order Received",
    message: "We've received your order and it is now being prepared in our studio.",
    badgeColor: "#ffc93c",
    textColor: "#141414",
  },
  processing: {
    badge: "Processing",
    heading: "Order In Preparation",
    message: "Your order is currently being framed and prepared for secure shipping.",
    badgeColor: "#ffc93c",
    textColor: "#141414",
  },
  shipped: {
    badge: "Dispatched",
    heading: "Order On Its Way!",
    message: "Great news! Your order has been carefully packaged and dispatched.",
    badgeColor: "#1e4fd6",
    textColor: "#ffffff",
  },
  dispatched: {
    badge: "Dispatched",
    heading: "Order On Its Way!",
    message: "Great news! Your order has been carefully packaged and dispatched.",
    badgeColor: "#1e4fd6",
    textColor: "#ffffff",
  },
  completed: {
    badge: "Delivered",
    heading: "Order Delivered!",
    message: "Your order has been delivered. We hope you love your new artwork!",
    badgeColor: "#141414",
    textColor: "#ffffff",
  },
  delivered: {
    badge: "Delivered",
    heading: "Order Delivered!",
    message: "Your order has been delivered. We hope you love your new artwork!",
    badgeColor: "#141414",
    textColor: "#ffffff",
  },
};

export function OrderStatusEmail({ order, status = "processing", appUrl = "http://localhost:3000" }) {
  const currentStatus = (status || order?.status || "processing").toLowerCase();
  const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.processing;
  const customerName = order?.customer?.name || "Valued Customer";
  const orderId = order?.id || "N/A";
  const items = order?.items || [];
  const total = formatUSD(order?.total ?? order?.subtotal ?? 0);
  const myOrdersUrl = `${appUrl}/orders`;

  return (
    <EmailContainer previewText={`Order Update #${orderId} — ${config.heading}`}>
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
        {/* Status Badge */}
        <tr>
          <td align="center" style={{ paddingBottom: "20px" }}>
            <span
              style={{
                display: "inline-block",
                backgroundColor: config.badgeColor,
                color: config.textColor,
                fontFamily: "ui-monospace, monospace",
                fontSize: "11px",
                fontWeight: "bold",
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                padding: "6px 16px",
                borderRadius: "9999px",
              }}
            >
              ● {config.badge}
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
              {config.heading}
            </h1>
          </td>
        </tr>

        {/* Message */}
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
              {config.message}
            </p>
          </td>
        </tr>

        {/* Order Card Summary */}
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
                <td>
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "11px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                    }}
                  >
                    Order Reference
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
                <td align="right">
                  <span
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "11px",
                      color: "#6e6b66",
                      textTransform: "uppercase",
                    }}
                  >
                    Total
                  </span>
                  <br />
                  <strong
                    style={{
                      fontFamily: "ui-monospace, monospace",
                      fontSize: "13.5px",
                      color: "#141414",
                    }}
                  >
                    {total}
                  </strong>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        {/* Product Items snippet */}
        {items.length > 0 && (
          <tr>
            <td style={{ paddingBottom: "24px" }}>
              <p
                style={{
                  margin: "0 0 10px 0",
                  fontFamily: "ui-monospace, monospace",
                  fontSize: "11px",
                  fontWeight: "bold",
                  color: "#6e6b66",
                  textTransform: "uppercase",
                }}
              >
                Order Contents ({items.length} {items.length === 1 ? "item" : "items"})
              </p>
              <ul style={{ margin: 0, paddingLeft: "20px", fontFamily: "-apple-system, sans-serif", fontSize: "13px", color: "#141414" }}>
                {items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: "4px" }}>
                    <strong>{item.title}</strong> {item.size ? `(${item.size})` : ""}
                  </li>
                ))}
              </ul>
            </td>
          </tr>
        )}

        {/* CTA Button */}
        <tr>
          <td align="center">
            <EmailButton href={myOrdersUrl}>Track My Order</EmailButton>
          </td>
        </tr>
      </table>

      <EmailFooter />
    </EmailContainer>
  );
}

export function getOrderStatusText(order, status = "processing", appUrl = "http://localhost:3000") {
  const currentStatus = (status || order?.status || "processing").toLowerCase();
  const config = STATUS_CONFIG[currentStatus] || STATUS_CONFIG.processing;
  const customerName = order?.customer?.name || "Customer";
  const orderId = order?.id || "N/A";

  return `
ORDER UPDATE — ${config.badge.toUpperCase()} — B. VAN SANDERS

Hi ${customerName},

${config.message}

Order Reference: ${orderId}

View full order details and track updates:
${appUrl}/orders

B. Van Sanders Art Studio
`.trim();
}

export default OrderStatusEmail;
