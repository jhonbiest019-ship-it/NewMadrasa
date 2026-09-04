// ==========================================================================
// VERCEL SERVERLESS CLOUD RELAY FOR USER REGISTRATIONS & APPROVALS
// ==========================================================================

let registeredAccountsStore = [
  {
    account_id: 'admin_vault',
    username: 'Super Admin',
    email: 'admin@madrasa.com',
    phone: '03001234567',
    clean_phone: '923001234567',
    pin: '123456',
    created_at: '2026-01-01',
    email_verified: true,
    status: 'approved',
    role: 'super_admin'
  }
];

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'POST' || req.method === 'PUT') {
    try {
      let body = req.body;
      if (typeof body === 'string') {
        body = JSON.parse(body);
      }

      if (Array.isArray(body)) {
        body.forEach(user => {
          if (!user || !user.account_id) return;
          const idx = registeredAccountsStore.findIndex(
            a => a.account_id === user.account_id || (a.email && user.email && a.email.toLowerCase() === user.email.toLowerCase())
          );
          if (idx !== -1) {
            registeredAccountsStore[idx] = Object.assign({}, registeredAccountsStore[idx], user);
          } else {
            registeredAccountsStore.push(user);
          }
        });
      } else if (body && (body.account_id || body.email)) {
        const accId = body.account_id || ('acc_' + (body.email || '').replace(/[^a-z0-9]/g, ''));
        body.account_id = accId;
        const idx = registeredAccountsStore.findIndex(
          a => a.account_id === accId || (a.email && body.email && a.email.toLowerCase() === body.email.toLowerCase())
        );
        if (idx !== -1) {
          registeredAccountsStore[idx] = Object.assign({}, registeredAccountsStore[idx], body);
        } else {
          registeredAccountsStore.push(body);
        }
      }

      return res.status(200).json({
        success: true,
        count: registeredAccountsStore.length,
        accounts: registeredAccountsStore
      });
    } catch (err) {
      return res.status(400).json({ error: err.message });
    }
  }

  // GET Request: Return all registered accounts
  return res.status(200).json({
    success: true,
    count: registeredAccountsStore.length,
    accounts: registeredAccountsStore
  });
};
