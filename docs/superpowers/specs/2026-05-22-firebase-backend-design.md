# Jackal AI — Firebase Backend Design Spec
**Date:** 2026-05-22
**Status:** Approved — ready for implementation planning

---

## Overview

Build a Firebase backend (`jackalai-site` project) that replaces Formspree as the contact form handler and lays the foundation for client onboarding and ChatDash account provisioning in Phase 2.

### What this spec covers (Phase 1)
- Firebase project structure and configuration
- Cloud Function: `handleContactForm` (HTTP trigger)
- Firestore data model for contact submissions
- Resend email notification integration
- Front-end change to `contact.html`
- Firestore security rules

### What this spec defers (Phase 2)
- Client onboarding flow and intake form
- Firebase Authentication for client accounts
- ChatDash client provisioning via ChatDash API
- Automated welcome email with ChatDash login link

---

## Architecture

### Request Flow

```
contact.html (jackalai.app/contact.html)
  │
  │  POST /handleContactForm
  │  Body: { name, email, phone, business, message, recaptchaToken }
  ▼
Cloud Function: handleContactForm (HTTP, australia-southeast1)
  │
  ├─ 1. Verify reCAPTCHA v3 token → reject if score < 0.5
  ├─ 2. Validate required fields (name, email, message) + email format
  ├─ 3. Write document to Firestore: contact_submissions/{autoId}
  ├─ 4. POST to Resend API → send notification email to hello@jackalai.app
  └─ 5. Return { ok: true } with HTTP 200
  
Firestore: contact_submissions/{autoId}
Resend: notification email → hello@jackalai.app
```

### ChatDash Integration (context)

ChatDash is the white-label client portal Jack's clients log into directly. It is not embedded in any Jackal AI page. The Firebase backend will integrate with ChatDash in Phase 2 by:
1. Receiving onboarding form data via a new HTTP Cloud Function
2. Calling ChatDash's REST API to programmatically create a client account and assign an agent
3. Sending the client a welcome email (via Resend) with their ChatDash login link

Jack is on ChatDash's standard plan — white-label backend domain routing is not available. ChatDash branding is visible in network requests on the client portal.

---

## Repository Structure

New repository: `jackal-ai-app/jackal-ai-firebase`

```
jackal-ai-firebase/
├── functions/
│   ├── index.js            # Exports all Cloud Functions
│   ├── contact.js          # handleContactForm implementation
│   ├── package.json        # Dependencies: firebase-admin, resend, axios
│   └── .env                # Local dev secrets (gitignored)
├── firestore.rules         # Security rules — admin-only access
├── firestore.indexes.json  # Indexes: status + created_at for lead queries
└── firebase.json           # Functions region, runtime config
```

---

## Cloud Function: handleContactForm

**Trigger:** HTTP POST (CORS enabled for `jackalai.app` and `www.jackalai.app` only)
**Region:** `australia-southeast1` (Sydney — lowest latency for Perth-based users)
**Runtime:** Node.js 20

### Logic

```
1. CORS check — reject non-POST or disallowed origins
2. Parse JSON body — extract: name, email, phone, business, message, recaptchaToken
3. reCAPTCHA verification
   - POST token to https://www.google.com/recaptcha/api/siteverify
   - If score < 0.5 → return 400 { error: "Failed spam check" }
4. Input validation
   - Required: name, email, message
   - Email must match RFC 5322 pattern
   - If invalid → return 400 { error: "Missing required fields" }
5. Firestore write
   - Collection: contact_submissions
   - Fields: name, email, phone, business, message, recaptchaScore,
             status: "new", source: "contact_form", createdAt: serverTimestamp()
6. Resend email
   - To: hello@jackalai.app
   - From: noreply@jackalai.app (or Resend sandbox during dev)
   - Reply-To: {email}
   - Subject: "New enquiry — {name} ({business})"
   - Body: HTML template with all fields + reCAPTCHA score
7. Return { ok: true } → HTTP 200
```

### Error handling

