import { NextRequest, NextResponse } from "next/server";
import { bookingSchema } from "@/lib/validation";
import { createBooking, getAllBookings, updateBookingNotification } from "@/lib/store";
import { sendBookingNotificationEmail } from "@/lib/email";

// Simple in-memory rate limiter per IP
const ipRequests = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS_PER_WINDOW = 10;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = ipRequests.get(ip);
  if (!entry || now - entry.lastReset > RATE_LIMIT_WINDOW_MS) {
    ipRequests.set(ip, { count: 1, lastReset: now });
    return true;
  }
  if (entry.count >= MAX_REQUESTS_PER_WINDOW) {
    return false;
  }
  entry.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for")?.split(",")[0] || "127.0.0.1";
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a minute and try again." },
        { status: 429 }
      );
    }

    const body = await request.json();

    // 1. Zod input validation
    const parsed = bookingSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid booking information", details: parsed.error.format() },
        { status: 400 }
      );
    }

    const { name, date, time, activity, activities, notes } = parsed.data;

    // 2. Date sanity check - limited strictly to October 2026
    const bookingDate = new Date(`${date}T00:00:00`);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Limit till October 31, 2026
    const maxDate = new Date("2026-10-31T23:59:59");

    if (isNaN(bookingDate.getTime())) {
      return NextResponse.json({ error: "Invalid date format" }, { status: 400 });
    }

    if (bookingDate < today) {
      return NextResponse.json(
        { error: "Please select a date today or in the future." },
        { status: 400 }
      );
    }

    if (bookingDate > maxDate) {
      return NextResponse.json(
        { error: "Date selection is available till October 31, 2026 only." },
        { status: 400 }
      );
    }

    // 3. Duplicate prevention: check if identical date booking was submitted very recently
    const existing = await getAllBookings();
    const isDuplicate = existing.some((b) => {
      const matchDate = b.date === date;
      const createdTime = new Date(b.createdAt).getTime();
      const isRecent = Date.now() - createdTime < 5 * 60 * 1000;
      return matchDate && isRecent;
    });

    if (isDuplicate) {
      return NextResponse.json({
        success: true,
        message: "You already confirmed this date! Looking forward to it ❤️",
        isDuplicate: true,
      });
    }

    // 4. Save to Database (MongoDB or fallback)
    const newBooking = await createBooking({
      name: name || "Chinna",
      date,
      time: time || "TBD",
      activity,
      activities,
      notes: notes?.trim() || undefined,
      status: "confirmed",
      createdAt: new Date().toISOString(),
      notificationSent: false,
      userAgent: request.headers.get("user-agent") || undefined,
    });

    // 5. Trigger email notification asynchronously or handled safely
    let emailStatus = false;
    let emailError: string | undefined;

    try {
      const emailResult = await sendBookingNotificationEmail(newBooking);
      emailStatus = emailResult.success;
      emailError = emailResult.error;
    } catch (err: unknown) {
      emailStatus = false;
      emailError = err instanceof Error ? err.message : "Email sending error";
    }

    // Update notification status on booking record
    await updateBookingNotification(newBooking._id, emailStatus, emailError);

    return NextResponse.json(
      {
        success: true,
        bookingId: newBooking._id,
        booking: {
          ...newBooking,
          notificationSent: emailStatus,
        },
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred while saving your date. Please try again." },
      { status: 500 }
    );
  }
}
