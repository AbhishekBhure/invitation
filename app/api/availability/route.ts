import { NextResponse } from "next/server";
import { ALLOWED_ACTIVITIES } from "@/lib/validation";
import { getAllBookings } from "@/lib/store";

export async function GET() {
  try {
    const today = new Date();
    const maxDate = "2026-10-31"; // Strictly till end of October 2026

    const bookings = await getAllBookings();
    const bookedDates = bookings
      .filter((b) => b.status === "confirmed")
      .map((b) => b.date);

    return NextResponse.json({
      success: true,
      minDate: today.toISOString().split("T")[0],
      maxDate,
      activities: ALLOWED_ACTIVITIES,
      bookedDates: Array.from(new Set(bookedDates)),
    });
  } catch (error) {
    console.error("Availability API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch availability" },
      { status: 500 }
    );
  }
}
