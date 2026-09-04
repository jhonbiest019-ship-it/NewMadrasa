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
let cloudSyncInterval = null;

document.addEventListener('DOMContentLoaded', () => {
  initAdminAuth();
  initAdminFirebase();
  setupBroadcastListener();
  startCloudAutoSync();
  checkAdminHashActions();
});
window.addEventListener('hashchange', checkAdminHashActions);

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
    syncFromCloudServer();
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
    syncFromCloudServer();
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
// 2. REALTIME CLOUD & CROSS-TAB SYNC ENGINE
// ==========================================================================

function setupBroadcastListener() {
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('mms_auth_sync');
      bc.onmessage = (event) => {
        if (event && event.data) {
          console.log("Broadcast notification received:", event.data);
          syncFromCloudServer();
        }
      };
    }
  } catch (err) {}
}

function startCloudAutoSync() {
  if (cloudSyncInterval) clearInterval(cloudSyncInterval);
  cloudSyncInterval = setInterval(() => {
    if (adminState.isAuthenticated) {
      syncFromCloudServer(true); // Silent background fetch
    }
  }, 4000);
}

async function syncFromCloudServer(silent = false) {
  try {
    const res = await fetch('/api/accounts');
    if (res.ok) {
      const data = await res.json();
      if (data && data.accounts && Array.isArray(data.accounts)) {
        let localAccounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
        let updated = false;

        data.accounts.forEach(cloudUser => {
          if (!cloudUser || !cloudUser.account_id) return;
          const idx = localAccounts.findIndex(a => a.account_id === cloudUser.account_id || (a.email && cloudUser.email && a.email.toLowerCase() === cloudUser.email.toLowerCase()));
          if (idx !== -1) {
            if (JSON.stringify(localAccounts[idx]) !== JSON.stringify(cloudUser)) {
              localAccounts[idx] = Object.assign({}, localAccounts[idx], cloudUser);
              updated = true;
            }
          } else {
            localAccounts.push(cloudUser);
            updated = true;
          }
        });

        if (updated || localAccounts.length !== adminState.users.length) {
          localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(localAccounts));
          if (adminState.isAuthenticated) {
            loadAdminUsersData();
          }
        }
      }
    }
  } catch (err) {
    if (!silent) console.log("Cloud sync fetch notice:", err);
  }
}

