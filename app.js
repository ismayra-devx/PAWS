// ==========================================================================
// PAWS MVP Application Engine
// Aesthetic: Calm. Trustworthy. Warm. Modern.
// Core flows: Care Discovery, Emergency Triage, Care Passport, AI Organiser, Rescue Mode
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  // Application State
  const state = {
    isLoggedIn: true,
    userProfile: {
      name: 'Ismayra',
      email: 'ismayra@paws.care',
      role: 'Pet Parent',
      initials: 'IS'
    },
    currentScreen: 'screen-01',
    currentPassportTab: 'health',
    isRescueMode: false,
    activeFilter: 'all',
    selectedProviderId: 'provider-green-paws',
    triageSelectedIssue: 'Trauma / Acute Bleeding',
    
    // Living Passport Data
    passport: {
      animal: {
        name: 'Bruno',
        species: 'Canine',
        breed: 'Golden Retriever',
        age: '4 years',
        gender: 'Male',
        weight: '31.5 kg',
        avatarText: 'B',
        microchip: '#98514100234',
        bloodGroup: 'DEA 1.1 Positive',
        nextVaccineDays: 20
      },
      rescueAnimal: {
        name: 'Unknown Dog',
        species: 'Canine',
        breed: 'Indie / Street Dog',
        age: 'Estimated age: 2–4 years',
        gender: 'Male',
        weight: '14.0 kg',
        avatarText: '🆘',
        status: 'Needs urgent care',
        location: 'Sector Alpha II, Greater Noida'
      },
      timeline: [
        { id: 't-1', date: 'Aug 28', title: 'Blood report uploaded', desc: 'AI extracted 14 key values • 2 flagged for discussion', isNew: false },
        { id: 't-2', date: 'Aug 10', title: 'Vet visit', desc: 'Skin allergy discussed with Dr. Ananya Sen', isNew: false },
        { id: 't-3', date: 'Jul 02', title: 'Vaccination', desc: 'Rabies vaccine administered • completed', isNew: false }
      ],
      rescueTimeline: [
        { id: 'rt-1', date: 'Today (18:40)', title: 'Street Rescue & Triage Initiated', desc: 'Rescued near Sector Alpha II round-about with left paw limp.', isNew: false }
      ]
    },

    providers: [
      {
        id: 'provider-green-paws',
        name: 'Green Paws Veterinary Clinic',
        type: 'vet',
        distance: '1.2 km',
        location: 'Sector 14, Ring Road (Near Central Park)',
        hours: 'Open now • 8:00 AM – 10:00 PM',
        openStatus: 'Open now',
        phone: '+91 98100 12345',
        emergency: true,
        emergencySupport: 'Emergency support available (24×7 on-call triage & ICU)',
        ambulance: true,
        services: [
          'General Consultations & Preventive Care',
          'Digital X-Ray & Ultrasound Imaging',
          'Pathology & Complete Blood Panel',
          'Soft Tissue & Orthopedic Surgery',
          '24×7 Emergency Care & Stabilization',
          'Pet Pharmacy & Prescription Dispensing'
        ],
        basicInfo: 'Green Paws Veterinary Clinic is a modern, high-standard animal clinic providing comprehensive clinical diagnostics, preventive health management, and emergency stabilization. Led by senior veterinary surgeon Dr. Ananya Sen.',
        doctor: 'Dr. Ananya Sen (Surgery & Diagnostics)',
        pinId: 'pin-vet'
      },
      {
        id: 'provider-petcare',
        name: 'PetCare 24×7 Emergency Hospital',
        type: 'emergency',
        distance: '2.4 km',
        location: 'Plot 42, Knowledge Park III, Greater Noida',
        hours: 'Open 24 Hours • 7 Days a week',
        openStatus: 'Open now (24×7)',
        phone: '+91 98100 24700',
        emergency: true,
        emergencySupport: '24×7 Critical Care, Trauma Unit & Oxygen ICU',
        ambulance: true,
        services: [
          '24×7 Trauma Surgery & Critical Care',
          'Advanced Monitoring & Oxygen Therapy',
          'Canine Blood Bank & Transfusions',
          'Emergency Pet Transport & Ambulance'
        ],
        basicInfo: 'Dedicated 24×7 tertiary animal emergency center with round-the-clock intensive care, continuous vital telemetry, and trauma surgeons on standby.',
        doctor: 'Dr. Vikram Malhotra & Trauma ICU Team',
        pinId: 'pin-emergency'
      },
      {
        id: 'provider-happy-tails',
        name: 'Happy Tails Boarding & Daycare',
        type: 'boarding',
        distance: '3.1 km',
        location: 'Greenwood Farms, Expressway Road',
        hours: 'Opens 8:00 AM tomorrow',
        openStatus: 'Opens 8:00 AM tomorrow',
        phone: '+91 98100 55678',
        emergency: false,
        emergencySupport: 'Visiting veterinary doctor on-call',
        ambulance: false,
        services: [
          'Overnight Cage-free Dog Suites',
          'Supervised Daycare & Socialization',
          'Custom Dietary & Medication Care',
          'Live Parent CCTV Streaming'
        ],
        basicInfo: 'Peaceful, climate-controlled animal boarding sanctuary with expansive outdoor grass runs and round-the-clock trained animal caretakers.',
        doctor: 'Caretakers & Visiting Vet Dr. R. Verma',
        pinId: 'pin-boarding'
      },
      {
        id: 'provider-city-paws',
        name: 'City Paws Mobile Ambulance & NGO',
        type: 'ambulance',
        distance: '1.8 km',
        location: 'Sector Alpha II Dispatch Hub',
        hours: 'Standby 24×7 • Oxygen & Stretcher Equipped',
        openStatus: 'Standby 24×7',
        phone: '+91 98100 22334',
        emergency: true,
        emergencySupport: 'Mobile Emergency Transport & Oxygen Stabilization',
        ambulance: true,
        services: [
          'Emergency Pet & Stray Transport',
          'On-board Paramedics & Oxygen',
          'Community Animal Rescue Response',
          'NGO Liaison & First-Aid'
        ],
        basicInfo: 'Rapid emergency mobile medical response unit specialized in animal transport, on-scene stabilization, and stray rescue collaboration.',
        doctor: 'Paramedic Crew & Emergency Response Vet',
        pinId: 'pin-ambulance'
      },
      {
        id: 'provider-bark-purr',
        name: 'Bark & Purr Grooming & Spa',
        type: 'grooming',
        distance: '2.0 km',
        location: 'City Center Mall, Ground Floor, Sector 18',
        hours: 'Open now • 9:00 AM – 8:00 PM',
        openStatus: 'Open now',
        phone: '+91 98100 44556',
        emergency: false,
        emergencySupport: 'None (Dermatology hygiene & spa only)',
        ambulance: false,
        services: [
          'Full Breed Haircut & Coat Styling',
          'Medicated Baths for Pruritus & Allergies',
          'Ear Flushing, Nail Clipping & Teeth Cleaning',
          'De-shedding & Paw Pad Care'
        ],
        basicInfo: 'Fear-free hygienic grooming salon certified for sensitive skin treatments, coat restoration, and hygienic pet pampering.',
        doctor: 'Certified Pet Stylists & Hygiene Specialists',
        pinId: 'pin-grooming'
      }
    ]
  };

  // Screen Registry
  const screens = {
    'screen-01': { navTab: 'nav-home', title: 'PAWS — Home' },
    'screen-02': { navTab: 'nav-find-care', title: 'PAWS — Discover' },
    'screen-03': { navTab: 'nav-my-animals', title: 'PAWS — Care Passport' },
    'screen-04': { navTab: 'nav-health-records', title: 'PAWS — AI Summary' }
  };

  // ==========================================================================
  // SCREEN NAVIGATION
  // ==========================================================================
  window.navigateToScreen = function(screenId) {
    if (!screens[screenId]) return;

    document.querySelectorAll('.screen-pane').forEach(el => el.classList.remove('active'));
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) targetScreen.classList.add('active');

    // Header nav links
    document.querySelectorAll('.nav-link').forEach(el => el.classList.remove('active'));
    const activeTab = document.getElementById(screens[screenId].navTab);
    if (activeTab) activeTab.classList.add('active');

    state.currentScreen = screenId;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Header Nav Click Listeners
  document.getElementById('nav-home')?.addEventListener('click', () => navigateToScreen('screen-01'));
  document.getElementById('nav-find-care')?.addEventListener('click', () => navigateToScreen('screen-02'));
  document.getElementById('nav-my-animals')?.addEventListener('click', () => navigateToScreen('screen-03'));
  document.getElementById('nav-health-records')?.addEventListener('click', () => navigateToScreen('screen-04'));

  // Category Selector on Home
  window.openCareDiscovery = function(category = 'all') {
    navigateToScreen('screen-02');
    applyFilter(category);
  };

  // Geolocation Simulation
  window.useUserLocation = function() {
    const btn = document.getElementById('btn-use-location');
    if (btn) {
      btn.innerHTML = '📍 Greater Noida (Active)';
      btn.style.backgroundColor = 'var(--sage-badge)';
      showToast('📍 Geolocation detected: Sector Alpha II, Greater Noida (Accurate within 12m)');
    }
  };

  // ==========================================================================
  // CARE DISCOVERY & MAP
  // ==========================================================================
  window.applyFilter = function(filterType) {
    state.activeFilter = filterType;

    document.querySelectorAll('.filter-pill').forEach(pill => {
      pill.classList.toggle('active', pill.dataset.filter === filterType);
    });

    // Toggle contextual emergency banner
    const emergBanner = document.getElementById('emergency-dispatch-banner');
    if (emergBanner) {
      emergBanner.classList.toggle('active', filterType === 'emergency');
    }

    const providerCards = document.querySelectorAll('.provider-card');
    providerCards.forEach(card => {
      const type = card.dataset.type;
      const isOpen = card.dataset.open === 'true';
      const isEmerg = card.dataset.emergency === 'true';
      const isAmb = card.dataset.ambulance === 'true';

      let visible = false;
      if (filterType === 'all') visible = true;
      else if (filterType === 'open' && isOpen) visible = true;
      else if (filterType === 'emergency' && isEmerg) visible = true;
      else if (filterType === 'ambulance' && isAmb) visible = true;
      else if (filterType === 'boarding' && type === 'boarding') visible = true;
      else if (filterType === 'grooming' && type === 'grooming') visible = true;
      else if (filterType === 'vet' && type === 'vet') visible = true;

      card.style.display = visible ? 'flex' : 'none';
    });

    // Map pin highlights
    document.querySelectorAll('.map-pin').forEach(pin => {
      if (filterType === 'emergency') {
        const isEmerg = pin.classList.contains('pin-emergency');
        pin.style.opacity = isEmerg ? '1' : '0.3';
        if (isEmerg) pin.classList.add('pin-active');
        else pin.classList.remove('pin-active');
      } else {
        pin.style.opacity = '1';
      }
    });
  };

  // Provider Selection & Map Sync
  window.selectProvider = function(providerId) {
    state.selectedProviderId = providerId;
    document.querySelectorAll('.provider-card').forEach(card => {
      card.classList.toggle('selected', card.id === providerId);
    });

    document.querySelectorAll('.map-pin').forEach(pin => pin.classList.remove('pin-active'));
    let targetPinId;
    if (providerId === 'provider-green-paws') targetPinId = 'pin-vet';
    if (providerId === 'provider-petcare') targetPinId = 'pin-emergency';
    if (providerId === 'provider-happy-tails') targetPinId = 'pin-boarding';
    if (providerId === 'provider-city-paws') targetPinId = 'pin-ambulance';
    if (providerId === 'provider-bark-purr') targetPinId = 'pin-grooming';

    if (targetPinId) {
      const pin = document.getElementById(targetPinId);
      if (pin) pin.classList.add('pin-active');
    }
  };

  window.onMapPinClick = function(type) {
    if (type === 'vet') selectProvider('provider-green-paws');
    if (type === 'emergency') selectProvider('provider-petcare');
    if (type === 'boarding') selectProvider('provider-happy-tails');
    if (type === 'ambulance') selectProvider('provider-city-paws');
    if (type === 'grooming') selectProvider('provider-bark-purr');

    const card = document.querySelector(`.provider-card[data-type="${type}"]`);
    if (card) {
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  };

  // ==========================================================================
  // FEATURE 3: PROVIDER PROFILE
  // Shows: Clinic name, Location, Services, Opening status, Emergency support,
  // Phone/contact, Basic information, and Actions: Call, Directions, Return to Animal
  // ==========================================================================
  window.openProviderProfile = function(providerId, event) {
    if (event) event.stopPropagation();
    const provider = state.providers.find(p => p.id === providerId) || state.providers[0];
    
    // Select on map & list
    selectProvider(provider.id);

    const modalTitle = document.getElementById('generic-modal-title');
    const modalBody = document.getElementById('generic-modal-body');
    if (modalTitle) modalTitle.innerHTML = `<span style="display: flex; align-items: center; gap: 8px;">🏥 Provider Profile</span>`;
    if (modalBody) {
      const servicesBadges = (provider.services || []).map(s => 
        `<span style="display: inline-block; font-size: 12px; font-weight: 600; padding: 4px 12px; border-radius: var(--radius-full); background: var(--sage-tint); color: var(--sage-badge-text); border: 1px solid #D6E3DB;">${s}</span>`
      ).join('');

      const isEmergency = provider.emergency;
      const emergencyBadge = isEmergency 
        ? `<span style="font-size: 12px; font-weight: 700; padding: 5px 12px; border-radius: var(--radius-full); background: var(--emergency-light); color: var(--emergency-dark); display: inline-flex; align-items: center; gap: 5px;">🚨 ${provider.emergencySupport}</span>`
        : `<span style="font-size: 12px; font-weight: 600; padding: 5px 12px; border-radius: var(--radius-full); background: var(--bg-card-subtle); color: var(--text-muted);">Standard schedule clinic</span>`;

      modalBody.innerHTML = `
        <div class="provider-profile-modal-content" style="padding: 4px 0;">
          <!-- Top Clinic Header -->
          <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 12px;">
            <div>
              <h3 style="font-size: 21px; font-weight: 800; color: var(--primary-forest); margin-bottom: 4px;">${provider.name}</h3>
              <div style="font-size: 13.5px; color: var(--text-muted); display: flex; align-items: center; gap: 6px;">
                <span>📍 ${provider.location}</span> • <strong style="color: var(--primary-forest);">${provider.distance}</strong>
              </div>
            </div>
            <span style="font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: var(--radius-full); background: #EAF4EE; color: var(--primary-forest);">
              ● ${provider.openStatus || 'Open now'}
            </span>
          </div>

          <!-- Emergency Support Badge -->
          <div style="margin-bottom: 16px;">
            ${emergencyBadge}
          </div>

          <!-- Basic Information / Overview -->
          <div style="background: var(--bg-card-subtle); border-radius: 12px; padding: 14px 16px; margin-bottom: 16px;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; letter-spacing: 0.5px;">Clinic Overview</div>
            <p style="font-size: 13.5px; line-height: 1.5; color: var(--text-main); margin-bottom: 8px;">
              ${provider.basicInfo}
            </p>
            <div style="font-size: 12.5px; font-weight: 600; color: var(--primary-forest);">
              Lead Clinician: ${provider.doctor}
            </div>
          </div>

          <!-- Services List -->
          <div style="margin-bottom: 18px;">
            <div style="font-size: 11px; font-weight: 800; text-transform: uppercase; color: var(--text-muted); margin-bottom: 8px; letter-spacing: 0.5px;">Services Provided</div>
            <div style="display: flex; flex-wrap: wrap; gap: 6px;">
              ${servicesBadges}
            </div>
          </div>

          <!-- Hours & Contact Info -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 20px; background: #FAF8F5; padding: 12px 16px; border-radius: 12px; border: 1px solid #ECE7DE;">
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Direct Contact</div>
              <div style="font-size: 15px; font-weight: 800; color: var(--primary-forest);">${provider.phone}</div>
            </div>
            <div>
              <div style="font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Operating Status</div>
              <div style="font-size: 13px; font-weight: 600; color: var(--text-main);">${provider.hours}</div>
            </div>
          </div>

          <!-- Actions: View Clinic, Call, Directions, Return to Animal -->
          <div style="display: flex; gap: 10px; flex-wrap: wrap;">
            <button class="btn-card-call" style="flex: 1; justify-content: center; padding: 10px;" onclick="callProviderAction('${provider.id}', event)">
              <span>📞</span> Call Clinic
            </button>
            <button class="btn-card-directions" style="flex: 1; justify-content: center; padding: 10px;" onclick="openDirectionsAction('${provider.id}', event)">
              <span>🗺️</span> Directions
            </button>
            <button class="btn-card-passport-link" style="padding: 10px 16px; background: var(--sage-tint); color: var(--primary-forest); border-radius: var(--radius-full); margin-left: 0; font-weight: 700;" onclick="closeGenericModal(); navigateToScreen('screen-03');">
              🐾 Return to Bruno's Passport ›
            </button>
          </div>
        </div>
      `;
    }
    openGenericModal();
  };

  // Provider Action Modal: Call
  window.callProviderAction = function(providerId, event) {
    if (event) event.stopPropagation();
    const provider = state.providers.find(p => p.id === providerId) || state.providers[0];

    const modalTitle = document.getElementById('generic-modal-title');
    const modalBody = document.getElementById('generic-modal-body');
    if (modalTitle) modalTitle.innerText = `Contact ${provider.name}`;
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="text-align: center; padding: 16px 0;">
          <div style="font-size: 40px; margin-bottom: 12px;">📞</div>
          <h4 style="font-size: 19px; font-weight: 750; margin-bottom: 4px;">${provider.name}</h4>
          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 20px;">${provider.hours} • ${provider.distance}</p>

          <div style="background: var(--bg-card-subtle); border-radius: 12px; padding: 14px 18px; text-align: left; margin-bottom: 22px;">
            <div style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Direct Phone Line</div>
            <div style="font-size: 18px; font-weight: 800; color: var(--primary-forest); margin-bottom: 8px;">${provider.phone}</div>
            <div style="font-size: 11.5px; font-weight: 700; color: var(--text-muted); text-transform: uppercase;">Doctor on Duty</div>
            <div style="font-size: 14px; font-weight: 600;">${provider.doctor}</div>
          </div>

          <button class="btn-card-call" style="width: 100%; justify-content: center; padding: 11px;" onclick="showToast('📞 Connecting call to ${provider.name}...'); closeGenericModal();">
            Connect Call
          </button>
        </div>
      `;
    }
    openGenericModal();
  };

  // Provider Action Modal: Directions
  window.openDirectionsAction = function(providerId, event) {
    if (event) event.stopPropagation();
    const provider = state.providers.find(p => p.id === providerId) || state.providers[0];

    const modalTitle = document.getElementById('generic-modal-title');
    const modalBody = document.getElementById('generic-modal-body');
    if (modalTitle) modalTitle.innerText = `Route to ${provider.name}`;
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="padding: 10px 0;">
          <div style="background: var(--sage-tint); padding: 14px 18px; border-radius: 12px; margin-bottom: 18px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <div style="font-size: 12px; font-weight: 600; color: var(--sage-badge-text);">Estimated Drive Time</div>
              <div style="font-size: 22px; font-weight: 800; color: var(--primary-forest);">5 Mins <span style="font-size: 13px; font-weight: 500;">(${provider.distance})</span></div>
            </div>
            <button class="btn-card-call" onclick="showToast('🚗 Turn-by-turn navigation started...'); closeGenericModal();">
              Start Navigation
            </button>
          </div>
          <div style="border-left: 2px solid var(--primary-forest); padding-left: 16px;">
            <div style="margin-bottom: 12px;">
              <div style="font-weight: 700; font-size: 13.5px;">1. Head north from Sector Alpha II</div>
              <div style="font-size: 12px; color: var(--text-muted);">Continue straight 500m past Pari Chowk</div>
            </div>
            <div>
              <div style="font-weight: 700; font-size: 13.5px;">2. Arrive at ${provider.name}</div>
              <div style="font-size: 12px; color: var(--text-muted);">Designated veterinary emergency parking on right</div>
            </div>
          </div>
        </div>
      `;
    }
    openGenericModal();
  };

  // Request Pet Ambulance
  window.requestPetAmbulance = function() {
    showToast('🚑 Dispatched City Paws Pet Ambulance (Paramedic on duty, ETA 6 mins).');
  };

  // ==========================================================================
  // EMERGENCY TRIAGE FLOW MODAL (Bruno needs urgent care)
  // ==========================================================================
  window.openEmergencyTriageFlow = function() {
    const modal = document.getElementById('emergency-triage-modal');
    if (!modal) return;

    // Update patient chip based on current mode
    const heading = document.getElementById('triage-modal-heading');
    const chip = document.getElementById('triage-patient-chip');
    const switchBtn = document.getElementById('btn-triage-switch-animal');

    if (state.isRescueMode) {
      if (heading) heading.innerText = 'Rescued animal needs urgent care';
      if (chip) chip.innerHTML = '<span>🆘 Unknown Dog (Rescue #104)</span>';
      if (switchBtn) switchBtn.innerText = 'Switch to Bruno';
    } else {
      if (heading) heading.innerText = `${state.passport.animal.name} needs urgent care`;
      if (chip) chip.innerHTML = `<span>🐾 ${state.passport.animal.name} (${state.passport.animal.breed} • ${state.passport.animal.age})</span>`;
      if (switchBtn) switchBtn.innerText = 'Switch to Rescued Stray';
    }

    modal.classList.add('open');
  };

  window.closeEmergencyTriageFlow = function() {
    const modal = document.getElementById('emergency-triage-modal');
    if (modal) modal.classList.remove('open');
  };

  window.selectTriageIssue = function(btn, issueName) {
    document.querySelectorAll('.triage-issue-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    state.triageSelectedIssue = issueName;
    showToast(`🚨 Emergency triage updated: ${issueName}`);
  };

  window.toggleRescueModeInTriage = function() {
    toggleRescueMode();
    // Refresh triage chip text
    const heading = document.getElementById('triage-modal-heading');
    const chip = document.getElementById('triage-patient-chip');
    const switchBtn = document.getElementById('btn-triage-switch-animal');

    if (state.isRescueMode) {
      if (heading) heading.innerText = 'Rescued animal needs urgent care';
      if (chip) chip.innerHTML = '<span>🆘 Unknown Dog (Rescue #104)</span>';
      if (switchBtn) switchBtn.innerText = 'Switch to Bruno';
    } else {
      if (heading) heading.innerText = `${state.passport.animal.name} needs urgent care`;
      if (chip) chip.innerHTML = `<span>🐾 ${state.passport.animal.name} (${state.passport.animal.breed} • ${state.passport.animal.age})</span>`;
      if (switchBtn) switchBtn.innerText = 'Switch to Rescued Stray';
    }
  };

  // ==========================================================================
  // PASSPORT SECTIONS TAB SWITCHER
  // ==========================================================================
  window.switchPassportTab = function(tabName) {
    state.currentPassportTab = tabName;

    // Update Tab buttons
    document.querySelectorAll('.passport-tab-pill').forEach(btn => {
      btn.classList.toggle('active', btn.id === `ptab-btn-${tabName}`);
    });

    // Update Tab panes
    const panes = ['health', 'vaccines', 'medications', 'reports', 'visits'];
    panes.forEach(p => {
      const pane = document.getElementById(`passport-pane-${p}`);
      if (pane) {
        pane.style.display = (p === tabName) ? 'block' : 'none';
        pane.classList.toggle('active', p === tabName);
      }
    });
  };

  // ==========================================================================
  // RESCUE MODE (I'm helping a rescued animal)
  // ==========================================================================
  window.activateRescueModeJourney = function() {
    if (!state.isRescueMode) {
      toggleRescueMode();
    }
    navigateToScreen('screen-03');
    showToast('🆘 Rescue Mode Active: Created temporary Care Passport for stray triage.');
  };

  window.toggleRescueMode = function() {
    state.isRescueMode = !state.isRescueMode;

    const avatar = document.getElementById('passport-avatar');
    const name = document.getElementById('passport-name');
    const meta = document.getElementById('passport-meta');
    const submeta = document.getElementById('passport-submeta');
    const badge = document.getElementById('passport-badge');
    const toggleBtn = document.getElementById('btn-rescue-mode');
    const rescueText = document.getElementById('dropdown-rescue-text');
    const rescueHub = document.getElementById('rescue-mode-hub');
    const passportTitle = document.getElementById('passport-title');
    const attentionCard = document.getElementById('passport-attention-card');

    // Header & Dropdown Elements
    const headerRescuePill = document.getElementById('header-rescue-badge');
    const compAvatar = document.getElementById('dropdown-companion-avatar');
    const compName = document.getElementById('dropdown-companion-name');
    const compMeta = document.getElementById('dropdown-companion-meta');
    const compTag = document.getElementById('dropdown-companion-tag');
    const rolePill = document.getElementById('profile-role-pill');

    if (state.isRescueMode) {
      if (passportTitle) passportTitle.innerText = 'Temporary Care Passport — Rescued Stray';
      if (avatar) {
        avatar.innerText = '🐕';
        avatar.classList.add('rescue-avatar');
      }
      if (name) name.innerText = state.passport.rescueAnimal.name;
      if (meta) meta.innerText = `${state.passport.rescueAnimal.breed} • ${state.passport.rescueAnimal.age} • ${state.passport.rescueAnimal.gender}`;
      if (submeta) submeta.innerText = `Temporary Profile • Location: ${state.passport.rescueAnimal.location} • Status: Urgent Triage`;
      if (badge) {
        badge.innerText = 'Status: Needs urgent care';
        badge.style.backgroundColor = 'var(--emergency-light)';
        badge.style.color = 'var(--emergency-dark)';
      }
      if (toggleBtn) {
        toggleBtn.innerText = 'Exit Rescue Mode (Back to Bruno)';
        toggleBtn.style.backgroundColor = 'var(--emergency-dark)';
        toggleBtn.style.color = 'white';
        toggleBtn.style.borderColor = 'var(--emergency-dark)';
      }
      if (rescueText) rescueText.innerText = 'Switch to Bruno (Pet Parent)';
      if (rescueHub) rescueHub.style.display = 'block';
      if (attentionCard) attentionCard.style.display = 'none';

      // Header Quick Pill
      if (headerRescuePill) {
        headerRescuePill.innerHTML = '<span>🐾</span> Back to Bruno';
        headerRescuePill.classList.add('active');
      }

      // Dropdown Companion Focus Card
      if (compAvatar) compAvatar.innerText = '🆘';
      if (compName) compName.innerText = 'Unknown Dog (Rescue)';
      if (compMeta) compMeta.innerText = 'Indie / Street Dog • 2–4 yrs';
      if (compTag) {
        compTag.innerText = '● Stray';
        compTag.style.backgroundColor = 'var(--emergency-light)';
        compTag.style.color = 'var(--emergency-dark)';
      }
      if (rolePill) {
        rolePill.innerText = 'Rescuer Mode';
        rolePill.style.backgroundColor = '#FFF0D9';
        rolePill.style.color = '#8A4F08';
      }

      // Switch feed to rescue timeline
      renderRescueTimeline();
      showToast('🆘 Rescue Mode Active: Temporary profile created for stray animal triage.');
    } else {
      if (passportTitle) passportTitle.innerText = `${state.passport.animal.name}’s Care Passport`;
      if (avatar) {
        avatar.innerText = 'B';
        avatar.classList.remove('rescue-avatar');
      }
      if (name) name.innerText = state.passport.animal.name;
      if (meta) meta.innerText = `${state.passport.animal.breed} • ${state.passport.animal.age} • ${state.passport.animal.gender}`;
      if (submeta) submeta.innerText = `Weight: 31.5 kg • Microchip: ${state.passport.animal.microchip} • Blood Group: ${state.passport.animal.bloodGroup}`;
      if (badge) {
        badge.innerText = `Next vaccine • ${state.passport.animal.nextVaccineDays} days`;
        badge.style.backgroundColor = 'var(--sage-tint)';
        badge.style.color = 'var(--sage-badge-text)';
      }
      if (toggleBtn) {
        toggleBtn.innerText = 'Switch to Rescue Mode';
        toggleBtn.style.backgroundColor = 'transparent';
        toggleBtn.style.color = 'var(--primary-forest)';
        toggleBtn.style.borderColor = 'var(--primary-forest)';
      }
      if (rescueText) rescueText.innerText = 'Switch to Rescue Mode';
      if (rescueHub) rescueHub.style.display = 'none';
      if (attentionCard) attentionCard.style.display = 'flex';

      // Header Quick Pill
      if (headerRescuePill) {
        headerRescuePill.innerHTML = '<span>🆘</span> Rescue Mode';
        headerRescuePill.classList.remove('active');
      }

      // Dropdown Companion Focus Card
      if (compAvatar) compAvatar.innerText = '🐕';
      if (compName) compName.innerText = 'Bruno';
      if (compMeta) compMeta.innerText = 'Golden Retriever • 4 yrs';
      if (compTag) {
        compTag.innerText = '● Active';
        compTag.style.backgroundColor = 'var(--sage-tint)';
        compTag.style.color = 'var(--primary-forest)';
      }
      if (rolePill) {
        rolePill.innerText = 'Pet Parent';
        rolePill.style.backgroundColor = '#E2ECE5';
        rolePill.style.color = 'var(--primary-forest)';
      }

      // Restore Bruno timeline
      renderBrunoTimeline();
      showToast('🐾 Switched to Bruno’s Lifetime Care Passport.');
    }
  };

  function renderBrunoTimeline() {
    const feed = document.getElementById('passport-timeline-feed');
    if (!feed) return;
    feed.innerHTML = state.passport.timeline.map(item => `
      <div class="timeline-item ${item.isNew ? 'just-added' : ''}">
        <div class="timeline-dot"></div>
        <div class="timeline-meta">
          <span class="timeline-date">${item.date}</span>
          <div class="timeline-details">
            <h4>${item.title} ${item.isNew ? '<span class="badge-new-item">NEW</span>' : ''}</h4>
            <p>${item.desc}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  function renderRescueTimeline() {
    const feed = document.getElementById('passport-timeline-feed');
    if (!feed) return;
    feed.innerHTML = state.passport.rescueTimeline.map(item => `
      <div class="timeline-item ${item.isNew ? 'just-added' : ''}">
        <div class="timeline-dot" style="background: var(--emergency-dark);"></div>
        <div class="timeline-meta">
          <span class="timeline-date">${item.date}</span>
          <div class="timeline-details">
            <h4>${item.title} ${item.isNew ? '<span class="badge-new-item" style="background:var(--emergency-dark)">SAVED</span>' : ''}</h4>
            <p>${item.desc}</p>
          </div>
        </div>
      </div>
    `).join('');
  }

  // NGO Modal
  window.openNGOListModal = function() {
    const modalTitle = document.getElementById('generic-modal-title');
    const modalBody = document.getElementById('generic-modal-body');
    if (modalTitle) modalTitle.innerText = 'Partner Animal Welfare NGOs & Shelters';
    if (modalBody) {
      modalBody.innerHTML = `
        <div style="padding: 6px 0;">
          <p style="font-size: 13.5px; color: var(--text-muted); margin-bottom: 16px;">
            Verified regional animal rescue organizations offering foster shelter, post-operative care, and rescue vans:
          </p>

          <div style="background: var(--bg-card-subtle); padding: 12px 16px; border-radius: 12px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 750; font-size: 14.5px; color: var(--primary-forest);">Friendicoes SECA (Emergency Animal Shelter)</div>
                <div style="font-size: 12px; color: var(--text-muted);">Greater Noida / Delhi NCR • 24×7 Stray Admissions</div>
              </div>
              <button class="btn-card-call" onclick="showToast('📞 Calling Friendicoes SECA Helpline...'); closeGenericModal();">
                Call NGO
              </button>
            </div>
          </div>

          <div style="background: var(--bg-card-subtle); padding: 12px 16px; border-radius: 12px; margin-bottom: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 750; font-size: 14.5px; color: var(--primary-forest);">People For Animals (PFA Emergency Cell)</div>
                <div style="font-size: 12px; color: var(--text-muted);">Specialized trauma ambulances & foster network</div>
              </div>
              <button class="btn-card-call" onclick="showToast('📞 Calling PFA Helpline...'); closeGenericModal();">
                Call NGO
              </button>
            </div>
          </div>

          <div style="background: var(--bg-card-subtle); padding: 12px 16px; border-radius: 12px;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <div style="font-weight: 750; font-size: 14.5px; color: var(--primary-forest);">SPCA Noida Hospital & Foster Sanctuary</div>
                <div style="font-size: 12px; color: var(--text-muted);">Sector 94 • In-patient stray recovery ward</div>
              </div>
              <button class="btn-card-call" onclick="showToast('📞 Calling SPCA Noida...'); closeGenericModal();">
                Call NGO
              </button>
            </div>
          </div>
        </div>
      `;
    }
    openGenericModal();
  };

  // Add Treatment Modal
  window.openAddTreatmentModal = function() {
    const modal = document.getElementById('rescue-treatment-modal');
    if (modal) modal.classList.add('open');
  };

  window.closeAddTreatmentModal = function() {
    const modal = document.getElementById('rescue-treatment-modal');
    if (modal) modal.classList.remove('open');
  };

  window.handleRescueTreatmentSubmit = function() {
    const notes = document.getElementById('input-treatment-notes')?.value || 'Wound flushed with saline.';
    const interventions = [];
    if (document.getElementById('chk-wound')?.checked) interventions.push('Saline wound wash');
    if (document.getElementById('chk-antiseptic')?.checked) interventions.push('Betadine antiseptic');
    if (document.getElementById('chk-food')?.checked) interventions.push('Rehydration fluid');
    if (document.getElementById('chk-splint')?.checked) interventions.push('Temporary paw bandage');

    const desc = `${interventions.join(', ')} • Notes: "${notes}"`;
    
    // Add to rescue timeline
    state.passport.rescueTimeline.unshift({
      id: `rt-${Date.now()}`,
      date: 'Just now',
      title: 'First-Aid & Triage Logged',
      desc: desc,
      isNew: true
    });

    closeAddTreatmentModal();
    renderRescueTimeline();
    showToast('✓ Treatment log saved! Stray medical record updated for next volunteer handoff.');
  };

  // ==========================================================================
  // AI MEDICAL REPORT ORGANISER WORKFLOW (5-Step Experience)
  // Step 1: Upload / Select ("Uploading...")
  // Step 2: "PAWS AI is organising the report" (animated progress & steps)
  // Step 3: "Report processed" -> 14 details extracted, 1 medication, 1 follow-up reminder
  // Step 4: Structured lab panel + safety notice
  // Step 5: Add to Care Passport -> updates health timeline, reports tab & reminders
  // ==========================================================================
  window.triggerReportUpload = function(fileName = 'blood_report_august.pdf') {
    const procModal = document.getElementById('ai-processing-modal');
    const modalTitle = document.getElementById('ai-modal-status-title');
    const progressFill = document.getElementById('ai-progress-bar-fill');
    const step1 = document.getElementById('ai-step-1');
    const step2 = document.getElementById('ai-step-2');
    const step3 = document.getElementById('ai-step-3');

    if (procModal) procModal.classList.add('open');
    if (progressFill) progressFill.style.width = '15%';
    if (modalTitle) modalTitle.innerText = 'Uploading...';

    // Step 1
    if (step1) {
      step1.className = 'ai-step-row completed';
      step1.querySelector('.step-icon').innerText = '✓';
    }
    if (step2) {
      step2.className = 'ai-step-row pending';
      step2.querySelector('.step-icon').innerText = '⏳';
    }
    if (step3) {
      step3.className = 'ai-step-row pending';
      step3.querySelector('.step-icon').innerText = '⏳';
    }

    // Step 2 progression: PAWS AI is organising the report
    setTimeout(() => {
      if (modalTitle) modalTitle.innerText = 'PAWS AI is organising the report...';
      if (progressFill) progressFill.style.width = '60%';
      if (step2) {
        step2.className = 'ai-step-row completed';
        step2.querySelector('.step-icon').innerText = '✓';
      }
    }, 550);

    // Step 3 progression: Report processed
    setTimeout(() => {
      if (modalTitle) modalTitle.innerText = 'Report processed ✓';
      if (progressFill) progressFill.style.width = '95%';
      if (step3) {
        step3.className = 'ai-step-row completed';
        step3.querySelector('.step-icon').innerText = '✓';
      }
    }, 1150);

    // Completion -> Transition smoothly to Screen 04
    setTimeout(() => {
      if (progressFill) progressFill.style.width = '100%';
      setTimeout(() => {
        if (procModal) procModal.classList.remove('open');
        navigateToScreen('screen-04');
        showToast('✓ Report processed: 14 details extracted, 1 medication detected, 1 follow-up reminder.');
      }, 350);
    }, 1600);
  };

  window.handleCustomReportSelect = function(event) {
    const file = event?.target?.files?.[0];
    if (file) {
      showToast(`📄 Selected file: ${file.name}`);
      triggerReportUpload(file.name);
    }
  };

  window.toggleLabPanel = function() {
    const table = document.getElementById('full-lab-table');
    const btn = document.getElementById('btn-expand-labs');
    if (!table || !btn) return;

    if (table.classList.contains('open')) {
      table.classList.remove('open');
      btn.innerText = 'Show full lab panel (14 values) ▾';
    } else {
      table.classList.add('open');
      btn.innerText = 'Hide full lab panel ▴';
    }
  };

  // Step 5: Add to Care Passport -> Updates Timeline, Reports list, & Generates Reminders
  window.addExtractedReportToPassport = function() {
    const addBtn = document.getElementById('btn-add-to-passport');
    if (addBtn) {
      addBtn.innerText = 'Saving to Passport...';
      addBtn.disabled = true;
    }

    setTimeout(() => {
      // 1. Add new entry into Bruno's timeline
      const newTimelineEvent = {
        id: `tl-${Date.now()}`,
        date: 'Aug 28 (Just now)',
        title: 'Blood report uploaded',
        desc: 'AI extracted 14 biomarkers • Cetirizine noted • Added follow-up reminder',
        isNew: true
      };
      state.passport.timeline.unshift(newTimelineEvent);

      // 2. Prepend report to Reports Tab
      const reportsContainer = document.getElementById('reports-list-container');
      if (reportsContainer) {
        const newReportBox = document.createElement('div');
        newReportBox.className = 'uploaded-report-box';
        newReportBox.style.border = '2px solid var(--primary-forest)';
        newReportBox.style.background = '#F2F8F4';
        newReportBox.onclick = () => triggerReportUpload('blood_report_august.pdf');
        newReportBox.innerHTML = `
          <div class="report-file-name">
            <span style="font-weight: 750; color: var(--primary-forest);">blood_report_aug28_verified.pdf</span>
            <span style="font-size: 14px;">📄 ✨</span>
          </div>
          <div class="report-file-status" style="color: var(--primary-forest); font-weight: 600;">Organised by PAWS AI • 14 details extracted • Just now</div>
        `;
        reportsContainer.prepend(newReportBox);
      }

      // 3. Update Attention Reminders
      const countText = document.getElementById('attention-count-text');
      const pillsContainer = document.getElementById('attention-pills-container');
      if (countText) countText.innerText = '2 things need your attention';
      if (pillsContainer) {
        pillsContainer.innerHTML = `
          <span class="attention-pill-item">Rabies vaccination due in 20 days</span>
          <span class="attention-pill-item" style="background: #E2ECE5; border: 1.5px solid var(--primary-forest); color: var(--primary-forest); font-weight: 750;">Follow-up mentioned in latest report</span>
        `;
      }

      if (addBtn) {
        addBtn.innerText = '✓ Added to Passport!';
      }

      showToast('✓ Added to Bruno’s Care Passport! Health timeline, reports & reminders updated.');

      // 4. Switch smoothly to Screen 03 Care Passport
      setTimeout(() => {
        navigateToScreen('screen-03');
        switchPassportTab('health');
        renderBrunoTimeline();

        // Reset button text
        if (addBtn) {
          addBtn.innerText = 'Add to Care Passport';
          addBtn.disabled = false;
        }
      }, 500);
    }, 400);
  };

  // ==========================================================================
  // PROFILE & SIGN OUT MANAGEMENT
  // ==========================================================================
  window.toggleProfileDropdown = function() {
    if (!state.isLoggedIn) {
      openSignInModal();
      return;
    }
    const menu = document.getElementById('profile-dropdown-menu');
    if (menu) menu.classList.toggle('show');
  };

  document.addEventListener('click', (e) => {
    const container = document.querySelector('.profile-menu-container');
    const menu = document.getElementById('profile-dropdown-menu');
    if (container && !container.contains(e.target)) {
      if (menu) menu.classList.remove('show');
    }
  });

  window.handleSignOutAction = function() {
    state.isLoggedIn = false;
    const menu = document.getElementById('profile-dropdown-menu');
    if (menu) menu.classList.remove('show');

    const profileLabel = document.getElementById('header-profile-label');
    const avatarCircle = document.getElementById('header-avatar-circle');
    if (profileLabel) profileLabel.innerText = 'Sign In';
    if (avatarCircle) {
      avatarCircle.innerText = '👤';
      avatarCircle.classList.add('signed-out');
    }

    showToast('🚪 Signed out of profile. You are now browsing in Guest Mode.');
  };

  window.openSignInModal = function() {
    const modalTitle = document.getElementById('generic-modal-title');
    const modalBody = document.getElementById('generic-modal-body');
    if (modalTitle) modalTitle.innerText = 'Sign In to PAWS';

    const currentName = state.userProfile.name || '';
    const currentEmail = state.userProfile.email || '';
    const currentPet = state.passport.animal.name || 'Bruno';

    if (modalBody) {
      modalBody.innerHTML = `
        <div style="padding: 4px 0;">
          <div style="text-align: center; margin-bottom: 20px;">
            <div style="font-size: 38px; margin-bottom: 8px;">🐾</div>
            <h4 style="font-size: 20px; font-weight: 750; color: var(--text-main); margin-bottom: 4px;">Sign In or Switch Profile</h4>
            <p style="font-size: 13.5px; color: var(--text-muted);">Access your animal’s care passport, records, and reminders.</p>
          </div>

          <form id="signin-custom-form" onsubmit="event.preventDefault(); handleCustomSignInSubmit();">
            <div class="form-group">
              <label class="form-label" for="input-signin-name">Your Full Name</label>
              <input type="text" id="input-signin-name" class="form-input" placeholder="e.g. Alex, Sarah, Priya, Ismayra" value="${currentName}" required autofocus>
            </div>

            <div class="form-group">
              <label class="form-label" for="input-signin-email">Email or Mobile (Optional)</label>
              <input type="text" id="input-signin-email" class="form-input" placeholder="e.g. user@paws.care or +91 98100 XXXXX" value="${currentEmail}">
            </div>

            <div class="form-group">
              <label class="form-label">Select Your Role</label>
              <div class="role-radio-grid">
                <div class="role-radio-card ${state.userProfile.role.includes('Parent') ? 'active' : ''}" id="role-parent" onclick="selectRole('Pet Parent')">
                  <span>🐾</span>
                  <span>Pet Parent</span>
                </div>
                <div class="role-radio-card ${state.userProfile.role.includes('Rescuer') ? 'active' : ''}" id="role-rescuer" onclick="selectRole('Animal Rescuer')">
                  <span>🆘</span>
                  <span>Animal Rescuer</span>
                </div>
              </div>
              <input type="hidden" id="input-signin-role" value="${state.userProfile.role || 'Pet Parent'}">
            </div>

            <div class="form-group" id="pet-name-group" style="${state.userProfile.role.includes('Rescuer') ? 'display:none;' : ''}">
              <label class="form-label" for="input-signin-pet">Your Pet's Name</label>
              <input type="text" id="input-signin-pet" class="form-input" placeholder="e.g. Bruno, Luna, Max, Charlie" value="${currentPet}">
            </div>

            <button type="submit" class="btn-card-call" style="width: 100%; justify-content: center; padding: 12px; font-size: 14.5px; font-weight: 750; margin-top: 10px;">
              Sign In to PAWS
            </button>
          </form>

          <div style="margin-top: 22px; padding-top: 18px; border-top: 1px solid #ECEEEB; text-align: center;">
            <div style="font-size: 12px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px;">
              Or Quick Sign-In with 1 Tap
            </div>
            <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
              <button class="filter-pill" onclick="confirmSignIn('Alex Morgan', 'alex@paws.care', 'Pet Parent', 'Luna')">
                🐾 Alex & Luna
              </button>
              <button class="filter-pill" onclick="confirmSignIn('Sam Volunteer', 'sam@rescue.ngo', 'Animal Rescuer', 'Community Dog')">
                🆘 Sam (Rescuer)
              </button>
              <button class="filter-pill" onclick="confirmSignIn('Dr. Ananya Sen', 'dr.sen@greenpaws.com', 'Veterinarian', 'Bruno')">
                🩺 Dr. Ananya (Vet)
              </button>
              <button class="filter-pill" onclick="confirmSignIn('Ismayra', 'ismayra@paws.care', 'Pet Parent', 'Bruno')">
                👤 Ismayra & Bruno
              </button>
            </div>
          </div>
        </div>
      `;
    }
    openGenericModal();
  };

  window.selectRole = function(role) {
    const parentCard = document.getElementById('role-parent');
    const rescuerCard = document.getElementById('role-rescuer');
    const roleInput = document.getElementById('input-signin-role');
    const petGroup = document.getElementById('pet-name-group');

    if (roleInput) roleInput.value = role;

    if (role === 'Pet Parent') {
      if (parentCard) parentCard.classList.add('active');
      if (rescuerCard) rescuerCard.classList.remove('active');
      if (petGroup) petGroup.style.display = 'block';
    } else {
      if (rescuerCard) rescuerCard.classList.add('active');
      if (parentCard) parentCard.classList.remove('active');
      if (petGroup) petGroup.style.display = 'none';
    }
  };

  window.handleCustomSignInSubmit = function() {
    const nameInput = document.getElementById('input-signin-name');
    const emailInput = document.getElementById('input-signin-email');
    const roleInput = document.getElementById('input-signin-role');
    const petInput = document.getElementById('input-signin-pet');

    const name = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : 'Guest User';
    const email = (emailInput && emailInput.value.trim()) ? emailInput.value.trim() : `${name.toLowerCase().replace(/\s+/g, '.')}@paws.care`;
    const role = (roleInput && roleInput.value) ? roleInput.value : 'Pet Parent';
    const petName = (petInput && petInput.value.trim()) ? petInput.value.trim() : 'Bruno';

    confirmSignIn(name, email, role, petName);
  };

  window.confirmSignIn = function(name, email, role, petName = 'Bruno') {
    state.isLoggedIn = true;
    state.userProfile.name = name;
    state.userProfile.email = email;
    state.userProfile.role = role;
    state.userProfile.initials = name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase();

    if (role === 'Animal Rescuer') {
      state.isRescueMode = true;
    } else {
      state.isRescueMode = false;
      state.passport.animal.name = petName;
    }

    const profileLabel = document.getElementById('header-profile-label');
    const avatarCircle = document.getElementById('header-avatar-circle');
    const dropdownName = document.getElementById('dropdown-user-name');
    const dropdownEmail = document.getElementById('dropdown-user-email');
    const dropdownAvatar = document.getElementById('dropdown-user-avatar');
    const passportTitle = document.getElementById('passport-title');
    const passportName = document.getElementById('passport-name');
    const passportAvatar = document.getElementById('passport-avatar');

    if (profileLabel) profileLabel.innerText = `${name} ▾`;
    if (avatarCircle) {
      avatarCircle.innerText = state.userProfile.initials;
      avatarCircle.classList.remove('signed-out');
    }
    if (dropdownName) dropdownName.innerText = name;
    if (dropdownEmail) dropdownEmail.innerText = `${email} • ${role}`;
    if (dropdownAvatar) dropdownAvatar.innerText = state.userProfile.initials;

    if (!state.isRescueMode) {
      if (passportTitle) passportTitle.innerText = `${petName}’s Care Passport`;
      if (passportName) passportName.innerText = petName;
      if (passportAvatar) passportAvatar.innerText = petName[0] || 'B';
    } else {
      toggleRescueMode();
      state.isRescueMode = true; // ensure active
    }

    closeGenericModal();
    showToast(`✓ Welcome, ${name}! Signed in as ${role}.`);
  };

  // ==========================================================================
  // MODAL HELPERS & TOAST
  // ==========================================================================
  window.openGenericModal = function() {
    const modal = document.getElementById('generic-modal');
    if (modal) modal.classList.add('open');
  };

  window.closeGenericModal = function() {
    const modal = document.getElementById('generic-modal');
    if (modal) modal.classList.remove('open');
  };

  const modalOverlay = document.getElementById('generic-modal');
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeGenericModal();
    });
  }

  const triageOverlay = document.getElementById('emergency-triage-modal');
  if (triageOverlay) {
    triageOverlay.addEventListener('click', (e) => {
      if (e.target === triageOverlay) closeEmergencyTriageFlow();
    });
  }

  const treatmentOverlay = document.getElementById('rescue-treatment-modal');
  if (treatmentOverlay) {
    treatmentOverlay.addEventListener('click', (e) => {
      if (e.target === treatmentOverlay) closeAddTreatmentModal();
    });
  }

  let toastTimer;
  window.showToast = function(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;

    toast.innerText = msg;
    toast.classList.add('show');

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove('show');
    }, 3800);
  };

  // Initial render of timeline
  renderBrunoTimeline();

  // Initialize Screen
  navigateToScreen('screen-01');
});
