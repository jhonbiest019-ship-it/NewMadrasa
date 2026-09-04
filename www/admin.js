// ==========================================================================
// MADRASA PRO — SUPER ADMIN PORTAL ENGINE (admin.js)
// ==========================================================================

const STORAGE_KEYS = {
  ACCOUNTS: 'mms_user_accounts',
  ADMIN_SESSION: 'mms_admin_session'
};

let adminState = {
  users: [],
  currentFilter: 'all',
  isAuthenticated: false
};

let firebaseDb = null;

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initAdminFirebase();
});

// ==========================================================================
// 1. ADMIN AUTHENTICATION
// ==========================================================================

function initAdminAuth() {
  const savedAdminSession = localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION);
  const overlay = document.getElementById('admin-auth-overlay');
  const appContainer = document.getElementById('admin-app-container');

  if (savedAdminSession === 'true') {
    adminState.isAuthenticated = true;
    if (overlay) overlay.style.display = 'none';
    if (appContainer) appContainer.style.display = 'block';
    loadAdminUsersData();
  } else {
    adminState.isAuthenticated = false;
    if (overlay) overlay.style.display = 'flex';
    if (appContainer) appContainer.style.display = 'none';
  }
}

function handleAdminLogin(e) {
  if (e && e.preventDefault) e.preventDefault();

  const cred = document.getElementById('admin-cred')?.value.trim().toLowerCase();
  const pin = document.getElementById('admin-pin')?.value.trim();

  // Super Admin Master Verification
  if ((cred === 'admin@madrasa.com' || cred === 'admin') && (pin === '123456' || pin === 'admin786')) {
    adminState.isAuthenticated = true;
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, 'true');

    const overlay = document.getElementById('admin-auth-overlay');
    const appContainer = document.getElementById('admin-app-container');

    if (overlay) overlay.style.display = 'none';
    if (appContainer) appContainer.style.display = 'block';

    loadAdminUsersData();
  } else {
    alert('❌ Invalid Super Admin Credentials!\n\nPlease enter valid Super Admin Email and Master PIN.');
  }
}

function handleAdminLogout() {
  if (confirm('Are you sure you want to sign out from Super Admin Portal?')) {
    localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
    adminState.isAuthenticated = false;

    document.getElementById('admin-app-container').style.display = 'none';
    document.getElementById('admin-auth-overlay').style.display = 'flex';
  }
}

// ==========================================================================
// 2. FIREBASE REALTIME CLOUD LISTENER
// ==========================================================================

function initAdminFirebase() {
  const dbUrl = localStorage.getItem('mms_firebase_url') || "https://newmadrasa-default-rtdb.firebaseio.com";
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        firebase.initializeApp({ databaseURL: dbUrl });
      }
      firebaseDb = firebase.database();
      document.getElementById('admin-cloud-status').innerText = 'Firebase Live Connected';

      // Listen for Live User Registrations from Firebase Realtime Database
      firebaseDb.ref('registered_accounts').on('value', (snapshot) => {
        const cloudAccounts = snapshot.val();
        if (cloudAccounts) {
          let localAccounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
          
          Object.values(cloudAccounts).forEach(cloudUser => {
            if (!cloudUser || !cloudUser.account_id) return;
            const idx = localAccounts.findIndex(a => a.account_id === cloudUser.account_id || a.email === cloudUser.email);
            if (idx !== -1) {
              // Update existing status
              localAccounts[idx] = Object.assign({}, localAccounts[idx], cloudUser);
            } else {
              // Append new user
              localAccounts.push(cloudUser);
            }
          });

          localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(localAccounts));
          if (adminState.isAuthenticated) {
            loadAdminUsersData();
          }
        }
      });
    }
  } catch (err) {
    console.warn("Admin Firebase initialization note:", err.message);
  }
}

// ==========================================================================
// 3. USER MANAGEMENT LOGIC
// ==========================================================================