function initAdminFirebase() {
  const dbUrl = localStorage.getItem('mms_firebase_url') || "https://newmadrasa-default-rtdb.firebaseio.com";
  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        firebase.initializeApp({ databaseURL: dbUrl });
      }
      firebaseDb = firebase.database();
      const statusEl = document.getElementById('admin-cloud-status');
      if (statusEl) statusEl.innerText = 'Real-Time Cloud Active';

      // Listen for Live User Registrations from Firebase Realtime Database
      firebaseDb.ref('registered_accounts').on('value', (snapshot) => {
        const cloudAccounts = snapshot.val();
        if (cloudAccounts) {
          let localAccounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
          
          Object.values(cloudAccounts).forEach(cloudUser => {
            if (!cloudUser || !cloudUser.account_id) return;
            const idx = localAccounts.findIndex(a => a.account_id === cloudUser.account_id || a.email === cloudUser.email);
            if (idx !== -1) {
              localAccounts[idx] = Object.assign({}, localAccounts[idx], cloudUser);
            } else {
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
    if (adminState.currentFilter === 'pending' && u.status !== 'pending') return false;
    if (adminState.currentFilter === 'approved' && (u.status !== 'approved' && u.role !== 'super_admin')) return false;
    if (adminState.currentFilter === 'rejected' && u.status !== 'rejected') return false;

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
// 4. ACTION FUNCTIONS: APPROVE / REJECT / DELETE / QUICK ADD
// ==========================================================================

function approveUser(accountId) {
  const user = adminState.users.find(u => u.account_id === accountId);
  if (!user) return;

  if (confirm(`Approve account access for "${user.username}" (${user.email})?`)) {
    user.status = 'approved';
    saveAdminUsersState();
    syncUserStatusToCloud(user);

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
    syncUserStatusToCloud(user);

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

    // Push full updated users array to API
    try {
      fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(adminState.users)
      });
    } catch (err) {}

    if (firebaseDb) {
      try {
        firebaseDb.ref('registered_accounts/' + accountId).remove();
      } catch (err) {}
    }

    alert(`🗑️ Account ${user.username} deleted successfully.`);
    loadAdminUsersData();
  }
}

function quickApproveNewUser() {
  const input = prompt("Enter User Email, Mobile Number, or Username to approve directly:");
  if (!input) return;

  const target = input.trim().toLowerCase();
  let user = adminState.users.find(u => 
    (u.email && u.email.toLowerCase() === target) ||
    (u.username && u.username.toLowerCase() === target) ||
    u.phone === target ||
    u.account_id === target
  );

  if (user) {
    user.status = 'approved';
    saveAdminUsersState();
    syncUserStatusToCloud(user);
    alert(`✅ User "${user.username}" (${user.email}) has been Approved!`);
    loadAdminUsersData();
  } else {
    // Create & Approve account immediately
    const cleanTarget = target.replace(/[^a-z0-9]/g, '');
    const newUser = {
      account_id: 'acc_' + cleanTarget + '_' + Date.now(),
      username: input.split('@')[0],
      email: target.includes('@') ? target : target + '@madrasa.com',
      phone: target,
      clean_phone: target,
      pin: '123456',
      role: 'admin',
      created_at: new Date().toISOString().split('T')[0],
      email_verified: true,
      status: 'approved'
    };

    adminState.users.push(newUser);
    saveAdminUsersState();
    syncUserStatusToCloud(newUser);
    alert(`✅ New Account created and Approved for "${newUser.username}" (${newUser.email})!`);
    loadAdminUsersData();
  }
}

function saveAdminUsersState() {
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(adminState.users));
}

function syncUserStatusToCloud(user) {
  // 1. Post single user update to API
  try {
    fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    });
  } catch (err) {}

  // 2. Broadcast Channel for instant tab sync
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('mms_auth_sync');
      bc.postMessage({ type: 'STATUS_UPDATE', user: user });
    }
  } catch (err) {}

  // 3. Firebase DB
  if (firebaseDb) {
    try {
      firebaseDb.ref('registered_accounts/' + user.account_id).set(user);
    } catch (e) {
      console.error("Cloud status update error:", e);
    }
  }
}

function checkAdminHashActions() {
  const hash = window.location.hash;
  if (hash && hash.includes('approve?')) {
    try {
      const urlParams = new URLSearchParams(hash.split('?')[1]);
      const accountId = urlParams.get('account');
      const email = urlParams.get('email');
      const name = urlParams.get('name') || 'User';

      if (email || accountId) {
        let localAccounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
        const accId = accountId || ('acc_' + (email || '').replace(/[^a-z0-9]/g, ''));
        const idx = localAccounts.findIndex(a => a.account_id === accId || (a.email && a.email.toLowerCase() === (email || '').toLowerCase()));

        let approvedUser;
        if (idx !== -1) {
          localAccounts[idx].status = 'approved';
          approvedUser = localAccounts[idx];
        } else {
          approvedUser = {
            account_id: accId,
            username: name,
            email: email || 'user@madrasa.com',
            phone: '03000000000',
            clean_phone: '923000000000',
            pin: '123456',
            role: 'admin',
            created_at: new Date().toISOString().split('T')[0],
            email_verified: true,
            status: 'approved'
          };
          localAccounts.push(approvedUser);
        }

        localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(localAccounts));
        syncUserStatusToCloud(approvedUser);
        window.location.hash = '';
        alert(`✅ Direct Account Approved for "${approvedUser.username}" (${approvedUser.email})!`);
        loadAdminUsersData();
      }
    } catch (e) {}
  }
}
