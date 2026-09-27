"use client";

import React, { useState, useEffect } from "react";
import { Lock, RefreshCw, Send, CheckCircle, AlertCircle, Calendar, Clock, Heart, Shield, Sparkles, Check } from "lucide-react";
import { BookingRecord, ALLOWED_ACTIVITIES } from "@/lib/validation";

const COMMON_TIMES = ["5:00 PM", "6:00 PM", "6:30 PM", "7:00 PM", "7:30 PM", "8:00 PM"];

export default function AdminPage() {
  const [secret, setSecret] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [resendingId, setResendingId] = useState<string | null>(null);

  // Time editing state per booking
  const [timeInputs, setTimeInputs] = useState<Record<string, string>>({});
  const [savingTimeId, setSavingTimeId] = useState<string | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("chinna_admin_secret");
    if (saved) {
      setSecret(saved);
      fetchBookings(saved);
    }
  }, []);

  const fetchBookings = async (secretToUse: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin?secret=${encodeURIComponent(secretToUse)}`, {
        headers: {
          "x-admin-secret": secretToUse,
        },
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Authentication failed");
      }

      setBookings(data.bookings || []);
      setIsAuthenticated(true);
      localStorage.setItem("chinna_admin_secret", secretToUse);

      // Initialize time inputs
      const initialTimes: Record<string, string> = {};
      (data.bookings || []).forEach((b: BookingRecord) => {
        initialTimes[b._id] = b.time && b.time !== "TBD" ? b.time : "";
      });
      setTimeInputs(initialTimes);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error fetching bookings";
      setError(msg);
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (secret.trim()) {
      fetchBookings(secret.trim());
    }
  };

  const handleSaveTime = async (bookingId: string) => {
    const timeToSet = timeInputs[bookingId]?.trim();
    if (!timeToSet) return;

    setSavingTimeId(bookingId);
    setActionMessage(null);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          action: "update_time",
          bookingId,
          time: timeToSet,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to update time");

      setActionMessage(`Updated time to "${timeToSet}" for this meet-up!`);
      // Update in state
      setBookings((prev) =>
        prev.map((b) => (b._id === bookingId ? { ...b, time: timeToSet } : b))
      );
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error updating time";
      setActionMessage(`Error: ${msg}`);
    } finally {
      setSavingTimeId(null);
    }
  };

  const handleResendEmail = async (bookingId: string) => {
    setResendingId(bookingId);
    setActionMessage(null);
    try {
      const res = await fetch("/api/admin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({
          action: "resend_email",
          bookingId,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to resend");

      setActionMessage("Notification email sent successfully!");
      fetchBookings(secret);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error sending email";
      setActionMessage(`Error: ${msg}`);
    } finally {
      setResendingId(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("chinna_admin_secret");
    setIsAuthenticated(false);
    setSecret("");
    setBookings([]);
  };

  return (
    <div className="min-h-screen bg-stone-50 py-10 px-4 sm:px-6 font-sans">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-stone-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-rose-600 text-white flex items-center justify-center shadow-sm">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-stone-900 tracking-tight flex items-center gap-2">
                <span>Meetup Admin Dashboard</span>
                <Heart className="w-4 h-4 text-rose-500 fill-rose-500" />
              </h1>
              <p className="text-xs text-stone-500">
                You control the schedule and finalize meeting details
              </p>
            </div>
          </div>

          {isAuthenticated && (
            <div className="flex items-center gap-2">
              <button
                onClick={() => fetchBookings(secret)}
                disabled={isLoading}
                className="p-2 rounded-xl bg-white border border-stone-200 text-stone-600 hover:text-stone-900 hover:bg-stone-50 transition-colors cursor-pointer text-xs flex items-center gap-1.5 font-medium"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? "animate-spin" : ""}`} />
                <span className="hidden sm:inline">Refresh</span>
              </button>
              <button
                onClick={handleLogout}
                className="px-3 py-2 rounded-xl border border-stone-200 text-stone-500 hover:text-red-600 hover:border-red-200 text-xs font-medium transition-colors cursor-pointer"
              >
                Log out
              </button>
            </div>
          )}
        </div>

        {/* Login state */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto bg-white p-8 rounded-3xl border border-stone-200 shadow-sm text-center">
            <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 mx-auto flex items-center justify-center mb-4 border border-rose-100">
              <Lock className="w-6 h-6" />
            </div>
            <h2 className="text-lg font-bold text-stone-900 mb-1">Enter Admin Secret</h2>
            <p className="text-xs text-stone-500 mb-6">
              Enter your <code className="bg-stone-100 px-1 py-0.5 rounded text-stone-700">ADMIN_SECRET</code> configured in your environment.
            </p>

            <form onSubmit={handleLogin} className="space-y-4">
              <input
                type="password"
                placeholder="Admin Secret password..."
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500 bg-stone-50"
                autoFocus
              />

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-xl text-xs font-medium border border-red-200">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || !secret}
                className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-sm shadow-md transition-all cursor-pointer disabled:opacity-50"
              >
                {isLoading ? "Verifying..." : "Unlock Dashboard"}
              </button>
            </form>
          </div>
        ) : (
          /* Bookings List */
          <div className="space-y-6">
            {actionMessage && (
              <div className="p-3 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-xl text-xs font-semibold flex items-center justify-between">
                <span>{actionMessage}</span>
                <button
                  onClick={() => setActionMessage(null)}
                  className="text-stone-400 hover:text-stone-600 text-sm"
                >
                  ✕
                </button>
              </div>
            )}

            {bookings.length === 0 ? (
              <div className="bg-white rounded-3xl p-12 text-center border border-stone-200 shadow-2xs">
                <div className="text-4xl mb-3">👀</div>
                <h3 className="text-base font-bold text-stone-800 mb-1">
                  No responses yet!
                </h3>
                <p className="text-xs text-stone-500 max-w-sm mx-auto">
                  Send your link to Chinna. As soon as she confirms an October date, it will appear here in real time.
                </p>
              </div>
            ) : (
              bookings.map((booking) => {
                const formattedDate = new Date(`${booking.date}T00:00:00`).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
                const submissionTime = new Date(booking.createdAt).toLocaleString();

                // Format chosen activities
                const activeIds = booking.activities && booking.activities.length > 0
                  ? booking.activities
                  : booking.activity.split(", ").map((s) => s.trim());
                const matchingActivities = ALLOWED_ACTIVITIES.filter((a) =>
                  activeIds.includes(a.id)
                );

                const hasCustomTime = booking.time && booking.time !== "TBD";

                return (
                  <div
                    key={booking._id}
                    className="bg-white rounded-3xl p-6 border border-stone-200 shadow-sm relative overflow-hidden transition-all hover:shadow-md"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-100 mb-1">
                          ❤️ Meet-Up Confirmed
                        </div>
                        <h2 className="text-2xl font-black text-stone-900">
                          {booking.name || "Chinna"}
                        </h2>
                      </div>

                      <div className="flex flex-col items-end gap-1">
                        <span className="text-[11px] text-stone-400">
                          Booked on: {submissionTime}
                        </span>
                        {booking.notificationSent ? (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                            <CheckCircle className="w-3.5 h-3.5" /> Email Sent
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                            <AlertCircle className="w-3.5 h-3.5" /> Email Pending / Not Sent
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Booking Details Summary */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 bg-stone-50 rounded-2xl border border-stone-200/70 mb-4">
                      <div className="flex items-center gap-2.5">
                        <Calendar className="w-4 h-4 text-stone-400" />
                        <div>
                          <div className="text-[10px] text-stone-400 font-semibold uppercase">Date</div>
                          <div className="text-xs font-bold text-stone-800">{formattedDate}</div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <Clock className="w-4 h-4 text-stone-400" />
                        <div>
                          <div className="text-[10px] text-stone-400 font-semibold uppercase">Time</div>
                          <div className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                            {hasCustomTime ? (
                              <span className="text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                {booking.time}
                              </span>
                            ) : (
                              <span className="text-amber-700 bg-amber-100 px-2 py-0.5 rounded font-normal">
                                Not set yet (Authority with Admin)
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Multi-Activities list */}
                    <div className="mb-4">
                      <div className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                        <Sparkles className="w-3.5 h-3.5 text-rose-500" />
                        <span>Her Chosen Activities:</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchingActivities.length > 0 ? (
                          matchingActivities.map((act) => (
                            <span
                              key={act.id}
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-xl bg-rose-50 border border-rose-200 text-xs font-bold text-gray-800"
                            >
                              <span>{act.emoji}</span>
                              <span>{act.title}</span>
                            </span>
                          ))
                        ) : (
                          <span className="text-xs text-stone-600 bg-stone-100 px-2.5 py-1 rounded-lg">
                            {booking.activity}
                          </span>
                        )}
                      </div>
                    </div>

                    {booking.notes && (
                      <div className="text-xs text-stone-700 bg-rose-50/50 p-3 rounded-xl border border-rose-100 mb-4">
                        <span className="font-semibold text-rose-600">Her Craving / Note: </span>
                        {booking.notes}
                      </div>
                    )}

                    {/* Admin Time Assignment Section */}
                    <div className="p-4 bg-stone-100/70 rounded-2xl border border-stone-200 mb-4">
                      <div className="text-xs font-bold text-stone-800 mb-2 flex items-center justify-between">
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5 text-rose-600" />
                          <span>Set or Adjust Meeting Time (Admin Only):</span>
                        </span>
                        {hasCustomTime && (
                          <span className="text-[11px] text-emerald-700 font-semibold">
                            Current: {booking.time}
                          </span>
                        )}
                      </div>

                      {/* Quick chips */}
                      <div className="flex flex-wrap gap-1.5 mb-2.5">
                        {COMMON_TIMES.map((t) => (
                          <button
                            key={t}
                            type="button"
                            onClick={() =>
                              setTimeInputs((prev) => ({ ...prev, [booking._id]: t }))
                            }
                            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                              timeInputs[booking._id] === t
                                ? "bg-rose-600 text-white font-bold"
                                : "bg-white hover:bg-rose-50 text-stone-700 border border-stone-200"
                            }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <input
                          type="text"
                          placeholder="Or type custom time (e.g. 6:45 PM, 8:00 PM)..."
                          value={timeInputs[booking._id] || ""}
                          onChange={(e) =>
                            setTimeInputs((prev) => ({
                              ...prev,
                              [booking._id]: e.target.value,
                            }))
                          }
                          className="flex-1 px-3 py-2 bg-white rounded-xl border border-stone-300 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
                        />
                        <button
                          type="button"
                          onClick={() => handleSaveTime(booking._id)}
                          disabled={
                            savingTimeId === booking._id ||
                            !timeInputs[booking._id]?.trim()
                          }
                          className="px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-bold transition-all flex items-center gap-1 cursor-pointer disabled:opacity-50"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>{savingTimeId === booking._id ? "Saving..." : "Save Time"}</span>
                        </button>
                      </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                      <span className="text-[11px] text-stone-400 font-mono">
                        ID: {booking._id}
                      </span>

                      <button
                        onClick={() => handleResendEmail(booking._id)}
                        disabled={resendingId === booking._id}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-semibold transition-colors cursor-pointer disabled:opacity-50"
                      >
                        <Send className={`w-3 h-3 ${resendingId === booking._id ? "animate-spin" : ""}`} />
                        <span>{resendingId === booking._id ? "Sending..." : "Resend Email Notification"}</span>
                      </button>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}
      </div>
    </div>
  );
}