| Scenario | HTTP status | Response |
|---|---|---|
| Non-POST method | 405 | `{ error: "Method not allowed" }` |
| reCAPTCHA fails | 400 | `{ error: "Failed spam check" }` |
| Missing required fields | 400 | `{ error: "Missing required fields" }` |
| Firestore write fails | 500 | `{ error: "Could not save submission" }` |
| Resend fails | 200 | Still succeeds — Firestore write is the source of truth; email failure is logged but not surfaced to user |

Resend failure does **not** return an error to the user — the submission is already saved. Email failure is logged to Firebase console for manual follow-up.

---

## Firestore Data Model

### Collection: `contact_submissions`

```
contact_submissions/{autoId}
  ├── name:            string    — submitter's full name
  ├── email:           string    — submitter's email
  ├── phone:           string    — submitter's phone (may be empty)
  ├── business:        string    — business name (may be empty)
  ├── message:         string    — full message text
  ├── recaptchaScore:  number    — Google reCAPTCHA v3 score (0.0–1.0)
  ├── status:          string    — "new" | "contacted" | "converted"
  ├── source:          string    — "contact_form" (extensible for future sources)
  └── createdAt:       timestamp — server timestamp
```

**Index:** `status ASC, createdAt DESC` — supports filtering leads by status, ordered newest first.

**Status lifecycle:** All submissions start as `"new"`. Jack manually updates via Firestore console to `"contacted"` or `"converted"` as leads progress.

---

## Firestore Security Rules

Client browsers never access Firestore directly. All reads and writes go through the Admin SDK inside Cloud Functions.

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // No client-side access to any collection
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

---

## Front-end Change: contact.html

**Remove:**
- Hidden input `<input type="hidden" name="_replyto">`
- Hidden input `<input type="hidden" name="_subject">`
- The line that mirrors email into `_replyto`
- The Formspree constants (`FORMSPREE_ID`)

**Change:**
```javascript
// Before
const res = await fetch('https://formspree.io/f/' + FORMSPREE_ID, {
  method: 'POST',
  body: data,
  headers: { 'Accept': 'application/json' }
});

// After
const res = await fetch('https://australia-southeast1-jackalai-site.cloudfunctions.net/handleContactForm', {
  method: 'POST',
  body: JSON.stringify({
    name: form.querySelector('#name').value,
    email: form.querySelector('#email').value,
    phone: form.querySelector('#phone').value,
    business: form.querySelector('#business').value,
    message: form.querySelector('#message').value,
    recaptchaToken: token
  }),
  headers: { 'Content-Type': 'application/json' }
});
```

**Unchanged:** reCAPTCHA v3 token generation, success/error display, Facebook Pixel `Lead` event, button loading state.

---

## Environment Variables

| Variable | Where stored | Value |
|---|---|---|
| `RESEND_API_KEY` | Firebase secret (prod) / `.env` (dev) | From Resend dashboard |
| `RECAPTCHA_SECRET_KEY` | Firebase secret (prod) / `.env` (dev) | Existing reCAPTCHA secret key |

Secrets are stored using `firebase functions:secrets:set` — never committed to git.

---

## Phase 2 — Onboarding + ChatDash (deferred)

When Phase 2 is built, it follows the same HTTP function pattern:

```
New function: handleOnboarding (HTTP POST)
  ├─ Accepts: intake form data (business details, service tier, etc.)
  ├─ Validates and writes to: onboarding_submissions/{autoId}
  ├─ Calls ChatDash API: POST /clients → creates client account
  ├─ Calls ChatDash API: POST /clients/{id}/agents → assigns agent
  └─ Sends welcome email via Resend with ChatDash login link
```

ChatDash API base URL and API key will be stored as Firebase secrets.

---

## Success Criteria

- [ ] Contact form on `jackalai.app/contact.html` submits successfully to Cloud Function
- [ ] reCAPTCHA score below 0.5 is rejected without a Firestore write
- [ ] Valid submission creates a document in `contact_submissions` with all fields
- [ ] `hello@jackalai.app` receives a formatted notification email with Reply-To set correctly
- [ ] Failed Resend email does not break the form submission flow
- [ ] Formspree is fully removed from `contact.html`
- [ ] Firestore security rules block all client-side access
