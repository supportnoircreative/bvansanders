import { EmailService } from "@/services/emailService";

function jsonResponse(data, status = 200) {
  return Response.json(data, { status });
}

export async function POST(request) {
  let body;
  try {
    body = await request.json();
  } catch {
    return jsonResponse({ error: "Invalid request payload." }, 400);
  }

  const { name, email, interest, message, item, itemSize } = body ?? {};

  if (!name || !email || !message) {
    return jsonResponse({ error: "Name, email, and message are required." }, 400);
  }

  try {
    const result = await EmailService.sendContactInquiry({ name, email, interest, message, item, itemSize });

    if (!result.success) {
      console.error("[api/contact] Resend failed to deliver inquiry:", result.error);
      return jsonResponse({
        success: false,
        error: result.error || "Failed to deliver inquiry email.",
      }, 500);
    }

    return jsonResponse({
      success: true,
      emailId: result.studioEmailId,
      message: "Your inquiry has been submitted and sent to the studio.",
    });
  } catch (error) {
    console.error("[api/contact] Error processing inquiry:", error);
    return jsonResponse({ error: "Failed to process inquiry." }, 500);
  }
}
