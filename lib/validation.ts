import { z } from "zod";

export const ALLOWED_ACTIVITIES = [
  { id: "coffee", title: "Coffee", emoji: "☕", tagline: "A warm cup & long conversations" },
  { id: "food", title: "Food", emoji: "🍕", tagline: "Good food, great gossip" },
  { id: "movie", title: "Movie", emoji: "🎬", tagline: "Popcorn & a great show" },
  { id: "walk", title: "Walk", emoji: "🌆", tagline: "Sunset breeze & endless walking" },
  { id: "surprise", title: "Surprise me", emoji: "✨", tagline: "You show up, I'll plan the rest" },
] as const;

export const bookingSchema = z.object({
  name: z.string().trim().min(1).max(50).default("Chinna"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"),
  time: z.string().optional().default("TBD"),
  activity: z.string().optional(),
  activities: z
    .array(z.string())
    .min(1, "Please choose at least one activity")
    .optional(),
  notes: z.string().max(300).optional(),
}).transform((data) => {
  // Ensure backward and forward compatibility between activity and activities
  const activitiesList =
    data.activities && data.activities.length > 0
      ? data.activities
      : data.activity
      ? [data.activity]
      : ["coffee"];
  return {
    ...data,
    time: data.time || "TBD",
    activities: activitiesList,
    activity: activitiesList.join(", "),
  };
});

export type BookingInput = z.infer<typeof bookingSchema>;

export interface BookingRecord {
  _id: string;
  name: string;
  date: string;
  time: string;
  activity: string;
  activities?: string[];
  notes?: string;
  status: "confirmed" | "rescheduled" | "cancelled";
  createdAt: string;
  notificationSent: boolean;
  notificationError?: string;
  userAgent?: string;
}
