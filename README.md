# 🐾 PAWS — Animal Care Companion (Practo for Animals)

> **A digital Care Passport for animals combined with fast access to veterinary and animal-care services, AI-powered medical report organisation, and community stray rescue workflows.**

---

## 🌟 Executive Summary

**PAWS** is a modern, responsive animal healthcare platform built for the **Practo for Animals** Product & Technology assignment. It addresses the fragmentation in veterinary healthcare by bridging two foundational needs:
1. **Immediate Care Discovery**: Instantly finding trusted general vets, 24×7 emergency trauma hospitals, ambulances, boarding, and grooming facilities.
2. **Living Animal Care Passport**: Maintaining an organised, lifetime medical history for an animal—using AI to translate dense laboratory reports into actionable timelines, structured biomarkers, and follow-up reminders.

PAWS is designed for both **Pet Parents** (managing companion animals like Bruno) and **Community Rescuers** (triage, first-aid, and NGO handoffs for rescued strays).

---

## 🚀 Quick Start (Run Locally in Seconds)

PAWS is intentionally engineered using modern web standards (**HTML5, CSS3 Custom Properties, Vanilla ES6+ JavaScript**) with **zero build steps** and **zero npm dependencies**. It runs cleanly on any local static server:

### Option A: Python Built-in Server (Recommended)
```bash
# From the project root directory:
python -m http.server 8000
```
Then visit: [`http://localhost:8000/`](http://localhost:8000/)

### Option B: Node.js `npx serve`
```bash
npx serve .
```

### Option C: Direct Browser Launch
Simply double-click `index.html` or open it directly in Chrome, Edge, Firefox, or Safari.

---

## 📂 Project Architecture & Directory Structure

```
PAWS/
├── index.html               # Semantic HTML5 single-page application structure & modals
├── styles.css               # Calm healthcare design system (CSS variables, responsive layouts)
├── app.js                   # Reactive client state, AI extraction pipeline & UI handlers
├── README.md                # Comprehensive project documentation & developer onboarding
├── submission_document.md   # Product & engineering design rationale
└── .gitignore               # Standard repository exclusions
```

---

## 🧩 Core Product Features & User Flows

### 1. Home Dashboard (`Screen 01`)
* **Core Philosophy**: *"Good care starts with knowing what they need."*
* **Hero Quick Action Bar**:
  * `🔍 Find Care`: Instant jump to local provider discovery.
  * `🐾 My Animal`: Direct navigation to Bruno's Care Passport.
  * `🚨 Emergency`: Fast-track high-priority triage flow.
  * `🆘 I'm helping a rescued animal`: One-click activation of Rescue Mode.
* **6-Category Services Grid**: Vet & Clinic, Emergency, Ambulance, Boarding, Grooming, Vaccination.
* **Location Auto-Detection**: Integrated mock GPS location detector (`Sector Alpha II, Greater Noida`).

### 2. Care Discovery & Interactive Map (`Screen 02`)
* **Real-time Filtering**: Filter providers by `All`, `Vet & clinic`, `Emergency`, `Ambulance`, `Boarding`, `Grooming`.
* **Verified Provider Directory**: Displays verified clinical facilities with distance, operating hours, emergency readiness, and ambulance availability:
  * *Green Paws Veterinary Clinic* (1.2 km • Open now • Emergency support • Ambulance available)
  * *PetCare 24×7 Emergency Hospital* (2.4 km • Open 24h • Trauma ICU)
  * *Happy Tails Boarding & Daycare* (3.1 km • Opens 8 AM)
  * *City Paws Mobile Ambulance & NGO* (1.8 km • Standby 24×7)
  * *Bark & Purr Grooming & Spa* (2.0 km • Open now)
* **Interactive Vector Map**: Hand-crafted SVG map with 5 color-coded pins synchronized bi-directionally with the directory list.

### 3. Comprehensive Provider Profile (`Feature 3`)
* Clicking **"View clinic"** on any provider opens a dedicated, rich Provider Profile view showing:
  * Clinic name, address, and live distance
  * Clinical services list (e.g., Digital X-Ray, In-house Pathology, Orthopedic Surgery, Pharmacy)
  * Operating schedule and emergency status
  * Direct contact telephone line
  * Facility overview & lead clinician details
  * Actions: `📞 Call Clinic`, `🗺️ Directions`, and `🐾 Return to Bruno's Passport`.

### 4. Emergency Mode & Fast-Track Triage (`Feature 4`)
* Dedicated emergency triage flow (*"Bruno needs urgent care"*):
  * **Patient Verification**: Active companion chip (`Bruno`, Golden Retriever, 4 yrs).
  * **Emergency Symptom Selector**: Acute Bleeding, Breathing Distress, Ingested Toxin, Sudden Collapse, Severe Fracture.
  * **Priority Rating**: Level 1 (Immediate emergency).
  * **Surfaced Emergency Facilities**: Instantly highlights 24×7 trauma hospitals and ambulances with one-click direct calling (`Call now`) and drive-time navigation routes (`Get directions`).

### 5. Bruno's Animal Care Passport (`Screen 03`)
* **Patient Profile Header**: Photo avatar, breed (`Golden Retriever`), age (`4 years`), sex (`Male`), weight (`31.5 kg`), microchip (`#98514100234`), and blood group (`DEA 1.1+`).
* **Attention Strip**: Real-time alerts highlighting items requiring pet parent attention (*"Rabies vaccination due in 20 days"*).
* **5 Dedicated Clinical Sections**:
  * **Health & Timeline**: Chronological event feed tracking reports, examinations, and immunizations.
  * **Vaccines**: Core booster schedule (Rabies, DHPP, Bordetella) with status badges.
  * **Medications**: Active prescription cards (Cetirizine 10mg once daily) and historical treatments.
  * **Reports**: Medical documents repository linked directly to the AI Organiser.
  * **Visits**: Clinical notes history from consulting veterinarians.

### 6. AI Medical Report Organiser (`Screen 04`)
* **Actual Upload Interaction**: Users can drag-and-drop or click to upload PDF/image reports (`blood_report_august.pdf` or custom files).
* **Multi-Stage Processing Simulation**:
  1. `Uploading...` (OCR scan & document layout analysis)
  2. `PAWS AI is organising the report...` (Normalizing canine biomarkers to reference ranges)
  3. `Report processed ✓` (Extracting medications & follow-up cues)
* **Structured Insights Output**:
  * **14 Biomarkers Extracted**: Complete blood count (CBC) breakdown table with measured values, canine reference ranges, and interpretation flags (Normal / Mild Elevation / Borderline).
  * **1 Medication Detected**: Extracted dosage instructions for Cetirizine.
  * **1 Follow-Up Reminder**: Flagged items for clinical discussion with the attending veterinarian.
* **AI Safety Guarantee**: Explicit disclaimer throughout the application:
  > *"AI helps organise information and does not provide a veterinary diagnosis."*

### 7. Care Loop Feedback Connection (`Feature 9`)
* Clicking **"Add to Care Passport"** closes the clinical loop:
  * Automatically prepends a new verified event to the patient's Health Timeline.
  * Dynamically updates the Attention Strip to surface: *"Follow-up mentioned in latest report"*.
  * Adds the structured document to the *Reports* repository with an *"Organised by PAWS AI"* badge.

### 8. Rescue Mode (`Feature 10`)
* Dedicated workflow for community animal welfare and stray rescue:
  * Instantly generates a temporary intake profile: **Unknown Dog** (Estimated age: 2–4 years, Status: Needs urgent care).
  * **Rescuer Emergency Hub**: Rapid coordination tools to Find Emergency Vet, Request Pet Ambulance, Contact Local NGOs (e.g., SPCA, Friendicoes), and Log First-Aid Interventions (saline flush, antiseptic spray, rehydration, temporary splint).

---

## 🎨 Design System & Aesthetic Tokens

PAWS follows a **calm healthcare aesthetic** inspired by modern clinical products:
* **Background Canvas**: Warm off-white (`#F7F4EE`)
* **Primary Forest Brand**: Deep clinical emerald (`#2D5A43`, hover: `#234735`)
* **Sage Tints**: Soft green accents (`#E2ECE5`, `#D2E0D7`)
* **Emergency Palette**: Urgent crimson (`#B5322F`, light tint: `#FDF2F2`)
* **Warm Amber**: Rescue accents (`#8A4F08`, light tint: `#FFF0D9`)
* **Typography**: Clean, geometric sans-serif using Google Fonts **Plus Jakarta Sans** (`400`, `600`, `700`, `800`).

---

## 🔒 AI Safety & Medical Disclaimer

PAWS is designed around strict veterinary safety boundaries:
1. **Never Diagnoses**: The AI engine explicitly limits its role to document organisation, OCR transcription, and structured timeline formatting.
2. **Consultation Anchor**: All flagged values (e.g., elevated eosinophils or borderline creatinine) are explicitly framed as *"Questions to discuss with your veterinarian."*
3. **Transparent Traceability**: Extracted medications and findings always trace back to their source document.

---

## 🛠️ Developer & Contributor Guide

### Code Formatting & Conventions
* **State Management**: Client state is centralized in the `state` object at the top of `app.js`.
* **Screen Transitions**: Driven via `window.navigateToScreen(screenId)`, which manages `.active` classes across views without page reloads.
* **Component Modals**: Accessible dialogs utilize `.modal-overlay` with backdrop blur and trap escape/click-outside dismissals.
* **CSS Architecture**: CSS custom properties are declared in `:root` inside `styles.css`. Components follow a modular BEM-inspired naming convention.

---

## 📄 License & Attribution
Developed for the **Practo for Animals Product & Technology Internship Assignment**.  
Author: [Ismayra](https://github.com/ismayra-devx) (`ismayra@paws.care`).
