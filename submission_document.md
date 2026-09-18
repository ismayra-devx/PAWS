# PAWS — Animal Care Companion
## Product & Technology Conceptual Submission (Screening Assignment)

---

### 1. Executive Summary & Product Concept

**PAWS** is a location-based animal-care platform designed to eliminate the anxiety and chaos of pet healthcare discovery and medical record tracking. By unifying emergency/routine care search with an **AI-powered Animal Health Passport**, PAWS enables pet parents and animal rescuers to instantly locate qualified, nearby care while transforming fragmented physical medical reports into structured, plain-language health timelines.

- **Primary Problem**: Users struggle to find the right nearby animal-care service quickly because veterinary data in urban hubs is highly fragmented across unverified search results, social media groups, WhatsApp networks, and word-of-mouth. In emergency situations (accidents, acute distress), every minute wasted searching is life-threatening. Concurrently, medical history is maintained on loose paper slips, leading to missed vaccinations, repeated diagnostic costs, and poor continuity of care.
- **Target Users**:
  1. **Pet Parents**: Seeking reliable clinics, boarding, vaccination schedules, and clarity on laboratory diagnostics without medical jargon.
  2. **Animal Rescuers & Community Volunteers**: Urgently needing 24x7 emergency facilities, animal ambulances, foster boarding, and a rapid way to record street animals' triage records during handoffs.

---

### 2. Core MVP Features & Primary User Flow

#### The 5 MVP Features:
1. **Location-Based Care Discovery**: Real-time geolocation-grounded directory of verified clinics, veterinary hospitals, and boarding providers with distance and open/closed availability.
2. **Emergency Clinic & Ambulance Discovery**: Dedicated high-urgency filter highlighting 24x7 trauma facilities and operational pet ambulances with direct one-tap calling.
3. **Animal Health Passport**: One persistent digital profile holding species details, medical timeline, vaccine cycles, chronic allergies, and uploaded documentation.
4. **AI Medical-Report Organiser**: Multi-modal OCR and entity extraction engine that parses blood work, clinical prescriptions, and diagnostic PDFs into standardized structured data.
5. **AI Health Timeline & Preventative Reminders**: Chronologically sequenced health record mapping past interventions to automated predictive reminders for upcoming vaccinations and follow-ups.

#### Core User Flow (Connected 4-Screen Experience):
$$\text{01 Home (Care Intent)} \longrightarrow \text{02 Discover (Geolocated Match)} \longrightarrow \text{03 Health Passport (Animal Profile)} \longrightarrow \text{04 AI Summary (Report Insights)} \longrightarrow \text{Care Loop Back to Discover}$$

```
[01 Home]
   │ Choose Care Category or Emergency
   ▼
[02 Discover Care]
   │ Filter: Open Now / Emergency / Proximity
   │ Select Provider or Tap Map Pin
   ▼
[03 Health Passport]
   │ View Bruno's Timeline & Vaccines
   │ Upload Medical Report (e.g., blood_report_august.pdf)
   ▼
[04 AI Summary]
   │ View Extracted Biomarkers & Medications
   │ Read Non-Diagnostic Discussion Cues
   │ CTA: "Find a Vet" -> Closes loop back to [02 Discover Care]
```

---

### 3. Differentiating Innovations

1. **Animal Care Passport**: Unlike human portals that assume standard EHR formats, animal records vary wildly across informal handwritten clinic receipts and diverse diagnostic lab formats. The PAWS Passport provides a single, portable, transferable health credential that can be shared via QR code or link during boarding check-ins, foster handoffs, or emergency ER admissions.
2. **Rescue Mode (Temporary Animal Profile)**: Rescuers often care for unnamed community animals or emergency rescues with zero prior history. With one tap, Rescue Mode creates a lightweight, transferable profile (e.g., *"Street Pup #104 — Injured Paw"*), automatically geocodes the rescue location, dispatches emergency alerts to nearby partner NGOs/ambulances, and maintains an unlosable treatment log during volunteer handoffs.

---

### 4. AI Workflows & Human-in-the-Loop Safety Boundary

```
┌────────────────────────┐      ┌─────────────────────────┐      ┌────────────────────────┐
│  Raw Input (PDF/Img)   │ ───► │  OCR & Extraction Pipe  │ ───► │   Structured Storage   │
│  Prescription / Lab    │      │ (DocAI / Vision + LLM)  │      │  (Postgres JSONB DB)   │
└────────────────────────┘      └─────────────────────────┘      └────────────────────────┘
                                             │
                                             ▼
┌────────────────────────┐      ┌─────────────────────────┐      ┌────────────────────────┐
│ Vet Action / Next Step │ ◄─── │ Safe Translation Engine │ ◄─── │  Strict Safety Guard   │
│   ("Find a Vet" CTA)   │      │  (Plain-Language Cues)  │      │ (ZERO Medical Diag.)   │
└────────────────────────┘      └─────────────────────────┘      └────────────────────────┘
```

#### The 4 Autonomous AI Workflows:
1. **Medical Report Structuring**:
   - *Data Processed*: Uploaded diagnostic images, photos of handwritten veterinary prescriptions, scanned blood count PDFs.
   - *Automation*: Multi-modal document parser extracts test names, measured values, units, reference intervals, dates, and prescribed pharmaceutical names.
2. **Plain-Language Summary & Non-Diagnostic Translation**:
   - *Data Processed*: Structured lab entities (e.g., Haemoglobin 12.8 g/dL, WBC 9.2 $\times 10^3$/µL).
   - *Automation*: Translates complex abbreviations into understandable lay terms and surfaces items for discussion.
   - *Crucial Ethical Guardrail*: **The AI NEVER outputs a medical diagnosis or prognostic conclusion.** It only identifies values falling outside standard reference ranges and provides specific, clarifying questions for the pet parent to discuss with their licensed veterinarian.