function loadAdminUsersData() {
  let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
  
  // Ensure default admin account is present
  if (!accounts.some(a => a.email === 'admin@madrasa.com')) {
    accounts.unshift({
      account_id: 'admin_vault',
      username: 'Super Admin',
      email: 'admin@madrasa.com',
      phone: '03001234567',
      created_at: '2026-01-01',
      status: 'approved',
      role: 'super_admin'
    });
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }

  adminState.users = accounts;
  updateAdminMetrics();
  renderAdminUsersTable();
}

function updateAdminMetrics() {
  const total = adminState.users.length;
  const pending = adminState.users.filter(u => u.status === 'pending').length;
  const approved = adminState.users.filter(u => u.status === 'approved' || u.role === 'super_admin').length;
  const rejected = adminState.users.filter(u => u.status === 'rejected').length;

  document.getElementById('stat-total-users').innerText = total;
  document.getElementById('stat-pending-users').innerText = pending;
  document.getElementById('stat-approved-users').innerText = approved;
  document.getElementById('stat-rejected-users').innerText = rejected;

  document.getElementById('cnt-all').innerText = total;
  document.getElementById('cnt-pending').innerText = pending;
  document.getElementById('cnt-approved').innerText = approved;
  document.getElementById('cnt-rejected').innerText = rejected;
}

function filterAdminUsers(filter) {
  adminState.currentFilter = filter;
  ['all', 'pending', 'approved', 'rejected'].forEach(f => {
    const btn = document.getElementById(`tab-${f}`);
    if (btn) {
      if (f === filter) btn.classList.add('active');
      else btn.classList.remove('active');
    }
  });
  renderAdminUsersTable();
}

