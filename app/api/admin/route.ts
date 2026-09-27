import { NextRequest, NextResponse } from "next/server";
import { getAllBookings, updateBookingNotification, updateBookingTime } from "@/lib/store";
import { sendBookingNotificationEmail } from "@/lib/email";

function isAuthenticated(request: NextRequest): boolean {
  const secret = process.env.ADMIN_SECRET || "chinna2026";
  const headerSecret = request.headers.get("x-admin-secret");
  const querySecret = request.nextUrl.searchParams.get("secret");

  return (headerSecret === secret || querySecret === secret);
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  const bookings = await getAllBookings();
  return NextResponse.json({ success: true, bookings });
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { action, bookingId } = body;

    if (action === "update_time") {
      const { time } = body;
      if (!bookingId || !time) {
        return NextResponse.json({ error: "Booking ID and time are required" }, { status: 400 });
      }

      const updated = await updateBookingTime(bookingId, time.trim());
      if (!updated) {
        return NextResponse.json({ error: "Booking not found or could not update" }, { status: 404 });
      }

      return NextResponse.json({
        success: true,
        message: `Meeting time updated to ${time}!`,
      });
    }

    if (action === "resend_email" && bookingId) {
      const bookings = await getAllBookings();
      const booking = bookings.find((b) => b._id === bookingId);
      if (!booking) {
        return NextResponse.json({ error: "Booking not found" }, { status: 404 });
      }

      const emailResult = await sendBookingNotificationEmail(booking);
      await updateBookingNotification(bookingId, emailResult.success, emailResult.error);

      return NextResponse.json({
        success: emailResult.success,
        error: emailResult.error,
        message: emailResult.success ? "Notification resent successfully!" : "Notification failed to send",
      });
    }

    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  } catch (error) {
    console.error("Admin POST error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