3. **Chronological Health Timeline & Preventive Cues**:
   - *Data Processed*: Extracted visit dates, booster schedules (DHPP, Rabies), and recurring medication courses.
   - *Automation*: Synthesizes disparate documents into a single chronological vertical ledger and automatically calculates countdown badges (e.g., *"Next vaccine: 12 days"*).
4. **Care Discovery Assistant**:
   - *Data Processed*: Animal species, user-reported symptoms/service needed, user geo-coordinates, time of day.
   - *Automation*: Heuristic semantic matching routes emergencies to verified 24-hour trauma units while categorizing routine checkups to local clinics within a 3–5 km radius.

#### Data Privacy & Safety Policy:
- PII sanitization: Strips human owner addresses, phone numbers, and payment details from uploaded PDFs prior to LLM processing.
- Strict veterinary liability disclaimers permanently embedded on all summary views.

---

### 5. Technology Stack & Conceptual Architecture

| Layer | Recommended Technology | Architectural Rationale |
| :--- | :--- | :--- |
| **Frontend UI** | React 19 / Next.js / Vanilla SPA | High-speed mobile-first web interface, sub-second route transitions, interactive vector mapping. |
| **Backend API** | Python 3.12 + FastAPI | Asynchronous performance, native ecosystem for AI orchestration, typed OpenAPI schemas. |
| **Primary Database**| PostgreSQL 16 + PostGIS | ACID compliance for medical records; native spatial indexing (`ST_DWithin`, `ST_Distance`) for provider proximity queries. |
| **Storage & Caching**| Cloud Object Storage (S3/GCS) + Redis | Secure, encrypted bucket storage for raw medical scans; Redis for sub-5ms nearby provider caching. |

#### Core Integrations & APIs:
1. **Maps & Geolocation API (Google Maps Platform / Mapbox GL)**: Reverse geocoding user position, spatial rendering of provider pins, real-time routing estimates.
2. **Document Processing / OCR API (Google Document AI / AWS Textract)**: High-accuracy extraction of tabular laboratory reports and clinical handwriting.
3. **Generative LLM API (Google Gemini 1.5 Flash / Claude 3.5 Haiku)**: Zero-shot JSON structuring, medical terminology translation, safety-guarded summary generation.
4. **Notification Service (Twilio / Firebase Cloud Messaging)**: Push and SMS alerts for critical vaccination windows, prescription refills, and emergency ambulance status.
5. **Authentication (Firebase Auth / Auth0)**: Secure passwordless OTP/OAuth for pet parents and verified veterinary clinic credentials.

---

### 6. 30-Day MVP Scope & Intentional Exclusions

```
┌─────────────────────────────────────────────────────────────┐
│                     30-DAY IN-SCOPE MVP                     │
├─────────────────────────────────────────────────────────────┤
│  ✓ Geocoded Care Directory (Vets, Clinics, Boarding)        │
│  ✓ 24x7 Emergency & Ambulance Quick Discovery with Direct Call│
│  ✓ Animal Profile & Care Passport (Species, Age, History)    │
│  ✓ PDF/Image Upload & Automated Document Extraction         │
│  ✓ Safe, Non-Diagnostic AI Plain-Language Summary           │
│  ✓ Chronological Health Timeline & Next Vaccine Countdown   │
│  ✓ Rescue Mode Rapid Profile Prototype                      │
└─────────────────────────────────────────────────────────────┘
                              │
                    INTENTIONALLY EXCLUDED
                              ▼
┌─────────────────────────────────────────────────────────────┐
│ ✗ Full In-App Telemedicine Video Calls (Regulatory/bandw.)  │
│ ✗ Integrated Payment Gateway / Invoicing (Scope creep)      │
│ ✗ Two-Way Real-Time Vet Calendar Booking Integration        │
│ ✗ Autonomous Diagnostic Predictions (Severe medical liability)│
│ ✗ Fleet Telematics / Real-Time Live GPS Ambulance Tracking  │
└─────────────────────────────────────────────────────────────┘
```

**Strategic Rationale**: To launch within 30 days and achieve immediate product-market fit, PAWS solves the acute discovery and record disorganization pain points without absorbing the heavy regulatory compliance of telehealth or the operational friction of veterinary clinic PMS (Practice Management Software) calendar integrations.

---

### 7. Assignment Compliance & Audit Checklist

- [x] **Product Concept & Problem**: Grounded in urban animal healthcare fragmentation across search and chat.
- [x] **Target Personas**: Pet Parents & Animal Rescuers with distinct workflows.
- [x] **5 MVP Features**: Geolocation discovery, emergency filter, health passport, report organiser, health timeline.
- [x] **4 Clickable Prototype Screens**: Connected, consistent visual aesthetic (Cream `#FBF8F2`, Forest `#2D5A43`, Sage `#D9E5DB`).
- [x] **2–4 AI Workflows**: Detailed data inputs, automated outputs, safety boundaries, and privacy protections.
- [x] **Differentiating Ideas**: Animal Care Passport + Rescue Mode.
- [x] **Technology Architecture**: Full stack specified with 5 realistic APIs/integrations and data flow.
- [x] **30-Day Scope Boundaries**: Strict inclusion/exclusion boundary with commercial reasoning.
- [x] **Format & Constraint**: Fits strictly within 2 pages; prototype fully clickable.
