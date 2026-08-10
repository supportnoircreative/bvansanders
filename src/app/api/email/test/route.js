import { EmailService } from "@/services/emailService";

function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

/**
 * Server-side Test Email Endpoint.
 * Allows testing Resend email templates without completing a real checkout.
 */
export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid JSON body." }, 400);
  }

  const { to, type = "confirmation" } = body ?? {};
  const recipient = to || process.env.CONTACT_EMAIL || "alikhanak012345@gmail.com";

  if (!recipient) {
    return jsonResponse({ error: "Recipient email parameter 'to' is required." }, 400);
  }

  const result = await EmailService.sendTestEmail({ to: recipient, type });

  if (!result.success) {
    return jsonResponse({
      success: false,
      error: result.error,
      details: "Ensure RESEND_API_KEY is set correctly in environment variables.",
    }, 500);
  }

  return jsonResponse({
    success: true,
    emailId: result.id,
    type,
    recipient,
    message: `Test email (${type}) dispatched successfully to ${recipient}.`,
  });
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const to = searchParams.get("to") || process.env.CONTACT_EMAIL || "alikhanak012345@gmail.com";
  const type = searchParams.get("type") || "confirmation";

  const result = await EmailService.sendTestEmail({ to, type });

  if (!result.success) {
    return jsonResponse({
      success: false,
      error: result.error,
    }, 500);
  }

  return jsonResponse({
    success: true,
    emailId: result.id,
    type,
    recipient: to,
    message: `Test email (${type}) sent successfully to ${to}.`,
  });
}