function renderAdminUsersTable() {
  const tbody = document.getElementById('admin-users-table-body');
  if (!tbody) return;

  const searchQuery = (document.getElementById('admin-search-input')?.value || '').toLowerCase().trim();

  let filtered = adminState.users.filter(u => {
    // Filter tab check
    if (adminState.currentFilter === 'pending' && u.status !== 'pending') return false;
    if (adminState.currentFilter === 'approved' && (u.status !== 'approved' && u.role !== 'super_admin')) return false;
    if (adminState.currentFilter === 'rejected' && u.status !== 'rejected') return false;

    // Search query check
    if (searchQuery) {
      const nameMatch = (u.username || '').toLowerCase().includes(searchQuery);
      const emailMatch = (u.email || '').toLowerCase().includes(searchQuery);
      const phoneMatch = (u.phone || '').toLowerCase().includes(searchQuery);
      return nameMatch || emailMatch || phoneMatch;
    }

    return true;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" style="text-align:center; padding:2rem; color:var(--text-muted);">
          <i class="fa-solid fa-users-slash" style="font-size:2rem; margin-bottom:8px; display:block;"></i>
          No user accounts match the current filter criteria.
        </td>
      </tr>
    `;
    return;
  }

  tbody.innerHTML = filtered.map(u => {
    const status = u.status || (u.role === 'super_admin' ? 'approved' : 'approved');
    let statusBadge = '';
    if (status === 'pending') {
      statusBadge = `<span class="badge-pending-pill"><i class="fa-solid fa-hourglass-half"></i> PENDING</span>`;
    } else if (status === 'approved') {
      statusBadge = `<span class="badge-approved-pill"><i class="fa-solid fa-circle-check"></i> APPROVED</span>`;
    } else {
      statusBadge = `<span class="badge-rejected-pill"><i class="fa-solid fa-circle-xmark"></i> REJECTED</span>`;
    }

    const isSuperAdmin = u.role === 'super_admin' || u.email === 'admin@madrasa.com';
    const roleLabels = {
      'admin': '<span class="badge badge-hifz" style="margin-left:6px; font-size:0.7rem;">Admin</span>',
      'teacher': '<span class="badge badge-nazra" style="margin-left:6px; font-size:0.7rem;">Muallim</span>',
      'parent': '<span class="badge badge-qaida" style="margin-left:6px; font-size:0.7rem;">Parent</span>'
    };
    const roleBadge = isSuperAdmin 
      ? `<span class="badge badge-qaida" style="margin-left:6px; font-size:0.7rem;">Super Admin</span>` 
      : (roleLabels[u.role] || '');

    return `
      <tr style="border-bottom:1px solid rgba(255,255,255,0.05);">
        <td>
          <strong style="color:#fff; font-size:0.95rem;">${u.username || 'User'}</strong>
          ${roleBadge}
          <div style="font-size:0.75rem; color:var(--text-muted); font-family:monospace; margin-top:2px;">ID: ${u.account_id}</div>
        </td>
        <td>
          <div style="font-size:0.85rem; color:#fff;">📧 ${u.email}</div>
          <div style="font-size:0.8rem; color:var(--emerald-400); margin-top:2px;">📞 ${u.phone}</div>
        </td>
        <td style="font-size:0.85rem; color:var(--text-muted);">
          ${u.created_at || 'N/A'}
        </td>
        <td>
          ${statusBadge}
        </td>
        <td>
          ${isSuperAdmin ? `
            <span style="font-size:0.8rem; color:var(--text-muted); font-style:italic;">Protected Account</span>
          ` : `
            <div style="display:flex; gap:6px; flex-wrap:wrap;">
              ${status !== 'approved' ? `
                <button type="button" class="btn-approve" onclick="approveUser('${u.account_id}')">
                  <i class="fa-solid fa-check"></i> Approve
                </button>
              ` : ''}
              ${status !== 'rejected' ? `
                <button type="button" class="btn-reject" onclick="rejectUser('${u.account_id}')">
                  <i class="fa-solid fa-ban"></i> Reject
                </button>
              ` : ''}
              <button type="button" class="btn btn-danger btn-sm" onclick="deleteUserAccount('${u.account_id}')" title="Delete Account" style="padding:0.4rem 0.65rem;">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

// ==========================================================================
// 4. ACTION FUNCTIONS: APPROVE / REJECT / DELETE
// ==========================================================================

function approveUser(accountId) {
  const user = adminState.users.find(u => u.account_id === accountId);
  if (!user) return;

  if (confirm(`Approve account access for "${user.username}" (${user.email})?`)) {
    user.status = 'approved';
    saveAdminUsersState();
    syncUserStatusToFirebase(user);

    alert(`✅ Account Approved!\n\n${user.username} can now log in to Madrasa ERP.`);
    loadAdminUsersData();
  }
}

function rejectUser(accountId) {
  const user = adminState.users.find(u => u.account_id === accountId);
  if (!user) return;

  if (confirm(`Are you sure you want to REJECT access for "${user.username}" (${user.email})?`)) {
    user.status = 'rejected';
    saveAdminUsersState();
    syncUserStatusToFirebase(user);

    alert(`❌ Account Access Rejected for ${user.username}.`);
    loadAdminUsersData();
  }
}

function deleteUserAccount(accountId) {
  const user = adminState.users.find(u => u.account_id === accountId);
  if (!user) return;

  if (confirm(`⚠️ Permanent Action!\nAre you sure you want to DELETE user account "${user.username}"?`)) {
    adminState.users = adminState.users.filter(u => u.account_id !== accountId);
    saveAdminUsersState();

    if (firebaseDb) {
      try {
        firebaseDb.ref('registered_accounts/' + accountId).remove();
      } catch (err) {}
    }

    alert(`🗑️ Account ${user.username} deleted successfully.`);
    loadAdminUsersData();
  }
}

function saveAdminUsersState() {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(adminState.users));
}

function syncUserStatusToFirebase(user) {
  if (!firebaseDb) return;
  try {
    firebaseDb.ref('registered_accounts/' + user.account_id).set(user);
  } catch (e) {
    console.error("Cloud status update error:", e);
  }
}
