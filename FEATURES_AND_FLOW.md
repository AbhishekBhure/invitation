# 💖 Chinna Meet-Up Web Application — Features & Architecture Flow

> A personal, playful, and responsive Next.js invitation web application crafted for **Chinna** to break the rescheduling streak and lock in a date for October 2026.

---

## 📋 Table of Contents
1. [Overview & Vision](#1-overview--vision)
2. [High-Level Architecture](#2-high-level-architecture)
3. [User Experience (Chinna's Journey)](#3-user-experience-chinnas-journey)
4. [Step-by-Step Interactive Flow](#4-step-by-step-interactive-flow)
5. [Admin Management Dashboard (`/admin`)](#5-admin-management-dashboard-admin)
6. [Data Flow & API Specifications](#6-data-flow--api-specifications)
7. [Storage & Database Strategy](#7-storage--database-strategy)
8. [Notification & Email System](#8-notification--email-system)
9. [Visual Flowcharts & Diagrams](#9-visual-flowcharts--diagrams)
10. [Configuration & Environment Variables](#10-configuration--environment-variables)

---

## 1. Overview & Vision

The **Chinna Meet-Up App** is a custom romantic web experience designed with rich interactive animations, modern glassmorphism aesthetics, and tailored storytelling. 

### Key Objectives
* **Break the Rescheduling Loop:** Turn the playful history of missed plans (Goa, Bangalore, Dharwar) into an emotional, humorous catalyst.
* **Frictionless Decision Making:** Give Chinna complete control over picking the date, selecting multiple vibes/activities, and jotting down food cravings.
* **Instant Confirmation & Coordination:** Instantly store the response, notify via styled email alerts, and offer a one-tap WhatsApp ping.
* **Admin Authority:** Allow the host (Abhishek) to view responses, finalize the exact time slot, and manage notifications through a secured `/admin` dashboard.

---

## 2. High-Level Architecture

The project is built on modern web technologies using Next.js 16 App Router, React 19, and Tailwind CSS v4:

```
 personal/
 ├── app/
 │   ├── admin/               # Admin dashboard for viewing & managing bookings
 │   ├── api/
 │   │   ├── admin/           # Admin API: fetch bookings, update times, resend emails
 │   │   ├── availability/    # Public API: allowed dates, booked dates & activities
 │   │   └── booking/         # Booking API: Zod validation, rate limiting, persistence & email
 │   ├── chinna/              # Alias route pointing to the MeetupApp component
 │   ├── globals.css          # Glassmorphism utilities, ambient animations
 │   ├── layout.tsx           # Global HTML layout & Google fonts configuration
 │   └── page.tsx             # Root page rendering <MeetupApp initialName="Chinna" />
 ├── components/
 │   ├── ActivityPicker.tsx   # Step 2: Multi-activity selector & craving notes
 │   ├── BackgroundDecorations.tsx # Ambient blur orbs and floating icons (✨, 🌸, 💌)
 │   ├── BookingSummary.tsx   # Step 3: Ticket-style review & lock-in card
 │   ├── DatePicker.tsx       # Step 1: Calendar restricted strictly to October 2026
 │   ├── Hero.tsx             # Step 0: Warm hook with floating pills & playful copy
 │   ├── MeetUpStory.tsx      # Step 1: Case history timeline of previous attempts
 │   ├── MeetupApp.tsx        # Central state controller & AnimatePresence workflow
 │   ├── ProgressIndicator.tsx# Visual progress tracker with completed step navigation
 │   ├── SuccessScreen.tsx    # Confetti explosion, official ticket & WhatsApp CTA
 │   └── TimePicker.tsx       # Reusable preset & custom time picker component
 └── lib/
     ├── email.ts             # Resend email client & HTML template builder
     ├── mongodb.ts           # MongoDB Atlas connection manager & connection pooling
     ├── store.ts             # Dual-layer storage (MongoDB Atlas with JSON fallback)
     └── validation.ts        # Zod schemas, activity catalogs & TypeScript interfaces
```

---

## 3. User Experience (Chinna's Journey)

The user journey is divided into sequential stages with smooth transitions managed by `Framer Motion`:

```
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Step 0    │ ──> │    Step 1    │ ──> │    Step 2    │
│  Hero Intro  │     │ Our Track    │     │ Pick a Date  │
│              │     │   Record     │     │ (Oct 2026)   │
└──────────────┘     └──────────────┘     └──────────────┘
                                                 │
                                                 ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│    Step 5    │ <── │    Step 4    │ <── │    Step 3    │
│ Success & WA │     │ Ticket Review│     │ Select Vibes │
│  Confetti 🎉 │     │  & Locking   │     │  & Cravings  │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

## 4. Step-by-Step Interactive Flow

### Step 0: The Hero Hook (`Hero.tsx`)
* **Visuals:** Floating pill banner reading *"A very serious message for Chinna ❤️"* with sparkling micro-animations.
* **Narrative:** Recaps past attempts playfully:
  * *We've tried to meet.*
  * *We've postponed.*
  * *We've rescheduled.*
  * *And somehow we're still here. 😂*
* **Call to Action:** Prominent gradient button *"Let's finally meet"*, triggering transition to Step 1.

### Step 1: Track Record & Case History (`MeetUpStory.tsx`)
* **Case History Badge:** *"Case History #2026"*.
* **Interactive Timeline:**
  1. `Attempt #1 - GOA` ➔ Status: *"Coming Soon 😭"* (Red tag)
  2. `Attempt #2 - Blr Meet up` ➔ Status: *"Rescheduled 🫠"* (Amber tag)
  3. `Attempt #3 - Dharwar` ➔ Status: *"Soon Enough ✨"* (Pulsing rose tag)
* **Emotional Callout:** *"I still want to meet you. So instead of saying 'sometime soon' again, let's actually pick a day. Let's break the Curse."*
* **Call to Action:** *"Pick a date"* advancing to the Calendar.

### Step 2: Date Picker (`DatePicker.tsx`)
* **Date Range Lockdown:** Hard-capped strictly within **October 2026** (1st to 31st).
* **Smart Validation:**
  * Past dates are permanently disabled.
  * Dates beyond October 31, 2026 cannot be selected.
  * Today indicator with subtle indicator dot.
* **Selection State:** Real-time feedback badge showing the formatted day (e.g., `Wed, Oct 14`).
* **Navigation:** Previous/Next month controls with boundary locking + Back button.

### Step 3: Activity & Vibe Selection (`ActivityPicker.tsx`)
* **Multi-Selection Grid:** Chinna can pick one or multiple plans:
  * ☕ **Coffee:** *"A warm cup & long conversations"*
  * 🍕 **Food:** *"Good food, great gossip"*
  * 🎬 **Movie:** *"Popcorn & a great show"*
  * 🌆 **Walk:** *"Sunset breeze & endless walking"*
  * ✨ **Surprise me:** *"You show up, I'll plan the rest"*
* **Counter Badge:** Live counter displaying `${count} vibes selected ❤️`.
* **Craving Notes Input:** Optional open-text field: *"Any food cravings or favorite spots? (e.g. That boba place, sushi, or good cold brew...)"*.

### Step 4: Boarding Ticket & Confirmation (`BookingSummary.tsx`)
* **Boarding-Pass Aesthetic:** Glassmorphism ticket with decorative punch-hole cutouts and dotted dividers.
* **Live Details Preview:**
  * **Date:** Full expanded date format (e.g., `Wednesday, October 14, 2026`).
  * **Time:** Noted as *"I'll coordinate with you! Exact hour will be finalized shortly"*.
  * **Chosen Activities:** Pill badges displaying all selected options.
  * **Personal Wish:** Displays her specific craving/note if provided.
* **Inline Quick-Edit:** Edit buttons (`Edit3` icon) allowing instant jump back to Step 2 or Step 3 to change choices.
* **The Commitment Button:** *"YES — LET'S DO IT ❤️"* with spinner animation during network submission.

### Step 5: Official Celebration (`SuccessScreen.tsx`)
* **Confetti Engine:** Fires custom dual-burst multi-color canvas confetti on mount (rose, pink, amber, gold particles).
* **Confirmation Summary:** Clean ticket summary reassuring Chinna that the date is officially reserved.
* **WhatsApp Deep-Link:** Generates a pre-filled WhatsApp message:
  ```
  Hey! 👀 Just locked our plan in on the site: [Date] for [Activities]! Can't wait! ❤️
  ```
* **Reset Flow:** Option to start over or select another date if needed.

---

## 5. Admin Management Dashboard (`/admin`)

The host dashboard allows Abhishek to oversee responses, lock in times, and manage communications:

### 1. Authentication & Security
* Protected by `ADMIN_SECRET` (configured in `.env.local` or environment variable).
* Accessible via password entry modal or direct query parameter `?secret=...`.
* Credentials persisted safely in browser `localStorage` (`chinna_admin_secret`).
* Header validation `x-admin-secret` checked across all `/api/admin` requests.

### 2. Live Response Feed
* Real-time list of all confirmed bookings sorted by newest first.
* Displays attendee name, booking timestamp, and client User-Agent.
* Email delivery status badge:
  * 🟢 **Email Sent:** Resend delivered the notification to the host.
  * 🟡 **Email Pending / Not Sent:** Resend was either bypassed (mock mode) or encountered an error.

### 3. Time Allocation Authority
* Chinna selects the day, while the host finalizes the hour.
* **Quick-Pick Chips:** Single-tap preset times:
  * `5:00 PM` • `6:00 PM` • `6:30 PM` • `7:00 PM` • `7:30 PM` • `8:00 PM`
* **Custom Time Input:** Custom text support for flexible hours (e.g., `6:45 PM`, `Late evening`).
* One-click **"Save Time"** action instantly writes changes to the database.

### 4. Manual Resend Trigger
* Provides a **"Resend Email Notification"** action per booking.
* Re-triggers the Resend delivery pipeline and updates the record status.

---

## 6. Data Flow & API Specifications

### `POST /api/booking`
Registers a meet-up reservation from the client.

* **Rate Limiting:** In-memory tracker allowing a maximum of **10 requests per minute per IP**.
* **Payload Format:**
  ```json
  {
    "name": "Chinna",
    "date": "2026-10-14",
    "time": "TBD",
    "activities": ["coffee", "walk"],
    "notes": "Let's grab matcha and walk around the lake"
  }
  ```
* **Validation Rules (`Zod`):**
  * `date`: Must be valid `YYYY-MM-DD`, greater than or equal to current date, and strictly `<= 2026-10-31`.
  * `activities`: Non-empty array of valid activity IDs.
  * `notes`: Optional string, max 300 characters.
* **Duplicate Detection:** Checks if an identical date booking was submitted within the last 5 minutes to prevent accidental double-submits.
* **Response (201 Created):**
  ```json
  {
    "success": true,
    "bookingId": "6702e5b...",
    "booking": {
      "name": "Chinna",
      "date": "2026-10-14",
      "time": "TBD",
      "activity": "coffee, walk",
      "activities": ["coffee", "walk"],
      "notes": "Let's grab matcha and walk around the lake",
      "status": "confirmed",
      "createdAt": "2026-10-06T11:00:00.000Z",
      "notificationSent": true
    }
  }
  ```

---

### `GET /api/availability`
Fetches global schedule constraints and booked dates.

* **Response (200 OK):**
  ```json
  {
    "success": true,
    "minDate": "2026-10-06",
    "maxDate": "2026-10-31",
    "activities": [ ... ],
    "bookedDates": ["2026-10-14", "2026-10-22"]
  }
  ```

---

### `GET /api/admin`
Fetches all stored bookings (requires authentication).

* **Headers:** `x-admin-secret: <ADMIN_SECRET>`
* **Response (200 OK):**
  ```json
  {
    "success": true,
    "bookings": [ ... ]
  }
  ```

---

### `POST /api/admin`
Executes admin actions on bookings.

* **Action 1: Update Time**
  ```json
  {
    "action": "update_time",
    "bookingId": "6702e5b...",
    "time": "6:30 PM"
  }
  ```
* **Action 2: Resend Email**
  ```json
  {
    "action": "resend_email",
    "bookingId": "6702e5b..."
  }
  ```

---

## 7. Storage & Database Strategy

The app implements a **hybrid dual-layer storage engine** (`lib/store.ts`):

```
                     ┌───────────────────────────────┐
                     │ Incoming Store Operation      │
                     └───────────────┬───────────────┘
                                     │
                        Is MONGODB_URI configured?
                                     │
                      ├─── YES ───────────── NO ────┐
                      ▼                             ▼
        ┌───────────────────────────┐    Is Serverless Environment?
        │ Connect to MongoDB Atlas  │    (Vercel / AWS Lambda)
        │ Collection: "meetings"    │               │
        └─────────────┬─────────────┘      ├── YES ───────────── NO ────┐
                      │                    ▼                            ▼
                 Error Fallback?     Throw Actionable    Local File System Store
                      │              Database Warning    `.data/meetings.json`
                      └──────────────────────────────────────────┘
```

1. **Production Mode (MongoDB Atlas):**
   * Uses official `mongodb` driver with persistent connection caching (`_mongoClientPromise`).
   * Database: `chinna_date` | Collection: `meetings`.
2. **Local Development Fallback:**
   * When `MONGODB_URI` is omitted during local development, records are safely persisted in `.data/meetings.json`.
3. **Serverless Safety Guard:**
   * If deployed on Vercel without `MONGODB_URI`, the server immediately throws a descriptive 503 error instructing the developer to configure the database rather than failing silently on a read-only filesystem.

---

## 8. Notification & Email System

Every confirmed booking triggers an automated email through the **Resend API** (`lib/email.ts`):

* **Recipient:** Configured via `NOTIFICATION_EMAIL` (e.g., host's personal inbox).
* **Sender:** Configured via `FROM_EMAIL` (default: `onboarding@resend.dev` or custom verified domain).
* **Template Design:**
  * Premium responsive card with rose-red header: *"❤️ It's finally happening!"*.
  * Highlights formatted meeting date, selected plan, cravings/notes, and calendar reminder.
* **Mock Mode Graceful Fallback:**
  * If `RESEND_API_KEY` is not supplied or `NOTIFICATION_EMAIL` is set to placeholder `you@example.com`, the system automatically logs a formatted preview to the server console without crashing.

---

## 9. Visual Flowcharts & Diagrams

### User Experience & Booking Flow

```mermaid
sequenceDiagram
    autonumber
    actor C as Chinna
    participant FE as MeetupApp (Frontend)
    participant API as /api/booking
    participant DB as MongoDB / JSON Store
    participant Email as Resend Email Service

    C->>FE: Step 0: Views Hero & Clicks "Let's finally meet"
    C->>FE: Step 1: Views Case History & Timeline
    C->>FE: Step 2: Selects Date in October 2026
    C->>FE: Step 3: Selects Vibes (Coffee, Food, etc.) & Adds Cravings
    C->>FE: Step 4: Reviews Ticket Summary & Clicks "YES — LET'S DO IT ❤️"
    
    FE->>API: POST /api/booking with Payload
    API->>API: Rate Limit Check & Zod Validation
    API->>API: Check Duplicate Submissions (< 5 min)
    API->>DB: Save Booking (status: confirmed)
    API->>Email: Send HTML Notification Email to Host
    Email-->>API: Delivery Result (success / error)
    API->>DB: Update notificationSent status
    API-->>FE: 201 Created & Booking Data
    
    FE->>C: Step 5: Fireworks / Confetti & Success Ticket
    C->>FE: Taps "Send a WhatsApp Ping"
    FE-->>C: Redirects to WhatsApp with Pre-filled Message
```

---

### Host / Admin Flow

```mermaid
flowchart TD
    A[Host visits /admin] --> B{Authenticated?}
    B -- No --> C[Enter ADMIN_SECRET Passcode]
    C --> D[POST /api/admin check]
    D -- Success --> E[Save to localStorage & View Dashboard]
    D -- Fail --> C
    B -- Yes --> E

    E --> F[View Confirmed Bookings Feed]
    F --> G[Pick or Enter Meeting Time]
    G --> H[Click 'Save Time']
    H --> I[Update Record in DB]
    
    F --> J[Click 'Resend Email Notification']
    J --> K[Re-trigger Resend Pipeline]
    K --> L[Update Email Badge Status]
```

---

## 10. Configuration & Environment Variables

| Variable | Description | Example / Default |
|---|---|---|
| `MONGODB_URI` | MongoDB Atlas connection string | `mongodb+srv://user:pass@cluster.mongodb.net/chinna_date` |
| `RESEND_API_KEY` | Resend API key for outbound notification emails | `re_123456789...` |
| `NOTIFICATION_EMAIL` | Inbox that receives notifications when Chinna books | `your-email@gmail.com` |
| `FROM_EMAIL` | Sender address verified in Resend | `Chinna Date <onboarding@resend.dev>` |
| `ADMIN_SECRET` | Secret password required to access `/admin` | `chinna2026` |

---

*Authored for the personal project repository: `AbhishekBhure/invitation`.*
