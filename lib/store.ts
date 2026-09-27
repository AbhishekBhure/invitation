import fs from "fs/promises";
import path from "path";
import { getDb, isMongoConfigured } from "./mongodb";
import { BookingRecord } from "./validation";

const DATA_DIR = path.join(process.cwd(), ".data");
const LOCAL_STORE_FILE = path.join(DATA_DIR, "meetings.json");

// Local File Store helper for offline / zero-config development
async function getLocalBookings(): Promise<BookingRecord[]> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    const content = await fs.readFile(LOCAL_STORE_FILE, "utf-8");
    return JSON.parse(content);
  } catch {
    return [];
  }
}

async function saveLocalBookings(bookings: BookingRecord[]): Promise<void> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  await fs.writeFile(LOCAL_STORE_FILE, JSON.stringify(bookings, null, 2), "utf-8");
}

export async function createBooking(booking: Omit<BookingRecord, "_id">): Promise<BookingRecord> {
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const collection = db.collection("meetings");
        const doc = {
          ...booking,
          createdAt: new Date(booking.createdAt),
        };
        const result = await collection.insertOne(doc);
        return {
          ...booking,
          _id: result.insertedId.toString(),
        };
      }
    } catch (err) {
      console.error("MongoDB insert failed, falling back to local store:", err);
    }
  }

  // Fallback to local file store
  const id = `local_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
  const record: BookingRecord = {
    ...booking,
    _id: id,
  };
  const current = await getLocalBookings();
  current.unshift(record);
  await saveLocalBookings(current);
  return record;
}

export async function getAllBookings(): Promise<BookingRecord[]> {
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const collection = db.collection("meetings");
        const docs = await collection.find({}).sort({ createdAt: -1 }).toArray();
        return docs.map((doc) => ({
          _id: doc._id.toString(),
          name: doc.name || "Chinna",
          date: doc.date,
          time: doc.time || "TBD",
          activity: doc.activity,
          activities: doc.activities || (doc.activity ? doc.activity.split(", ").map((s: string) => s.trim()) : []),
          notes: doc.notes,
          status: doc.status || "confirmed",
          createdAt: doc.createdAt instanceof Date ? doc.createdAt.toISOString() : String(doc.createdAt),
          notificationSent: Boolean(doc.notificationSent),
          notificationError: doc.notificationError,
          userAgent: doc.userAgent,
        }));
      }
    } catch (err) {
      console.error("MongoDB find failed, falling back to local store:", err);
    }
  }

  return await getLocalBookings();
}

export async function getLatestBooking(): Promise<BookingRecord | null> {
  const all = await getAllBookings();
  return all.length > 0 ? all[0] : null;
}

export async function updateBookingNotification(id: string, sent: boolean, error?: string): Promise<void> {
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const collection = db.collection("meetings");
        const { ObjectId } = await import("mongodb");
        if (ObjectId.isValid(id)) {
          await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { notificationSent: sent, notificationError: error || null } }
          );
          return;
        }
      }
    } catch (err) {
      console.error("MongoDB update failed, updating local store fallback:", err);
    }
  }

  const current = await getLocalBookings();
  const index = current.findIndex((b) => b._id === id);
  if (index !== -1) {
    current[index].notificationSent = sent;
    current[index].notificationError = error;
    await saveLocalBookings(current);
  }
}

export async function updateBookingTime(id: string, time: string): Promise<boolean> {
  if (isMongoConfigured()) {
    try {
      const db = await getDb();
      if (db) {
        const collection = db.collection("meetings");
        const { ObjectId } = await import("mongodb");
        if (ObjectId.isValid(id)) {
          await collection.updateOne(
            { _id: new ObjectId(id) },
            { $set: { time } }
          );
          return true;
        }
      }
    } catch (err) {
      console.error("MongoDB update time failed, falling back to local store:", err);
    }
  }

  const current = await getLocalBookings();
  const index = current.findIndex((b) => b._id === id);
  if (index !== -1) {
    current[index].time = time;
    await saveLocalBookings(current);
    return true;
  }
  return false;
}
