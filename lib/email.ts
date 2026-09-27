import { Resend } from "resend";
import { BookingRecord } from "./validation";

const resendApiKey = process.env.RESEND_API_KEY;
const resend = resendApiKey ? new Resend(resendApiKey) : null;

export async function sendBookingNotificationEmail(booking: BookingRecord): Promise<{ success: boolean; error?: string }> {
  const recipient = process.env.NOTIFICATION_EMAIL;
  const fromEmail = process.env.FROM_EMAIL || "Chinna Date <onboarding@resend.dev>";

  if (!resend || !recipient || recipient === "you@example.com") {
    console.log("ℹ️ [Email Mock Mode] Resend API key or notification recipient not configured.");
    console.log(`📨 Simulated Email:
      To: ${recipient || "N/A"}
      Subject: ❤️ Chinna finally picked a date!
      Details: ${booking.name} chose ${booking.date} at ${booking.time} (${booking.activity})
    `);
    return { success: true };
  }

  try {
    const formattedDate = new Date(`${booking.date}T00:00:00`).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8" />
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fff5f5; color: #1f2937; margin: 0; padding: 24px; }
            .card { max-width: 520px; margin: 0 auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 10px 25px rgba(225, 29, 72, 0.1); border: 1px solid #ffe4e6; }
            .header { background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%); padding: 32px 24px; text-align: center; color: #ffffff; }
            .header h1 { margin: 0 0 8px; font-size: 24px; font-weight: 700; letter-spacing: -0.5px; }
            .content { padding: 28px 24px; }
            .highlight-box { background-color: #fff1f2; border: 1px solid #fecdd3; border-radius: 14px; padding: 18px; margin: 20px 0; }
            .item { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px dashed #fda4af; }
            .item:last-child { border-bottom: none; }
            .label { font-size: 14px; color: #881337; font-weight: 500; }
            .value { font-size: 15px; color: #1e1b4b; font-weight: 700; }
            .footer { text-align: center; font-size: 13px; color: #9ca3af; padding: 16px 24px 24px; }
          </style>
        </head>
        <body>
          <div class="card">
            <div class="header">
              <h1>❤️ It's finally happening!</h1>
              <p style="margin: 0; opacity: 0.9; font-size: 15px;">Chinna just confirmed the meet-up date</p>
            </div>
            <div class="content">
              <p style="font-size: 16px; line-height: 1.5; color: #374151; margin-top: 0;">
                No more "sometime soon" or endless rescheduling. Chinna officially locked it in on the calendar:
              </p>
              
              <div class="highlight-box">
                <div class="item">
                  <span class="label">📅 Date: </span>
                  <span class="value">${formattedDate}</span>
                </div>
                <div class="item">
                  <span class="label">⏰ Time: </span>
                  <span class="value">${booking.time}</span>
                </div>
                <div class="item">
                  <span class="label">✨ Plan: </span>
                  <span class="value" style="text-transform: capitalize;">${booking.activity}</span>
                </div>
                ${booking.notes ? `
                <div class="item">
                  <span class="label">💌 Note: </span>
                  <span class="value">${booking.notes}</span>
                </div>
                ` : ""}
              </div>

              <p style="font-size: 14px; color: #4b5563; text-align: center; margin: 24px 0 8px;">
                🎉 Don't forget to put this on your personal calendar!
              </p>
            </div>
            <div class="footer">
              Sent via your personalized Chinna Meetup app 💖
            </div>
          </div>
        </body>
      </html>
    `;

    const { error } = await resend.emails.send({
      from: fromEmail,
      to: recipient,
      subject: `❤️ ${booking.name || "Chinna"} finally picked a date!`,
      html,
    });

    if (error) {
      console.error("Resend API error:", error);
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error sending email";
    console.error("Failed to send booking notification email:", errorMsg);
    return { success: false, error: errorMsg };
  }
}
