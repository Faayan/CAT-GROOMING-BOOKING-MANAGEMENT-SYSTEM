
// ── DATA ─────────────────────────────────────────────────
let appointments = [
  {
    id: '1',
    appointmentNo: 'APT-2025-001',
    customerName: 'Ali Ahmad',
    customerPhone: '+60123456789',
    customerEmail: 'ali.ahmad@example.com',
    catName: 'Whiskers',
    catBreed: 'Persian',
    date: '2025-01-20',
    time: '10:00 AM',
    services: ['Basic Bath & Dry', 'Nail Trimming', 'Ear Cleaning'],
    totalCost: 100,
    status: 'pending',
    notes: 'Please be gentle with Whiskers, he is nervous around strangers.'
  },
  {
    id: '2',
    appointmentNo: 'APT-2025-002',
    customerName: 'Sarah Lee',
    customerPhone: '+60124567890',
    customerEmail: 'sarah.lee@example.com',
    catName: 'Fluffy',
    catBreed: 'Maine Coon',
    date: '2025-01-21',
    time: '2:00 PM',
    services: ['Full Grooming Package', 'Flea Treatment'],
    totalCost: 240,
    status: 'pending',
    notes: 'Fluffy needs special hypoallergenic shampoo.'
  },
  {
    id: '3',
    appointmentNo: 'APT-2025-003',
    customerName: 'John Doe',
    customerPhone: '+15551234567',
    customerEmail: 'john.doe@example.com',
    catName: 'Shadow',
    catBreed: 'British Shorthair',
    date: '2025-01-22',
    time: '11:30 AM',
    services: ['Basic Bath & Dry', 'Deshedding Treatment'],
    totalCost: 120,
    status: 'pending',
    notes: ''
  },
  {
    id: '4',
    appointmentNo: 'APT-2025-004',
    customerName: 'Siti Rahman',
    customerPhone: '+60137890123',
    customerEmail: 'siti.rahman@example.com',
    catName: 'Momo',
    catBreed: 'Ragdoll',
    date: '2025-01-23',
    time: '3:30 PM',
    services: ['Premium Bath & Blow Dry', 'Sanitary Trim', 'Teeth Brushing'],
    totalCost: 160,
    status: 'confirmed',
    notes: ''
  },
  {
    id: '5',
    appointmentNo: 'APT-2025-005',
    customerName: 'Hafiz Azman',
    customerPhone: '+60169887766',
    customerEmail: 'hafiz.azman@example.com',
    catName: 'Oreo',
    catBreed: 'Domestic Shorthair',
    date: '2025-01-24',
    time: '9:00 AM',
    services: ['Basic Bath & Dry', 'Nail Trimming'],
    totalCost: 80,
    status: 'confirmed',
    notes: ''
  }
];

let generatedInvoices = []; // appointment ids with generated invoices
let selectedId = null;
let currentInvoice = null;

// ── HELPERS ───────────────────────────────────────────────
function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
}

function fmtDateShort(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-MY', {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function statusBadge(status) {
  const map = {
    pending:   ['status-pending',   'Pending'],
    confirmed: ['status-confirmed', 'Confirmed'],
    cancelled: ['status-cancelled', 'Cancelled'],
    completed: ['status-completed', 'Completed'],
  };
  const [cls, label] = map[status] || map.pending;
  return `<span class="status-badge ${cls}">${label}</span>`;
}

function svgIcon(type) {
  const icons = {
    user:    `<svg viewBox="0 0 24 24"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>`,
    phone:   `<svg viewBox="0 0 24 24"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.09a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>`,
    mail:    `<svg viewBox="0 0 24 24"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>`,
    cat:     `<svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/><path d="M8 9l4-4 4 4"/><path d="M8 15s1.5 2 4 2 4-2 4-2"/><circle cx="9" cy="12" r="1"/><circle cx="15" cy="12" r="1"/></svg>`,
    clock:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    dollar:  `<svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    check:   `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"/></svg>`,
    x:       `<svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`,
    bell:    `<svg viewBox="0 0 24 24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>`,
    file:    `<svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>`,
    alert:   `<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`,
    cal:     `<svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>`,
    down:    `<svg viewBox="0 0 24 24"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`,
  };
  return icons[type] || ''; 
}

// ── RENDER ────────────────────────────────────────────────
function renderAll() {
  const pending   = appointments.filter(a => a.status === 'pending');
  const confirmed = appointments.filter(a => a.status === 'confirmed');

  // Add this safety check for the label
  const pendingLabel = document.getElementById('pending-count-label');
  if (pendingLabel) pendingLabel.textContent = pending.length;

  // stats
  document.getElementById('stat-pending').textContent   = pending.length;
  document.getElementById('stat-confirmed').textContent = confirmed.length;
  
  // pending section
  const pendingGrid = document.getElementById('pending-grid');
  const pendingEmpty = document.getElementById('pending-empty');
  if (pending.length === 0) {
    pendingGrid.classList.add('hidden');
    pendingEmpty.classList.remove('hidden');
  } else {
    pendingEmpty.classList.add('hidden');
    pendingGrid.classList.remove('hidden');
    pendingGrid.innerHTML = pending.map(a => cardHTML(a)).join('');
  }

  // confirmed section
  const confirmedSection = document.getElementById('confirmed-section');
  if (confirmed.length === 0) {
    confirmedSection.classList.add('hidden');
  } else {
    confirmedSection.classList.remove('hidden');
    document.getElementById('confirmed-count').textContent = confirmed.length;
    document.getElementById('confirmed-grid').innerHTML = confirmed.map(a => cardHTML(a)).join('');
  }
}

function cardHTML(a) {
  const invoiced = generatedInvoices.includes(a.id);
  const servicesHTML = a.services.map(s => `<span class="service-pill">${s}</span>`).join('');
  const notesHTML = a.notes
    ? `<div class="notes-box">⚠️ <strong>Special Notes:</strong> ${a.notes}</div>` : '';

  let actionsHTML = '';
  if (a.status === 'pending') {
    actionsHTML = `
      <hr class="apt-divider"/>
      <div class="apt-actions">
        <button class="btn btn-confirm" onclick="openConfirmModal('${a.id}')">
          ${svgIcon('check')} Confirm
        </button>
        <button class="btn btn-reject" onclick="openRejectModal('${a.id}')">
          ${svgIcon('x')} Reject
        </button>
      </div>`;
  } else if (a.status === 'confirmed') {
    actionsHTML = `
      <hr class="apt-divider"/>

      <div class="confirmed-notif">
        ${svgIcon('bell')} Customer has been notified ✓
      </div>

      <div class="invoice-hint">
        💡 Invoice can be generated in the Payment/Invoice module.
      </div>

      <button class="btn btn-invoice" onclick="window.location.href='../invoice/generateInvoice.html'">
        ${svgIcon('file')} Generate Invoice
      </button>
    `;
  }

  return `
    <div class="apt-card" id="card-${a.id}">
      <div class="apt-card-top">
        <div class="apt-card-top-left">
          <div class="apt-cal-icon">${svgIcon('cal')}</div>
          <div>
            <div class="apt-no">${a.appointmentNo}</div>
            <div class="apt-date">${fmtDate(a.date)}</div>
          </div>
        </div>
        <div class="top-right-actions">
        ${statusBadge(a.status)}

        ${a.status === 'confirmed' ? `
          <button class="wa-mini-btn" onclick="sendWhatsApp('${a.id}')">
            ${svgIcon('bell')}
          </button>
        ` : ''}
      </div>
      </div>

      <div class="apt-info">
        <div class="apt-row">${svgIcon('user')} <strong>${a.customerName}</strong></div>
        <div class="apt-row muted">${svgIcon('phone')} ${a.customerPhone}</div>
        <div class="apt-row muted">${svgIcon('mail')} ${a.customerEmail}</div>
        <div class="apt-row sep">${svgIcon('cat')} <strong>${a.catName}</strong> <span style="color:var(--text-muted);font-size:0.82rem;">(${a.catBreed})</span></div>
        <div class="apt-row">${svgIcon('clock')} ${a.time}</div>
      </div>

      <div class="services-label">Services:</div>
      <div class="services-pills">${servicesHTML}</div>

      <div class="apt-total">${svgIcon('dollar')} Total: RM ${a.totalCost.toFixed(2)}</div>
      ${notesHTML}
      ${actionsHTML}
    </div>`;
}

// ── MODALS ────────────────────────────────────────────────
function openConfirmModal(id) {
  selectedId = id;
  const a = appointments.find(x => x.id === id);
  document.getElementById('confirm-customer').textContent  = a.customerName;
  document.getElementById('confirm-cat').textContent       = a.catName;
  document.getElementById('confirm-datetime').textContent  =
    `${new Date(a.date).toLocaleDateString('en-MY')} at ${a.time}`;
  document.getElementById('confirmModal').classList.remove('hidden');
}

function openRejectModal(id) {
  selectedId = id;
  const a = appointments.find(x => x.id === id);
  document.getElementById('reject-customer').textContent  = a.customerName;
  document.getElementById('reject-cat').textContent       = a.catName;
  document.getElementById('reject-datetime').textContent  =
    `${new Date(a.date).toLocaleDateString('en-MY')} at ${a.time}`;
  document.getElementById('rejectModal').classList.remove('hidden');
}

function closeModal(id) {
  document.getElementById(id).classList.add('hidden');
  selectedId = null;
}

function doConfirm() {
  if (!selectedId) return;
  appointments = appointments.map(a =>
    a.id === selectedId ? { ...a, status: 'confirmed' } : a
  );
  closeModal('confirmModal');
  renderAll();
  showToast('Booking Confirmed!', 'Customer has been notified.');
}

function doReject() {
  if (!selectedId) return;
  appointments = appointments.map(a =>
    a.id === selectedId ? { ...a, status: 'cancelled' } : a
  );
  closeModal('rejectModal');
  renderAll();
  showToast('Booking Rejected', 'Customer has been notified.', '#dc2626');
}

// ── WHATSAPP ──────────────────────────────────────────────
function sendWhatsApp(id) {
  const a = appointments.find(x => x.id === id);
  if (!a) return;

  // remove + symbol and spaces
  const phone = a.customerPhone.replace(/\+/g, '').replace(/\s/g, '');

  const message = `Hello ${a.customerName}, Your grooming appointment has been confirmed.

  Appointment No: ${a.appointmentNo}
  Cat Name: ${a.catName}
  Date: ${fmtDate(a.date)}
  Time: ${a.time}

  Thank you for choosing Meowy Groom 🐱`;

    const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

    window.open(url, '_blank');
  }

function closeInvoice() {
  document.getElementById('invoiceModal').classList.add('hidden');
  currentInvoice = null;
}

// ── TOAST ─────────────────────────────────────────────────
function showToast(title, msg, bg = '#166534') {
  const t = document.getElementById('toast');

  document.getElementById('toast-title').textContent = title;
  document.getElementById('toast-msg').textContent = msg;

  t.style.background = bg;

  t.classList.add('show');

  setTimeout(() => {
    t.classList.remove('show');
  }, 4000);
}

// ── INIT ──────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderAll();
});