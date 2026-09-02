/* ==========================================================================
   MASTER ARCHITECT ENGINE: MMS-Pro JavaScript Application (Bilingual A2Z)
   Developed by Muhammad Irfan
   ========================================================================== */

const STORAGE_KEYS = {
  STUDENTS: 'mms_students_db',
  ATTENDANCE: 'mms_attendance_db',
  ACADEMIC: 'mms_academic_db',
  FEES: 'mms_fees_db',
  SETTINGS: 'mms_settings_db',
  LANG: 'mms_language',
  ACCOUNTS: 'mms_accounts_db',
  SESSION: 'mms_session_user'
};

// Application State
let appState = {
  language: localStorage.getItem(STORAGE_KEYS.LANG) || 'en',
  currentUser: null,
  students: [],
  attendance: [],
  academic: [],
  fees: [],
  settings: {
    madrasa_name: 'Madrasa Dar-ul-Quran',
    reg_number: 'MMS-REG-786',
    mohtamim_name: 'Qari Muhammad Irfan',
    phone: '+923001234567',
    whatsapp_template: "محترم والدین!\nالسلام علیکم، آپ کا بچہ *{student_name}* آج مدرسے سے غیر حاضر ہے۔ برائے مہربانی غیر حاضری کی وجہ سے مطلع فرمائیں۔شکریہ!"
  }
};

// ==========================================================================
// BILINGUAL TRANSLATION DICTIONARY (A2Z English & Urdu)
// ==========================================================================

const i18nDict = {
  en: {
    nav_dashboard: "Dashboard Overview",
    nav_students: "Students Directory",
    nav_attendance: "Daily Attendance",
    nav_academic: "Sabaq Tracker",
    nav_fees: "Fees Ledger",
    nav_reports: "Report Cards",
    nav_settings: "Settings & Backup",
    nav_home: "Home",
    nav_students_short: "Students",
    nav_attendance_short: "Attendance",
    nav_sabaq_short: "Sabaq",
    nav_fees_short: "Fees",
    designed_by: "Designed by",
    btn_new_student: "New Student",
    stat_total_students: "TOTAL STUDENTS",
    stat_hifz_students: "HIFZ STUDENTS",
    stat_present_today: "PRESENT TODAY",
    stat_absent_today: "ABSENTEES TODAY",
    quick_ops: "Quick Operations",
    mark_attendance: "Mark Daily Attendance",
    log_sabaq: "Log Daily Sabaq / Sabqi",
    send_wa_alerts: "Send WhatsApp Absent Alerts",
    sec_enrollments: "Section Enrollments",
    sec_qaida: "Noorani Qaida",
    sec_nazra: "Nazra Quran & Tajweed",
    sec_hifz: "Hifz-ul-Quran",
    students_title: "Student Bio-Data Directory",
    add_student: "Add Student",
    search_placeholder: "Search by name, roll #, father name...",
    all_sections: "All Sections",
    roll_num: "Roll #",
    full_name: "Full Name",
    father_name: "Father Name",
    section: "Section",
    guardian_phone: "Guardian Phone",
    adm_date: "Admission Date",
    status: "Status",
    actions: "Actions",
    att_engine: "Daily Attendance Engine",
    dispatch_alerts: "Dispatch Absent Alerts",
    wa_action: "WhatsApp Action",
    log_progress: "Log Progress",
    sabaq_lesson: "Sabaq / Lesson",
    sabqi: "Sabqi (Recent Parahs)",
    manzil: "Manzil (Old Revision)",
    grade: "Grade / Tajweed",
    fee_ledger: "Monthly Fee Ledger",
    auto_vouchers: "Auto Generate Vouchers",
    receipt_num: "Receipt #",
    month: "Month",
    amount: "Fee Amount",
    concession: "Concession",
    paid_amount: "Paid Amount",
    collect_fee: "Collect Fee",
    receipt: "Receipt",
    report_gen: "Student Report Card Generator",
    select_student: "Select Student",
    preview_report: "Preview Report Card",
    global_settings: "Madrasa Global Settings & Profile",
    setting_madrasa_name: "Madrasa / Institute Name",
    setting_reg_number: "Registration Number",
    setting_mohtamim_name: "Mohtamim / Principal Name",
    setting_phone: "Official Phone Number",
    setting_wa_template: "Custom WhatsApp Absentee Template",
    save_settings: "Save Settings",
    db_export: "Database Export & Backup",
    db_export_desc: "Export all students, attendance records, Sabaq logs, and fees into a JSON backup file or restore from previous backup.",
    export_json: "Export Data Backup (JSON)",
    restore_json: "Restore Data (JSON)",
    sec_hifz_badge: "Hifz Quran",
    sec_nazra_badge: "Nazra Quran",
    sec_qaida_badge: "Noorani Qaida",
    att_present: "Present",
    att_absent: "Absent",
    att_leave: "Leave",
    att_late: "Late",
    fee_paid: "PAID",
    fee_unpaid: "UNPAID",
    fee_receipt_header: "OFFICIAL FEE PAYMENT RECEIPT",
    report_card_header: "STUDENT PERIODIC PERFORMANCE CARD & PROGRESS REPORT",
    signature_guardian: "Parent / Guardian Signature",
    signature_mohtamim: "Head / Mohtamim Signature",
    today_text: "Today: ",
    input_roll_label: "Roll Number (Auto/Custom)",
    monthly_fee_label: "Monthly Fee (PKR)",
    cnic_label: "CNIC / B-Form",
    btn_cancel: "Cancel",
    btn_save_student: "Save Student",
    log_academic_modal_title: "Log Daily Academic Progress",
    teacher_remarks: "Teacher Remarks",
    btn_save_progress: "Save Progress Record",
    custom_report_modal_title: "Customizable Student Progress Report",
    customize_fields_title: "Customize Report Components:",
    chk_biodata: "Student Bio-Data",
    chk_attendance: "Attendance Record",
    chk_sabaq: "Daily Sabaq",
    chk_sabqi: "Sabqi (Recent Parahs)",
    chk_manzil: "Manzil (Old Revision)",
    chk_remarks: "Grade & Remarks",
    chk_fees: "Fee Ledger Status",
    btn_print_pdf: "Print / Download PDF",
    btn_share_wa: "Share via WhatsApp",
    select_date_range_title: "Select Analysis Date Range:",
    preset_this_month: "This Month",
    preset_last_30: "Last 30 Days",
    preset_all_time: "All Time",
    label_from_date: "From Date",
    label_to_date: "To Date",
    setting_logo_label: "Madrasa Official Monogram / Logo",
    btn_upload_logo: "Upload Madrasa Logo",
    btn_remove_logo: "Remove Logo (Reset)",
    logo_hint: "PNG, JPG, SVG supported. Auto-fits round, square, or wide logos."
  },
  ur: {
    nav_dashboard: "ڈیش بورڈ جائزہ",
    nav_students: "طلباء ڈائریکٹری",
    nav_attendance: "روزانہ حاضری",
    nav_academic: "سبق و منزل ٹریکر",
    nav_fees: "فیس لیجر",
    nav_reports: "کارکردگی رپورٹ کارڈ",
    nav_settings: "سیٹنگز و بیک اپ",
    nav_home: "ہوم",
    nav_students_short: "طلباء",
    nav_attendance_short: "حاضری",
    nav_sabaq_short: "سبق",
    nav_fees_short: "فیس",
    designed_by: "ڈیزائن کردہ",
    btn_new_student: "نیا طالب علم",
    stat_total_students: "کل طلباء",
    stat_hifz_students: "حفظ قرآن طلباء",
    stat_present_today: "آج حاضر فیصد",
    stat_absent_today: "آج غائب طلباء",
    quick_ops: "فوری آپریشنز",
    mark_attendance: "روزانہ حاضری لگائیں",
    log_sabaq: "سبق / سبقی درج کریں",
    send_wa_alerts: "واٹس ایپ غیرحاضری الرٹ بھیجیں",
    sec_enrollments: "شعبہ جات طلباء",
    sec_qaida: "نورانی قاعدہ",
    sec_nazra: "ناظرہ قرآن و تجوید",
    sec_hifz: "حفظ القرآن الکریم",
    students_title: "طلباء بائیو ڈیٹا ڈائریکٹری",
    add_student: "طالب علم شامل کریں",
    search_placeholder: "نام، رول نمبر یا والد کے نام سے تلاش کریں...",
    all_sections: "تمام شعبہ جات",
    roll_num: "رول نمبر",
    full_name: "نام طالب علم",
    father_name: "والد کا نام",
    section: "شعبہ",
    guardian_phone: "سرپرست فون",
    adm_date: "تاریخ داخلہ",
    status: "حالت",
    actions: "کارروائی",
    att_engine: "روزانہ حاضری انجن",
    dispatch_alerts: "غیرحاضری الرٹس بھیجیں",
    wa_action: "واٹس ایپ ایکشن",
    log_progress: "سبق درج کریں",
    sabaq_lesson: "سبق (موجودہ سبق)",
    sabqi: "سبقی (حالیہ پارہ)",
    manzil: "منزل (سابقہ دور)",
    grade: "تجوید / گریڈ",
    fee_ledger: "ماہانہ فیس لیجر",
    auto_vouchers: "خودکار واؤچر بنائیں",
    receipt_num: "رسید نمبر",
    month: "مہینہ",
    amount: "فیس رقم",
    concession: "رعایت",
    paid_amount: "ادا شدہ رقم",
    collect_fee: "فیس وصول کریں",
    receipt: "رسید",
    report_gen: "طالب علم رپورٹ کارڈ",
    select_student: "طالب علم منتخب کریں",
    preview_report: "رپورٹ کارڈ دیکھیں",
    global_settings: "مدرسہ عالمی سیٹنگز و پروفائل",
    setting_madrasa_name: "مدرسہ / ادارے کا نام",
    setting_reg_number: "رجسٹریشن نمبر",
    setting_mohtamim_name: "مہتمم / پرنسپل کا نام",
    setting_phone: "رابطہ فون نمبر",
    setting_wa_template: "واٹس ایپ غیرحاضری میسج ٹیمپلیٹ",
    save_settings: "سیٹنگز محفوظ کریں",
    db_export: "ڈیٹا بیس ایکسپورٹ و بیک اپ",
    db_export_desc: "تمام طلباء، حاضری، سبق اور فیس ریکارڈ کا JSON بیک اپ ڈاؤن لوڈ کریں یا پرانا بیک اپ بحال کریں۔",
    export_json: "ڈیٹا بیک اپ ایکسپورٹ (JSON)",
    restore_json: "ڈیٹا بحال کریں (JSON)",
    sec_hifz_badge: "حفظ القرآن الکریم",
    sec_nazra_badge: "ناظرہ قرآن و تجوید",
    sec_qaida_badge: "نورانی قاعدہ",
    att_present: "حاضر",
    att_absent: "غائب",
    att_leave: "رخصت",
    att_late: "تاخیر",
    fee_paid: "ادا شدہ",
    fee_unpaid: "غیر ادا شدہ",
    fee_receipt_header: "سرکاری فیس ادا شدہ رسید",
    report_card_header: "طالب علم کی ماہانہ کارکردگی و ترقیاتی رپورٹ",
    signature_guardian: "دستخط سرپرست / والد",
    signature_mohtamim: "دستخط مهتمم / ناظم اعلٰی",
    today_text: "آج: ",
    input_roll_label: "رول نمبر (خودکار/کسٹم)",
    monthly_fee_label: "ماہانہ فیس (روپے)",
    cnic_label: "شناختی کارڈ / بی فارم",
    btn_cancel: "منسوخ",
    btn_save_student: "طالب علم محفوظ کریں",
    log_academic_modal_title: "روزانہ تعلیمی سبق درج کریں",
    teacher_remarks: "استاد کے تاثرات",
    btn_save_progress: "سبق کا ریکارڈ محفوظ کریں",
    custom_report_modal_title: "طالب علم کی حسبِ منشا کارکردگی رپورٹ",
    customize_fields_title: "رپورٹ میں شامل کرنے کے لیے شقیں منتخب کریں:",
    chk_biodata: "طالب علم بائیو ڈیٹا",
    chk_attendance: "حاضری ریکارڈ",
    chk_sabaq: "موجودہ سبق",
    chk_sabqi: "سبقی (حالیہ پارہ)",
    chk_manzil: "منزل (سابقہ دور)",
    chk_remarks: "تجوید و تاثرات",
    chk_fees: "فیس صورتحال",
    btn_print_pdf: "پرنٹ / پی ڈی ایف ڈاؤن لوڈ",
    btn_share_wa: "واٹس ایپ پر شیئر کریں",
    select_date_range_title: "رپورٹ کے لیے تاریخوں کا انتخاب:",
    preset_this_month: "اس ماہ",
    preset_last_30: "گزشتہ 30 ایام",
    preset_all_time: "تمام ریکارڈ",
    label_from_date: "تاریخ سے",
    label_to_date: "تاریخ تک",
    setting_logo_label: "مدرسہ کا سرکاری مونوگرام / لوگو",
    btn_upload_logo: "لوگو اپلوڈ کریں",
    btn_remove_logo: "لوگو ختم کریں (ریسیٹ)",
    logo_hint: "پی این جی، جے پی جی، ایس وی جی سپورٹڈ۔ گول، چکور یا چوڑے لوگو کے مطابق خودکار ایڈجسٹ ہوتا ہے۔",
    signature_mohtamim: "دستخط مهتمم / ناظم اعلٰی",
    today_text: "آج: ",
    input_roll_label: "رول نمبر (خودکار/کسٹم)",
    monthly_fee_label: "ماہانہ فیس (روپے)",
    cnic_label: "شناختی کارڈ / بی فارم",
    btn_cancel: "منسوخ",
    btn_save_student: "طالب علم محفوظ کریں",
    log_academic_modal_title: "روزانہ تعلیمی سبق درج کریں",
    teacher_remarks: "استاد کے تاثرات",
    btn_save_progress: "سبق کا ریکارڈ محفوظ کریں",
    custom_report_modal_title: "طالب علم کی حسبِ منشا کارکردگی رپورٹ",
    customize_fields_title: "رپورٹ میں شامل کرنے کے لیے شقیں منتخب کریں:",
    signature_guardian: "دستخط سرپرست / والد"
  }
};

const studentNameTranslations = {
  "Muhammad Hamza": "محمد حمزہ",
  "Ahmad Hassan": "احمد حسن",
  "Abdullah Khan": "عبداللہ خان",
  "Tariq Mahmood": "طارق محمود",
  "Bilal Ahmad": "بلال احمد",
  "Zubair Ahmad": "زبیر احمد",
  "Usama Umar": "اسامہ عمر",
  "Umar Farooq": "عمر فاروق",
  "Zain Malik": "زین ملک",
  "Shahid Malik": "شاہد ملک",
  "Abdul Shakoor": "عبد الشکور"
};

const commonUrduTranslations = {
  "Muhammad Irfan": "محمد عرفان",
  "Qari Muhammad Irfan": "قاری محمد عرفان",
  "Para 12, Surah Hud Ruku 3": "پارہ 12، سورۃ ہود رکوع 3",
  "Para 11": "پارہ 11",
  "Para 1 - 10": "پارہ 1 سے 10",
  "Para 6, Surah An-Nisa Ruku 4": "پارہ 6، سورۃ النساء رکوع 4",
  "Para 5": "پارہ 5",
  "Para 1 - 4": "پارہ 1 سے 4",
  "Surah Al-Baqarah Ayah 120-140": "سورۃ البقرۃ آیت 120 تا 140",
  "Lesson 14: Huroof Maddah": "سبق 14: حروفِ مدّہ",
  "Excellent recitation and proper makharij.": "بہترین تلاوت اور درست مخارج۔",
  "Needs revision in ghunnah rules.": "غنّہ کے قواعد میں مزید دہرائی کی ضرورت ہے۔",
  "Very smooth fluency.": "بہت عمدہ اور روانی کے ساتھ۔",
  "Practice lengthening sounds.": "حروف کو دراز کرنے کی مشق کریں۔",
  "Satisfactory academic progress.": "تسلی بخش تعلیمی کارکردگی۔"
};

function autoTranslateToUrdu(str) {
  if (!str || typeof str !== 'string') return str || '';
  if (appState.language !== 'ur') return str;

  const trimmed = str.trim();
  if (commonUrduTranslations[trimmed]) {
    return commonUrduTranslations[trimmed];
  }

  if (studentNameTranslations[trimmed]) {
    return studentNameTranslations[trimmed];
  }

  let res = str;
  res = res.replace(/NOORANI \/ MADANI QAIDA/gi, 'نورانی قاعدہ')
           .replace(/NOORANI QAIDA/gi, 'نورانی قاعدہ')
           .replace(/Noorani \/ Madani Qaida/gi, 'نورانی قاعدہ')
           .replace(/Noorani Qaida/gi, 'نورانی قاعدہ')
           .replace(/Madani Qaida/gi, 'مدنی قاعدہ')
           .replace(/Nazra Quran & Tajweed/gi, 'ناظرہ قرآن و تجوید')
           .replace(/Nazra Quran/gi, 'ناظرہ قرآن')
           .replace(/NAZRA/gi, 'ناظرہ قرآن')
           .replace(/Hifz-ul-Quran/gi, 'حفظ القرآن الکریم')
           .replace(/Hifz Quran/gi, 'حفظ قرآن')
           .replace(/HIFZ/gi, 'حفظ قرآن')
           .replace(/QAIDA/gi, 'نورانی قاعدہ')
           .replace(/\bPara\b/gi, 'پارہ')
           .replace(/\bSurah\b/gi, 'سورۃ')
           .replace(/\bRuku\b/gi, 'رکوع')
           .replace(/\bLesson\b/gi, 'سبق')
           .replace(/\bAyah\b/gi, 'آیت')
           .replace(/\bto\b/gi, 'سے')
           .replace(/Hud/gi, 'ہود')
           .replace(/An-Nisa/gi, 'النساء')
           .replace(/Al-Baqarah/gi, 'البقرۃ')
           .replace(/Al-Fatiha/gi, 'الفاتحہ');

  return res;
}

function t(key) {
  const lang = appState.language || 'en';
  return i18nDict[lang][key] || key;
}

function translateName(name) {
  if (appState.language === 'ur') {
    return autoTranslateToUrdu(name);
  }
  return name;
}

function setLanguage(lang) {
  appState.language = lang;
  localStorage.setItem(STORAGE_KEYS.LANG, lang);

  // Set RTL / LTR on Document
  if (lang === 'ur') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ur');
    document.getElementById('lang-btn-ur')?.classList.add('active');
    document.getElementById('lang-btn-en')?.classList.remove('active');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
    document.documentElement.setAttribute('lang', 'en');
    document.getElementById('lang-btn-en')?.classList.add('active');
    document.getElementById('lang-btn-ur')?.classList.remove('active');
  }

  // Translate Designer Footer
  const desEl = document.getElementById('designer-name');
  if (desEl) {
    desEl.innerText = lang === 'ur' ? 'محمد عرفان' : 'Muhammad Irfan';
  }

  // Translate All Static Elements with data-i18n
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (i18nDict[lang] && i18nDict[lang][key]) {
      el.innerText = i18nDict[lang][key];
    }
  });

  // Search Input Placeholder
  const searchInput = document.getElementById('student-search-input');
  if (searchInput) {
    searchInput.placeholder = t('search_placeholder');
  }

  setupDates();
  renderCurrentView();
}

// ==========================================================================
// 1. INITIALIZATION & SAMPLE DATA GENERATOR
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  initStorage();
  setupNavigation();
  setLanguage(appState.language);
  setTimeout(initFirebaseEngine, 500);
});

function initStorage() {
  const savedSession = localStorage.getItem(STORAGE_KEYS.SESSION);
  const authOverlay = document.getElementById('auth-overlay');
  const appContainer = document.getElementById('app-container');

  if (savedSession) {
    appState.currentUser = JSON.parse(savedSession);
    loadUserAccountData(appState.currentUser.account_id);

    if (authOverlay) {
      authOverlay.classList.remove('active');
      authOverlay.style.display = 'none';
    }
    if (appContainer) appContainer.style.display = '';
  } else {
    // Show dedicated Auth Screen on start if not signed in
    if (authOverlay) {
      authOverlay.classList.add('active');
      authOverlay.style.display = 'flex';
    }
    if (appContainer) appContainer.style.display = 'none';
  }

  updateMadrasaBranding();
  updateUserProfileBadge();
}

function loadUserAccountData(accountId) {
  const suffix = accountId ? `_${accountId}` : '';
  const loadedStudents = localStorage.getItem(STORAGE_KEYS.STUDENTS + suffix);
  if (!loadedStudents || JSON.parse(loadedStudents).length === 0) {
    loadSampleData();
  } else {
    appState.students = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDENTS + suffix) || '[]');
    appState.attendance = JSON.parse(localStorage.getItem(STORAGE_KEYS.ATTENDANCE + suffix) || '[]');
    appState.academic = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACADEMIC + suffix) || '[]');
    appState.fees = JSON.parse(localStorage.getItem(STORAGE_KEYS.FEES + suffix) || '[]');
    const savedSettings = localStorage.getItem(STORAGE_KEYS.SETTINGS + suffix);
    if (savedSettings) {
      appState.settings = JSON.parse(savedSettings);
      if (!appState.settings.whatsapp_template || appState.settings.whatsapp_template.includes("Assalamu Alaikum")) {
        appState.settings.whatsapp_template = "محترم والدین!\nالسلام علیکم، آپ کا بچہ *{student_name}* آج مدرسے سے غیر حاضر ہے۔ برائے مہربانی غیر حاضری کی وجہ سے مطلع فرمائیں۔شکریہ!";
      }
    }
  }
}

function saveAllState() {
  const suffix = appState.currentUser ? `_${appState.currentUser.account_id}` : '';
  localStorage.setItem(STORAGE_KEYS.STUDENTS + suffix, JSON.stringify(appState.students));
  localStorage.setItem(STORAGE_KEYS.ATTENDANCE + suffix, JSON.stringify(appState.attendance));
  localStorage.setItem(STORAGE_KEYS.ACADEMIC + suffix, JSON.stringify(appState.academic));
  localStorage.setItem(STORAGE_KEYS.FEES + suffix, JSON.stringify(appState.fees));
  localStorage.setItem(STORAGE_KEYS.SETTINGS + suffix, JSON.stringify(appState.settings));

  if (appState.currentUser) {
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(appState.currentUser));
    let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
    const idx = accounts.findIndex(a => a.account_id === appState.currentUser.account_id);
    if (idx !== -1) {
      accounts[idx] = appState.currentUser;
    } else {
      accounts.push(appState.currentUser);
    }
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }

  // Trigger Firebase Realtime Cloud Sync
  syncToFirebaseRealtime();
}

function switchAuthTab(tab) {
  const signupForm = document.getElementById('signup-form');
  const signinForm = document.getElementById('signin-form');
  const tabSignup = document.getElementById('tab-btn-signup');
  const tabSignin = document.getElementById('tab-btn-signin');

  if (tab === 'signup') {
    signupForm.style.display = 'flex';
    signinForm.style.display = 'none';
    tabSignup.classList.add('active');
    tabSignin.classList.remove('active');
  } else {
    signupForm.style.display = 'none';
    signinForm.style.display = 'flex';
    tabSignup.classList.remove('active');
    tabSignin.classList.add('active');
  }
}

function handleSignUp(e) {
  if (e && e.preventDefault) e.preventDefault();
  
  const emailEl = document.getElementById('signup-email');
  const phoneEl = document.getElementById('signup-phone');
  const usernameEl = document.getElementById('signup-username');
  const pinEl = document.getElementById('signup-pin');

  const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const username = usernameEl ? usernameEl.value.trim() : '';
  const pin = pinEl ? pinEl.value.trim() : '';

  console.log('handleSignUp triggered:', { email, phone, username, pinLength: pin.length });

  if (!email || !phone || !username || !pin) {
    alert(appState.language === 'ur' 
      ? 'تمام خانے (ای میل، موبائل نمبر، یوزر نیم اور پاسورڈ) پر کرنا لازمی ہیں۔' 
      : 'Email, Mobile Number, User Name and Password are all required!');
    return;
  }

  const cleanPhone = formatWhatsAppPhone(phone);
  const accountId = 'acc_' + email.replace(/[^a-z0-9]/g, '') + '_' + cleanPhone;

  const newUser = {
    account_id: accountId,
    username: username,
    email: email,
    phone: phone,
    clean_phone: cleanPhone,
    pin: pin,
    created_at: getTodayDateStr()
  };

  // Save to accounts list without duplicates
  let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
  const existingIndex = accounts.findIndex(a => a.account_id === accountId || a.email === email);
  if (existingIndex !== -1) {
    accounts[existingIndex] = newUser;
  } else {
    accounts.push(newUser);
  }
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));

  appState.currentUser = newUser;
  appState.settings.phone = phone;

  loadUserAccountData(accountId);
  saveAllState();

  const overlay = document.getElementById('auth-overlay');
  if (overlay) overlay.classList.remove('active');

  const appContainer = document.getElementById('app-container');
  if (appContainer) appContainer.style.display = '';

  updateMadrasaBranding();
  updateUserProfileBadge();
  renderDashboard();

  alert(appState.language === 'ur' 
    ? `خوش آمدید ${username}! آپ کا اکاؤنٹ کاملاً فعال اور لائف ٹائم والٹ میں محفوظ ہو گیا ہے۔` 
    : `Account created successfully! Welcome ${username}! Your lifetime data vault is now active.`);
}

function handleSignIn(e) {
  if (e && e.preventDefault) e.preventDefault();

  const credEl = document.getElementById('signin-credential');
  const pinEl = document.getElementById('signin-pin');

  const credential = credEl ? credEl.value.trim().toLowerCase() : '';
  const pin = pinEl ? pinEl.value.trim() : '';

  console.log('handleSignIn triggered:', { credential, pinLength: pin.length });

  if (!credential || !pin) {
    alert(appState.language === 'ur'
      ? 'براہ کرم ای میل/موبائل اور پاسورڈ درج کریں۔'
      : 'Please enter your Email/Mobile/Username and Password.');
    return;
  }

  const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
  const cleanCredPhone = formatWhatsAppPhone(credential);

  const matched = accounts.find(a => 
    (a.email.toLowerCase() === credential || 
     (a.username && a.username.toLowerCase() === credential) || 
     a.phone === credential || 
     a.clean_phone === cleanCredPhone) &&
    a.pin === pin
  );

  if (matched) {
    appState.currentUser = matched;
    loadUserAccountData(matched.account_id);
    saveAllState();

    const overlay = document.getElementById('auth-overlay');
    if (overlay) overlay.classList.remove('active');

    const appContainer = document.getElementById('app-container');
    if (appContainer) appContainer.style.display = '';

    updateMadrasaBranding();
    updateUserProfileBadge();
    renderDashboard();

    alert(appState.language === 'ur' 
      ? `خوش آمدید ${matched.username || ''}! آپ کا اکاؤنٹ اور لائف ٹائم ڈیٹا بحال ہو گیا ہے۔` 
      : `Welcome back ${matched.username || ''}! Your account data is restored.`);
  } else {
    alert(appState.language === 'ur' 
      ? 'ای میل/یوزر نیم/موبائل یا پاسورڈ درست نہیں ہے۔ نیچے فارم پر جا کر نیا اکاؤنٹ بنائیں۔' 
      : 'Invalid Credentials. Please check your username/email/mobile and password, or Sign Up below.');
  }
}

function handleLogout() {
  if (confirm(appState.language === 'ur' ? 'کیا آپ اکاؤنٹ سے سائن آؤٹ کرنا چاہتے ہیں؟' : 'Are you sure you want to sign out?')) {
    localStorage.removeItem(STORAGE_KEYS.SESSION);
    appState.currentUser = null;
    updateUserProfileBadge();
    document.getElementById('app-container').style.display = 'none';
    document.getElementById('auth-overlay')?.classList.add('active');
  }
}

function updateUserProfileBadge() {
  const pill = document.getElementById('user-profile-pill');
  const emailEl = document.getElementById('header-user-email');
  const phoneEl = document.getElementById('header-user-phone');

  if (appState.currentUser) {
    if (emailEl) emailEl.innerText = appState.currentUser.email || appState.currentUser.madrasa_name;
    if (phoneEl) phoneEl.innerText = appState.currentUser.phone;
    if (pill) pill.style.display = 'flex';
  } else {
    if (pill) pill.style.display = 'none';
  }
}

function openAccountModal() {
  renderAccountList();
  openModalWithHash('account-switch-modal', 'account');
}

function renderAccountList() {
  const container = document.getElementById('account-list-container');
  if (!container) return;

  const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');

  if (accounts.length === 0) {
    container.innerHTML = `<p style="text-align:center; color:var(--text-muted); padding:1rem;">${appState.language === 'ur' ? 'کوئی دوسرا اکاؤنٹ موجود نہیں ہے۔' : 'No other registered accounts found.'}</p>`;
    return;
  }

  container.innerHTML = accounts.map(acc => {
    const isCurrent = appState.currentUser && appState.currentUser.account_id === acc.account_id;
    return `
      <div style="display:flex; justify-content:space-between; align-items:center; background:${isCurrent ? 'rgba(5, 150, 105, 0.15)' : 'rgba(30, 41, 59, 0.6)'}; border:1px solid ${isCurrent ? 'var(--emerald-500)' : 'var(--border-glass)'}; padding:10px 14px; border-radius:10px;">
        <div style="display:flex; flex-direction:column;">
          <strong style="color:${isCurrent ? 'var(--emerald-400)' : '#fff'}; font-size:0.9rem;">${acc.madrasa_name || 'Madrasa'}</strong>
          <small style="color:var(--text-muted); font-size:0.75rem;">📧 ${acc.email} | 📞 ${acc.phone}</small>
        </div>
        ${isCurrent ? `
          <span class="badge badge-present">${appState.language === 'ur' ? 'ایکٹو' : 'Active'}</span>
        ` : `
          <button class="btn btn-primary btn-sm" onclick="switchToAccount('${acc.account_id}')">${appState.language === 'ur' ? 'سوئچ کریں' : 'Switch'}</button>
        `}
      </div>
    `;
  }).join('');
}

function switchToAccount(accountId) {
  const accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
  const targetAcc = accounts.find(a => a.account_id === accountId);
  if (!targetAcc) return;

  const pinInput = prompt(appState.language === 'ur' ? `براہ کرم (${targetAcc.email}) کا پن کوڈ درج کریں:` : `Enter Security PIN for ${targetAcc.email}:`);
  if (pinInput === targetAcc.pin) {
    appState.currentUser = targetAcc;
    loadUserAccountData(targetAcc.account_id);
    saveAllState();

    closeModal('account-switch-modal');
    updateMadrasaBranding();
    updateUserProfileBadge();
    renderDashboard();

    alert(appState.language === 'ur' ? `اکاؤنٹ (${targetAcc.madrasa_name}) میں لائیو سوئچ ہو گئے ہیں!` : `Switched to account: ${targetAcc.madrasa_name}`);
  } else if (pinInput !== null) {
    alert(appState.language === 'ur' ? 'پن کوڈ درست نہیں ہے۔' : 'Incorrect Security PIN!');
  }
}

function getTodayDateStr() {
  const d = new Date();
  return d.toISOString().split('T')[0];
}

function setupDates() {
  const today = getTodayDateStr();
  const dateEl = document.getElementById('current-date-text');
  if (dateEl) {
    const locale = appState.language === 'ur' ? 'ur-PK' : 'en-US';
    const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    dateEl.innerText = t('today_text') + new Date().toLocaleDateString(locale, options);
  }

  const attDate = document.getElementById('attendance-date-picker');
  if (attDate && !attDate.value) attDate.value = today;

  const acadDate = document.getElementById('academic-date-picker');
  if (acadDate && !acadDate.value) acadDate.value = today;

  const admDate = document.getElementById('input-admission-date');
  if (admDate && !admDate.value) admDate.value = today;
}

function updateMadrasaBranding() {
  const sidebarName = document.getElementById('sidebar-madrasa-name');
  if (sidebarName && appState.settings.madrasa_name) {
    sidebarName.innerText = appState.settings.madrasa_name;
  }

  // Update Sidebar Logo
  const brandLogo = document.querySelector('.brand-logo');
  if (brandLogo) {
    if (appState.settings.logo_url) {
      brandLogo.innerHTML = `<img src="${appState.settings.logo_url}" class="custom-brand-logo" alt="Madrasa Logo">`;
    } else {
      brandLogo.innerHTML = `<i class="fa-solid fa-kaaba"></i>`;
    }
  }

  // Update Settings View Logo Preview
  const previewBox = document.getElementById('setting-logo-preview-box');
  if (previewBox) {
    if (appState.settings.logo_url) {
      previewBox.innerHTML = `<img src="${appState.settings.logo_url}" alt="Madrasa Logo">`;
    } else {
      previewBox.innerHTML = `<i class="fa-solid fa-kaaba" style="font-size:2rem; color:var(--emerald-400);"></i>`;
    }
  }
}

function handleLogoUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert(appState.language === 'ur' ? 'براہ کرم تصویری فائل منتخب کریں۔' : 'Please select a valid image file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    appState.settings.logo_url = e.target.result;
    saveAllState();
    updateMadrasaBranding();
    alert(appState.language === 'ur' ? 'مدرسہ کا لوگو اپلوڈ اور لائیو اپڈیٹ ہو گیا ہے۔' : 'Madrasa Logo uploaded and patched in real-time!');
  };
  reader.readAsDataURL(file);
}

function removeCustomLogo() {
  if (appState.settings.logo_url) {
    appState.settings.logo_url = null;
    saveAllState();
    updateMadrasaBranding();
    alert(appState.language === 'ur' ? 'لوگو ختم کر دیا گیا ہے۔' : 'Logo removed and reset to default.');
  }
}

// ==========================================================================
// 2. ROUTING & NAVIGATION HANDLER (NATIVE APK BACK BUTTON & SUB-TAB ENGINE)
// ==========================================================================

function openModalWithHash(modalId, subHash) {
  const modal = document.getElementById(modalId);
  if (!modal) return;
  modal.classList.add('active');

  const baseView = (window.location.hash || '#dashboard').split('/')[0];
  const targetHash = subHash ? (subHash.startsWith('#') ? subHash : baseView + '/' + subHash) : baseView + '/' + modalId;

  if (window.location.hash !== targetHash) {
    history.pushState({ modalId: modalId }, '', targetHash);
  }
}

function closeModal(modalId, isPopState = false) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');

  if (!isPopState && window.location.hash.includes('/')) {
    const currentBase = window.location.hash.split('/')[0] || '#dashboard';
    history.replaceState(null, null, currentBase);
  }
}

function setupNavigation() {
  const links = document.querySelectorAll('.nav-link, .mobile-nav-item');
  links.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetView = link.getAttribute('data-view');
      if (targetView) switchView(targetView);
    });
  });

  // Support Hardware Back Button & Native Mobile Popstate Routing
  window.addEventListener('popstate', () => {
    const activeModals = document.querySelectorAll('.modal-backdrop.active');
    const rawHash = window.location.hash.replace('#', '');
    
    if (activeModals.length > 0 && !rawHash.includes('/')) {
      activeModals.forEach(m => m.classList.remove('active'));
    }

    const baseView = rawHash.split('/')[0] || 'dashboard';
    switchView(baseView, false);
  });

  window.addEventListener('hashchange', () => {
    const rawHash = window.location.hash.replace('#', '');
    const baseView = rawHash.split('/')[0] || 'dashboard';
    if (baseView) switchView(baseView, false);
  });

  const initialHash = window.location.hash.replace('#', '');
  if (initialHash) {
    const baseView = initialHash.split('/')[0] || 'dashboard';
    switchView(baseView);
  }
}

function switchView(viewName, pushHash = true) {
  if (!viewName) viewName = 'dashboard';
  viewName = viewName.split('/')[0];

  // Close active modals on tab view switch
  document.querySelectorAll('.modal-backdrop.active').forEach(m => m.classList.remove('active'));

  if (pushHash && window.location.hash !== '#' + viewName && !window.location.hash.startsWith('#' + viewName + '/')) {
    history.replaceState(null, null, '#' + viewName);
  }

  // Update nav links active state
  document.querySelectorAll('.nav-link, .mobile-nav-item').forEach(l => {
    if (l.getAttribute('data-view') === viewName) {
      l.classList.add('active');
    } else {
      l.classList.remove('active');
    }
  });

  // Toggle view sections
  document.querySelectorAll('.view-section').forEach(sec => {
    sec.style.display = 'none';
  });

  const targetSec = document.getElementById(viewName + '-view');
  if (targetSec) {
    targetSec.style.display = 'block';
  }

  const titleMap = {
    dashboard: `<i class="fa-solid fa-chart-pie"></i> ${t('nav_dashboard')}`,
    students: `<i class="fa-solid fa-user-graduate"></i> ${t('students_title')}`,
    attendance: `<i class="fa-solid fa-clipboard-user"></i> ${t('att_engine')}`,
    academic: `<i class="fa-solid fa-book-quran"></i> ${t('nav_academic')}`,
    fees: `<i class="fa-solid fa-file-invoice-dollar"></i> ${t('fee_ledger')}`,
    reports: `<i class="fa-solid fa-id-card"></i> ${t('report_gen')}`,
    settings: `<i class="fa-solid fa-sliders"></i> ${t('global_settings')}`
  };

  const titleEl = document.getElementById('current-view-title');
  if (titleEl && titleMap[viewName]) {
    titleEl.innerHTML = titleMap[viewName];
  }

  renderViewData(viewName);
}

function renderCurrentView() {
  const hash = window.location.hash.replace('#', '');
  if (hash) {
    switchView(hash);
  } else {
    const activeLink = document.querySelector('.nav-link.active');
    const view = activeLink ? activeLink.getAttribute('data-view') : 'dashboard';
    switchView(view);
  }
}

function renderViewData(viewName) {
  switch (viewName) {
    case 'dashboard': renderDashboard(); break;
    case 'students': renderStudentsList(); break;
    case 'attendance': loadAttendanceForDate(); break;
    case 'academic': renderAcademicLogs(); break;
    case 'fees': renderFeeLedger(); break;
    case 'reports': populateReportStudentDropdown(); break;
    case 'settings': loadSettingsForm(); break;
  }
}

// ==========================================================================
// 3. DASHBOARD MODULE
// ==========================================================================

function renderDashboard() {
  const activeStudents = appState.students.filter(s => s.status === 'active');
  const totalStudents = activeStudents.length;
  const hifzCount = activeStudents.filter(s => s.section === 'hifz').length;
  const qaidaCount = activeStudents.filter(s => s.section === 'qaida').length;
  const nazraCount = activeStudents.filter(s => s.section === 'nazra').length;

  const today = getTodayDateStr();
  const todayAtt = appState.attendance.filter(a => a.attendance_date === today);
  const presentCount = todayAtt.filter(a => a.status === 'present').length;
  const absentCount = todayAtt.filter(a => a.status === 'absent').length;

  const percPresent = totalStudents > 0 ? Math.round((presentCount / totalStudents) * 100) : 0;

  document.getElementById('stat-total-students').innerText = totalStudents;
  document.getElementById('stat-hifz-count').innerText = hifzCount;
  document.getElementById('stat-present-today').innerText = percPresent + '%';
  document.getElementById('stat-absent-today').innerText = absentCount;

  const studentWord = appState.language === 'ur' ? ' طلباء' : ' Students';
  document.getElementById('sec-qaida-count').innerText = qaidaCount + studentWord;
  document.getElementById('sec-nazra-count').innerText = nazraCount + studentWord;
  document.getElementById('sec-hifz-count').innerText = hifzCount + studentWord;
}

function filterStudentsBySection(sec) {
  const filterSelect = document.getElementById('student-filter-section');
  if (filterSelect) {
    filterSelect.value = sec;
  }
  switchView('students');
  renderStudentsList();
}

function renderStudentsList() {
  const tbody = document.getElementById('students-table-body');
  if (!tbody) return;

  const search = document.getElementById('student-search-input').value.toLowerCase();
  const filterSec = document.getElementById('student-filter-section').value;

  const filtered = appState.students.filter(s => {
    const nameStr = (s.full_name + ' ' + translateName(s.full_name)).toLowerCase();
    const fatherStr = (s.father_name + ' ' + translateName(s.father_name)).toLowerCase();
    const matchSearch = nameStr.includes(search) || s.roll_number.toLowerCase().includes(search) || fatherStr.includes(search);
    const matchSec = filterSec === 'all' || s.section === filterSec;
    return matchSearch && matchSec;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding: 2rem; color:var(--text-muted);">${appState.language === 'ur' ? 'کوئی ریکارڈ نہیں ملا۔' : 'No student records found.'}</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(s => `
    <tr>
      <td><strong style="color:var(--gold-400);">${s.roll_number}</strong></td>
      <td><strong>${translateName(s.full_name)}</strong></td>
      <td>${translateName(s.father_name)}</td>
      <td><span class="badge badge-${s.section}">${t('sec_' + s.section + '_badge')}</span></td>
      <td>${s.guardian_phone}</td>
      <td>${s.admission_date}</td>
      <td><span class="badge ${s.status === 'active' ? 'badge-present' : 'badge-absent'}">${s.status === 'active' ? (appState.language === 'ur' ? 'فعال' : 'ACTIVE') : (appState.language === 'ur' ? 'خارج' : 'STRUCK OFF')}</span></td>
      <td>
        <button class="btn btn-secondary btn-sm" onclick="editStudent(${s.id})" title="${appState.language === 'ur' ? 'تفصیلات ایڈٹ کریں' : 'Edit Details'}"><i class="fa-solid fa-pen"></i></button>
        <button class="btn btn-whatsapp btn-sm" onclick="openCustomReportModal(${s.id})" title="${appState.language === 'ur' ? 'واٹس ایپ پیشرفت رپورٹ' : 'WhatsApp Report Card'}"><i class="fa-brands fa-whatsapp"></i></button>
        ${s.status === 'active' ? `
          <button class="btn btn-danger btn-sm" onclick="toggleStudentStatus(${s.id})" title="${appState.language === 'ur' ? 'طالب علم خارج کریں' : 'Struck Off Student'}"><i class="fa-solid fa-power-off"></i></button>
        ` : `
          <button class="btn btn-success btn-sm" onclick="toggleStudentStatus(${s.id})" title="${appState.language === 'ur' ? 'دوبارہ داخل کریں (فعال کریں)' : 'Re-Admit Student'}"><i class="fa-solid fa-user-plus"></i></button>
        `}
      </td>
    </tr>
  `).join('');
}

function openAdmissionModal(studentId = null) {
  const modal = document.getElementById('student-modal');
  const title = document.getElementById('student-modal-title');
  const idInput = document.getElementById('student-id-input');

  if (studentId) {
    title.innerText = appState.language === 'ur' ? 'طالب علم تفصیلات ایڈٹ کریں' : 'Edit Student Details';
    const s = appState.students.find(x => x.id === studentId);
    if (s) {
      idInput.value = s.id;
      document.getElementById('input-roll-number').value = s.roll_number;
      document.getElementById('input-full-name').value = s.full_name;
      document.getElementById('input-father-name').value = s.father_name;
      document.getElementById('input-section').value = s.section;
      document.getElementById('input-guardian-phone').value = s.guardian_phone;
      document.getElementById('input-monthly-fee').value = s.monthly_fee;
      document.getElementById('input-admission-date').value = s.admission_date;
      document.getElementById('input-cnic').value = s.cnic_bform || '';
    }
  } else {
    title.innerText = t('btn_new_student');
    idInput.value = '';
    document.getElementById('student-form').reset();
    document.getElementById('input-roll-number').value = generateNextRollNumber();
    document.getElementById('input-admission-date').value = getTodayDateStr();
    document.getElementById('input-monthly-fee').value = 2000;
  }

  openModalWithHash('student-modal', studentId ? 'edit-student?id=' + studentId : 'new-student');
}

function generateNextRollNumber() {
  const count = appState.students.length + 1;
  return `MMS-2026-${String(count).padStart(3, '0')}`;
}

function saveStudentForm(e) {
  e.preventDefault();
  const id = document.getElementById('student-id-input').value;
  const roll = document.getElementById('input-roll-number').value;
  const name = document.getElementById('input-full-name').value;
  const father = document.getElementById('input-father-name').value;
  const sec = document.getElementById('input-section').value;
  const phone = document.getElementById('input-guardian-phone').value;
  const fee = parseFloat(document.getElementById('input-monthly-fee').value) || 0;
  const admDate = document.getElementById('input-admission-date').value;
  const cnic = document.getElementById('input-cnic').value;

  if (id) {
    const s = appState.students.find(x => x.id === parseInt(id));
    if (s) {
      s.roll_number = roll;
      s.full_name = name;
      s.father_name = father;
      s.section = sec;
      s.guardian_phone = phone;
      s.monthly_fee = fee;
      s.admission_date = admDate;
      s.cnic_bform = cnic;
    }
  } else {
    const newStudent = {
      id: Date.now(),
      roll_number: roll,
      full_name: name,
      father_name: father,
      section: sec,
      guardian_phone: phone,
      monthly_fee: fee,
      admission_date: admDate,
      cnic_bform: cnic,
      status: 'active'
    };
    appState.students.push(newStudent);
  }

  saveAllState();
  closeModal('student-modal');
  renderStudentsList();
  renderDashboard();
}

function editStudent(id) {
  openAdmissionModal(id);
}

function toggleStudentStatus(id) {
  const s = appState.students.find(x => x.id === id);
  if (s) {
    s.status = s.status === 'active' ? 'struck_off' : 'active';
    saveAllState();
    renderStudentsList();
    renderDashboard();
  }
}

// ==========================================================================
// 5. DAILY ATTENDANCE & WHATSAPP DISPATCHER
// ==========================================================================

function loadAttendanceForDate() {
  const dateVal = document.getElementById('attendance-date-picker').value || getTodayDateStr();
  const tbody = document.getElementById('attendance-table-body');
  if (!tbody) return;

  const activeStudents = appState.students.filter(s => s.status === 'active');

  if (activeStudents.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding: 2rem;">${appState.language === 'ur' ? 'کوئی طالب علم دستیاب نہیں' : 'No active students available.'}</td></tr>`;
    return;
  }

  tbody.innerHTML = activeStudents.map(s => {
    let rec = appState.attendance.find(a => a.student_id === s.id && a.attendance_date === dateVal);
    if (!rec) {
      rec = { student_id: s.id, attendance_date: dateVal, status: 'present', whatsapp_sent: 0 };
      appState.attendance.push(rec);
    }

    const currentStatus = rec.status;

    return `
      <tr>
        <td><strong style="color:var(--gold-400);">${s.roll_number}</strong></td>
        <td><strong>${translateName(s.full_name)}</strong></td>
        <td><span class="badge badge-${s.section}">${t('sec_' + s.section + '_badge')}</span></td>
        <td>${s.guardian_phone}</td>
        <td>
          <div class="attendance-options">
            <button class="att-btn ${currentStatus === 'present' ? 'active-P' : ''}" onclick="setAttendanceStatus(${s.id}, '${dateVal}', 'present')">${appState.language === 'ur' ? 'حاضر' : 'P'}</button>
            <button class="att-btn ${currentStatus === 'absent' ? 'active-A' : ''}" onclick="setAttendanceStatus(${s.id}, '${dateVal}', 'absent')">${appState.language === 'ur' ? 'غائب' : 'A'}</button>
            <button class="att-btn ${currentStatus === 'leave' ? 'active-L' : ''}" onclick="setAttendanceStatus(${s.id}, '${dateVal}', 'leave')">${appState.language === 'ur' ? 'رخصت' : 'L'}</button>
            <button class="att-btn ${currentStatus === 'late' ? 'active-T' : ''}" onclick="setAttendanceStatus(${s.id}, '${dateVal}', 'late')">${appState.language === 'ur' ? 'تاخیر' : 'T'}</button>
          </div>
        </td>
        <td>
          ${currentStatus === 'absent' ? `
            <button class="btn btn-whatsapp btn-sm" onclick="sendIndividualWhatsAppAbsent(${s.id}, '${dateVal}')">
              <i class="fa-brands fa-whatsapp"></i> ${appState.language === 'ur' ? 'اطلاع بھیجیں' : 'Alert Guardian'}
            </button>
          ` : `<span style="color:var(--text-muted); font-size:0.8rem;">N/A</span>`}
        </td>
      </tr>
    `;
  }).join('');

  saveAllState();
}

function setAttendanceStatus(studentId, dateStr, status) {
  let rec = appState.attendance.find(a => a.student_id === studentId && a.attendance_date === dateStr);
  if (rec) {
    rec.status = status;
  } else {
    appState.attendance.push({ student_id: studentId, attendance_date: dateStr, status, whatsapp_sent: 0 });
  }
  saveAllState();
  loadAttendanceForDate();
  renderDashboard();
}

function formatWhatsAppPhone(phone) {
  if (!phone || typeof phone !== 'string') return '';
  let clean = phone.replace(/[^0-9]/g, '');
  if (clean.startsWith('03') && clean.length === 11) {
    clean = '92' + clean.substring(1);
  } else if (clean.startsWith('3') && clean.length === 10) {
    clean = '92' + clean;
  } else if (clean.startsWith('0092')) {
    clean = clean.substring(2);
  }
  return clean;
}

function formatWhatsAppMessage(student, dateStr) {
  let tpl = appState.settings.whatsapp_template;
  tpl = tpl.replace(/{madrasa_name}/g, appState.settings.madrasa_name)
           .replace(/{student_name}/g, translateName(student.full_name))
           .replace(/{roll_number}/g, student.roll_number)
           .replace(/{date}/g, dateStr)
           .replace(/{mohtamim_name}/g, appState.settings.mohtamim_name);
  return tpl;
}

function openWhatsAppDirect(phone, msg) {
  const clean = formatWhatsAppPhone(phone);
  if (!clean) {
    alert(appState.language === 'ur' ? 'داخلہ ریکارڈ میں درج فون نمبر درست فارمیٹ میں نہیں ہے۔' : 'Guardian phone number in admission record is invalid.');
    return false;
  }
  const encodedMsg = encodeURIComponent(msg);
  const url = `https://wa.me/${clean}?text=${encodedMsg}`;

  // Direct universal link click bypasses strict browser popup blockers
  const a = document.createElement('a');
  a.href = url;
  a.target = '_blank';
  a.rel = 'noopener noreferrer';
  document.body.appendChild(a);
  a.click();
  setTimeout(() => {
    if (a.parentNode) document.body.removeChild(a);
  }, 100);
  return true;
}

function sendIndividualWhatsAppAbsent(studentId, dateStr) {
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  const msg = formatWhatsAppMessage(student, dateStr);
  openWhatsAppDirect(student.guardian_phone, msg);
}

function dispatchWhatsAppAbsentees() {
  const dateVal = document.getElementById('attendance-date-picker')?.value || getTodayDateStr();
  const absentees = appState.attendance.filter(a => a.attendance_date === dateVal && a.status === 'absent');

  if (absentees.length === 0) {
    alert((appState.language === 'ur' ? 'اس تاریخ کو کوئی غائب طالب علم نہیں ملا: ' : 'No absentees found for date: ') + dateVal);
    return;
  }

  if (absentees.length === 1) {
    const studentId = absentees[0].student_id;
    sendIndividualWhatsAppAbsent(studentId, dateVal);
    return;
  }

  // If multiple absentees, open interactive dispatcher modal to prevent browser popup blocking
  const modal = document.getElementById('wa-dispatch-modal');
  const container = document.getElementById('wa-dispatch-list');
  const subtitle = document.getElementById('wa-dispatch-subtitle');
  const isUr = appState.language === 'ur';

  if (subtitle) {
    subtitle.innerText = isUr 
      ? `تاریخ (${dateVal}) کے لیے کل غائب طلباء (${absentees.length})۔ ہر طالب علم کے واٹس ایپ بٹن پر کلک کریں:`
      : `Total Absentees (${absentees.length}) for date ${dateVal}. Click WhatsApp button for each student:`;
  }

  if (container) {
    container.innerHTML = absentees.map(a => {
      const s = appState.students.find(x => x.id === a.student_id);
      if (!s) return '';

      return `
        <div style="background:rgba(30,41,59,0.8); border:1px solid var(--border-glass); padding:0.85rem 1rem; border-radius:10px; display:flex; justify-content:space-between; align-items:center; gap:10px;">
          <div>
            <strong style="color:var(--text-main); font-size:0.95rem;">${translateName(s.full_name)}</strong> 
            <small style="color:var(--gold-400); font-weight:bold;">(${s.roll_number})</small>
            <div style="font-size:0.8rem; color:var(--text-muted); margin-top:2px;">
              ${isUr ? 'سرپرست' : 'Guardian'}: ${translateName(s.father_name)} | ${s.guardian_phone}
            </div>
          </div>
          <button class="btn btn-whatsapp btn-sm" onclick="sendIndividualWhatsAppAbsent(${s.id}, '${dateVal}')">
            <i class="fa-brands fa-whatsapp"></i> ${isUr ? 'میسج بھیجیں' : 'Send Alert'}
          </button>
        </div>
      `;
    }).join('');
  }

  openModalWithHash('wa-dispatch-modal', 'dispatch-alerts');
}

// ==========================================================================
// 6. ACADEMIC SABAQ TRACKER
// ==========================================================================

function renderAcademicLogs() {
  const dateVal = document.getElementById('academic-date-picker').value || getTodayDateStr();
  const tbody = document.getElementById('academic-table-body');
  if (!tbody) return;

  const logs = appState.academic.filter(a => a.record_date === dateVal);

  if (logs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2rem; color:var(--text-muted);">${appState.language === 'ur' ? 'اس تاریخ کا کوئی سبق نہیں ملا۔' : 'No academic records logged for date.'}</td></tr>`;
    return;
  }

  tbody.innerHTML = logs.map(l => {
    const student = appState.students.find(s => s.id === l.student_id);
    if (!student) return '';

    return `
      <tr>
        <td>${l.record_date}</td>
        <td><strong style="color:var(--gold-400);">${l.roll_number || student.roll_number}</strong></td>
        <td><strong>${translateName(student.full_name)}</strong></td>
        <td><span class="badge badge-${l.section}">${t('sec_' + l.section + '_badge')}</span></td>
        <td><strong style="color:var(--emerald-400);">${l.sabaq ? autoTranslateToUrdu(l.sabaq) : 'N/A'}</strong></td>
        <td>${l.sabqi ? autoTranslateToUrdu(l.sabqi) : '—'}</td>
        <td>${l.manzil ? autoTranslateToUrdu(l.manzil) : '—'}</td>
        <td><span class="badge badge-hifz">${l.tajweed_grade}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="editAcademicLog(${l.id})" title="${appState.language === 'ur' ? 'سبق ایڈٹ کریں' : 'Edit Sabaq Log'}"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-whatsapp btn-sm" onclick="openCustomReportModal(${l.student_id}, ${l.id})" title="${appState.language === 'ur' ? 'واٹس ایپ اور رپورٹ شیئر' : 'WhatsApp Share & PDF'}"><i class="fa-brands fa-whatsapp"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function openAcademicModal() {
  const modal = document.getElementById('academic-modal');
  const studentSelect = document.getElementById('acad-student-select');

  studentSelect.innerHTML = appState.students
    .filter(s => s.status === 'active')
    .map(s => `<option value="${s.id}">${s.roll_number} - ${translateName(s.full_name)} (${t('sec_' + s.section + '_badge')})</option>`)
    .join('');

  document.getElementById('acad-id-input').value = '';
  document.getElementById('acad-log-date').value = getTodayDateStr();
  document.getElementById('acad-sabaq').value = '';
  document.getElementById('acad-sabqi').value = '';
  document.getElementById('acad-manzil').value = '';
  document.getElementById('acad-remarks').value = '';

  openModalWithHash('academic-modal', 'log-sabaq');
}

function editAcademicLog(logId) {
  const log = appState.academic.find(a => a.id === logId);
  if (!log) return;

  openAcademicModal();

  document.getElementById('acad-id-input').value = log.id;
  document.getElementById('acad-student-select').value = log.student_id;
  document.getElementById('acad-log-date').value = log.record_date;
  document.getElementById('acad-grade').value = log.tajweed_grade || 'A';
  document.getElementById('acad-sabaq').value = log.sabaq || '';
  document.getElementById('acad-sabqi').value = log.sabqi || '';
  document.getElementById('acad-manzil').value = log.manzil || '';
  document.getElementById('acad-remarks').value = log.remarks || '';
}

function saveAcademicForm(e) {
  e.preventDefault();
  const logId = document.getElementById('acad-id-input').value;
  const studentId = parseInt(document.getElementById('acad-student-select').value);
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  const logDate = document.getElementById('acad-log-date').value;
  const grade = document.getElementById('acad-grade').value;
  const sabaq = document.getElementById('acad-sabaq').value;
  const sabqi = document.getElementById('acad-sabqi').value;
  const manzil = document.getElementById('acad-manzil').value;
  const remarks = document.getElementById('acad-remarks').value;

  if (logId) {
    const existing = appState.academic.find(a => a.id === parseInt(logId));
    if (existing) {
      existing.student_id = studentId;
      existing.record_date = logDate;
      existing.section = student.section;
      existing.sabaq = sabaq;
      existing.sabqi = sabqi;
      existing.manzil = manzil;
      existing.tajweed_grade = grade;
      existing.remarks = remarks;
    }
  } else {
    const record = {
      id: Date.now(),
      student_id: studentId,
      record_date: logDate,
      section: student.section,
      sabaq,
      sabqi,
      manzil,
      tajweed_grade: grade,
      remarks
    };
    appState.academic.push(record);
  }

  saveAllState();
  closeModal('academic-modal');
  renderAcademicLogs();
}

// ==========================================================================
// 7. FEES LEDGER & FINANCIAL VOUCHERS
// ==========================================================================

function renderFeeLedger() {
  const monthVal = document.getElementById('fee-month-filter').value || '2026-09';
  const tbody = document.getElementById('fees-table-body');
  if (!tbody) return;

  const ledger = appState.fees.filter(f => f.month_year === monthVal);

  if (ledger.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding: 2rem; color:var(--text-muted);">${appState.language === 'ur' ? 'کوئی فیس واؤچر نہیں ملے۔' : 'No fee vouchers generated for date.'}</td></tr>`;
    return;
  }

  tbody.innerHTML = ledger.map(f => {
    const s = appState.students.find(x => x.id === f.student_id);
    if (!s) return '';

    return `
      <tr>
        <td><strong>${f.receipt_no}</strong></td>
        <td><strong style="color:var(--gold-400);">${s.roll_number}</strong></td>
        <td>${translateName(s.full_name)}</td>
        <td>${f.month_year}</td>
        <td>Rs. ${f.amount}</td>
        <td>Rs. ${f.concession}</td>
        <td><strong style="color:var(--emerald-400);">Rs. ${f.paid_amount}</strong></td>
        <td><span class="badge ${f.status === 'paid' ? 'badge-present' : 'badge-absent'}">${f.status === 'paid' ? t('fee_paid') : t('fee_unpaid')}</span></td>
        <td>
          ${f.status === 'unpaid' ? `
            <button class="btn btn-primary btn-sm" onclick="markFeePaid(${f.id})"><i class="fa-solid fa-check"></i> ${t('collect_fee')}</button>
          ` : `
            <button class="btn btn-secondary btn-sm" onclick="printReceipt(${f.id})"><i class="fa-solid fa-print"></i> ${t('receipt')}</button>
          `}
        </td>
      </tr>
    `;
  }).join('');
}

function generateMonthlyVouchers() {
  const monthVal = document.getElementById('fee-month-filter').value || '2026-09';
  let created = 0;

  appState.students.filter(s => s.status === 'active').forEach(s => {
    let exists = appState.fees.find(f => f.student_id === s.id && f.month_year === monthVal);
    if (!exists) {
      appState.fees.push({
        id: Date.now() + Math.floor(Math.random() * 1000),
        student_id: s.id,
        month_year: monthVal,
        amount: s.monthly_fee || 2000,
        concession: 0,
        paid_amount: 0,
        status: 'unpaid',
        payment_date: null,
        receipt_no: 'REC-' + Math.floor(100 + Math.random() * 900)
      });
      created++;
    }
  });

  saveAllState();
  renderFeeLedger();
  alert((appState.language === 'ur' ? 'نئے واؤچرز بنائے گئے: ' : 'Generated new fee vouchers: ') + created);
}

function markFeePaid(feeId) {
  const f = appState.fees.find(x => x.id === feeId);
  if (f) {
    f.paid_amount = f.amount - f.concession;
    f.status = 'paid';
    f.payment_date = getTodayDateStr();
    saveAllState();
    renderFeeLedger();
  }
}

let currentFeeReceiptId = null;

function printReceipt(feeId) {
  currentFeeReceiptId = feeId;
  const f = appState.fees.find(x => x.id === feeId);
  if (!f) return;
  const s = appState.students.find(x => x.id === f.student_id);
  if (!s) return;

  const modalBody = document.getElementById('fee-receipt-modal-body');

  if (modalBody) {
    modalBody.innerHTML = `
      <div class="printable-card" style="box-shadow:none; border:2px solid var(--border-gold); padding:1.25rem;">
        <div class="bismillah-header">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div class="print-header" style="padding-bottom:0.75rem; margin-bottom:1rem;">
          ${appState.settings.logo_url ? `<img src="${appState.settings.logo_url}" class="print-header-logo" style="max-height:50px;"><br>` : ''}
          <div class="print-madrasa-title" style="font-size:1.6rem;">${appState.settings.madrasa_name}</div>
          <div class="print-subtitle" style="font-size:0.85rem;">${t('fee_receipt_header')}</div>
        </div>
        <div class="print-grid" style="margin-bottom:1rem; grid-template-columns:1fr; gap:0.5rem;">
          <div class="print-field"><label>${t('receipt_num')}:</label> <span>${f.receipt_no}</span></div>
          <div class="print-field"><label>${t('adm_date')}:</label> <span>${f.payment_date || getTodayDateStr()}</span></div>
          <div class="print-field"><label>${t('roll_num')}:</label> <strong style="color:var(--gold-400);">${s.roll_number}</strong></div>
          <div class="print-field"><label>${t('full_name')}:</label> <strong>${translateName(s.full_name)}</strong></div>
          <div class="print-field"><label>${t('father_name')}:</label> <span>${translateName(s.father_name)}</span></div>
          <div class="print-field"><label>${t('month')}:</label> <span>${f.month_year}</span></div>
          <div class="print-field"><label>${t('paid_amount')}:</label> <strong style="color:var(--emerald-400); font-size:1.1rem;">Rs. ${f.paid_amount}</strong></div>
        </div>
        <div style="text-align:center; font-size:0.8rem; color:var(--text-muted); margin-top:1rem;">
          <p>${appState.settings.mohtamim_name} - ${appState.settings.madrasa_name}</p>
        </div>
      </div>
    `;
  }

  openModalWithHash('fee-receipt-modal', 'receipt?id=' + feeId);
}

function printReceiptFromModal() {
  if (!currentFeeReceiptId) return;
  const f = appState.fees.find(x => x.id === currentFeeReceiptId);
  if (!f) return;
  const s = appState.students.find(x => x.id === f.student_id);
  if (!s) return;

  const win = window.open('', '_blank');
  const isUr = appState.language === 'ur';

  win.document.write(`
    <html dir="${isUr ? 'rtl' : 'ltr'}">
    <head>
      <title>Fee Receipt - ${f.receipt_no}</title>
      <style>
        body { font-family: ${isUr ? "'Amiri', serif" : "sans-serif"}; padding: 2rem; color: #0f172a; text-align: ${isUr ? 'right' : 'left'}; }
        .receipt-card { border: 2px solid #047857; padding: 1.5rem; border-radius: 8px; max-width: 500px; margin:0 auto; }
        .header { text-align: center; border-bottom: 2px solid #047857; padding-bottom: 1rem; }
        .row { display: flex; justify-content: space-between; margin: 0.8rem 0; border-bottom: 1px dashed #cbd5e1; padding-bottom: 4px; }
      </style>
    </head>
    <body>
      <div class="receipt-card">
        <div class="header">
          ${appState.settings.logo_url ? `<img src="${appState.settings.logo_url}" style="max-height:55px; max-width:140px; object-fit:contain; margin-bottom:6px;"><br>` : ''}
          <h2>${appState.settings.madrasa_name}</h2>
          <p>${t('fee_receipt_header')}</p>
        </div>
        <div class="row"><span>${t('receipt_num')}:</span> <strong>${f.receipt_no}</strong></div>
        <div class="row"><span>${t('adm_date')}:</span> <span>${f.payment_date || getTodayDateStr()}</span></div>
        <div class="row"><span>${t('roll_num')}:</span> <strong>${s.roll_number}</strong></div>
        <div class="row"><span>${t('full_name')}:</span> <strong>${translateName(s.full_name)}</strong></div>
        <div class="row"><span>${t('father_name')}:</span> <span>${translateName(s.father_name)}</span></div>
        <div class="row"><span>${t('month')}:</span> <span>${f.month_year}</span></div>
        <div class="row"><span>${t('paid_amount')}:</span> <strong style="color:#047857; font-size:1.2rem;">Rs. ${f.paid_amount}</strong></div>
        <div style="margin-top:2rem; text-align:${isUr ? 'left' : 'right'}; font-size:0.85rem;">
          <p>____________________</p>
          <p>${autoTranslateToUrdu(appState.settings.mohtamim_name)}<br>(${t('signature_mohtamim')})</p>
        </div>
      </div>
      <script>window.print();</script>
    </body>
    </html>
  `);
}

function shareFeeReceiptWhatsApp() {
  if (!currentFeeReceiptId) return;
  const f = appState.fees.find(x => x.id === currentFeeReceiptId);
  if (!f) return;
  const s = appState.students.find(x => x.id === f.student_id);
  if (!s) return;

  const isUr = appState.language === 'ur';
  const msg = isUr 
    ? `محترم والدین!\n*${appState.settings.madrasa_name}*\nرسید نمبر: *${f.receipt_no}*\nطالب علم: *${translateName(s.full_name)}* (رول: ${s.roll_number})\nماہ: *${f.month_year}*\nادا شدہ فیس: *Rs. ${f.paid_amount}*\nتاریخ ادائیگی: ${f.payment_date || getTodayDateStr()}\nشکریہ!`
    : `Official Fee Receipt\n*${appState.settings.madrasa_name}*\nReceipt #: *${f.receipt_no}*\nStudent: *${translateName(s.full_name)}* (${s.roll_number})\nMonth: *${f.month_year}*\nPaid Amount: *Rs. ${f.paid_amount}*\nDate: ${f.payment_date || getTodayDateStr()}\nThank you!`;

  openWhatsAppDirect(s.guardian_phone, msg);
}

// ==========================================================================
// 8. STUDENT PERFORMANCE REPORT CARD GENERATOR
// ==========================================================================

function populateReportStudentDropdown() {
  const select = document.getElementById('report-student-select');
  if (!select) return;
  select.innerHTML = appState.students
    .filter(s => s.status === 'active')
    .map(s => `<option value="${s.id}">${s.roll_number} - ${translateName(s.full_name)} (${t('sec_' + s.section + '_badge')})</option>`)
    .join('');
}

function generateStudentReportCard() {
  const studentId = parseInt(document.getElementById('report-student-select').value);
  const s = appState.students.find(x => x.id === studentId);
  if (!s) return;

  const attRecords = appState.attendance.filter(a => a.student_id === s.id);
  const totalAtt = attRecords.length;
  const totalPresent = attRecords.filter(a => a.status === 'present').length;
  const totalAbsent = attRecords.filter(a => a.status === 'absent').length;
  const percPresent = totalAtt > 0 ? Math.round((totalPresent / totalAtt) * 100) : 100;

  const acadRecords = appState.academic.filter(a => a.student_id === s.id);
  const latestLog = acadRecords.length > 0 ? acadRecords[acadRecords.length - 1] : null;

  const feeRecords = appState.fees.filter(f => f.student_id === s.id);
  const latestFee = feeRecords.length > 0 ? feeRecords[feeRecords.length - 1] : null;

  const container = document.getElementById('report-card-preview-container');
  const isUr = appState.language === 'ur';

  container.innerHTML = `
    <div class="printable-card" dir="${isUr ? 'rtl' : 'ltr'}">
      <div class="bismillah-header">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
      <div class="print-header">
        ${appState.settings.logo_url ? `<img src="${appState.settings.logo_url}" class="print-header-logo" alt="Logo"><br>` : ''}
        <h1 class="print-madrasa-title">${appState.settings.madrasa_name}</h1>
        <p class="print-subtitle">${t('report_card_header')}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:0.8rem; border-top:1px dashed #cbd5e1; padding-top:4px;">
          <small style="color:#64748b;">${isUr ? 'رجسٹریشن نمبر' : 'Registration #'}: <strong>${appState.settings.reg_number}</strong></small>
          <small style="color:#059669; font-weight:bold; background:#ecfdf5; padding:3px 10px; border-radius:12px; border:1px solid #a7f3d0;">${isUr ? 'سرکاری فائنل رپورٹ' : 'OFFICIAL PERFORMANCE CARD'}</small>
        </div>
      </div>

      <!-- Performance Metrics Cards Grid -->
      <div class="print-metrics-grid">
        <div class="print-metric-box">
          <div class="metric-label">${isUr ? 'حاضری کا فیصد' : 'ATTENDANCE RATE'}</div>
          <div class="metric-val">${percPresent}%</div>
          <small style="font-size:0.7rem; color:#059669;">${totalPresent} / ${totalAtt} ${isUr ? 'ایام حاضر' : 'Days Present'}</small>
        </div>
        <div class="print-metric-box gold">
          <div class="metric-label">${isUr ? 'تجوید و روانی گریڈ' : 'ACADEMIC GRADE'}</div>
          <div class="metric-val">${latestLog ? latestLog.tajweed_grade : 'A+'}</div>
          <small style="font-size:0.7rem; color:#b45309;">${t('sec_' + s.section + '_badge')}</small>
        </div>
        <div class="print-metric-box blue">
          <div class="metric-label">${isUr ? 'فیس صورتحال' : 'FEE STATUS'}</div>
          <div class="metric-val" style="font-size:1rem;">${latestFee ? (latestFee.status === 'paid' ? t('fee_paid') : t('fee_unpaid')) : t('fee_paid')}</div>
          <small style="font-size:0.7rem; color:#1d4ed8;">${latestFee ? latestFee.month_year : 'No Dues'}</small>
        </div>
      </div>

      <div class="print-grid">
        <div class="print-field"><label>${t('roll_num')}:</label> <span>${s.roll_number}</span></div>
        <div class="print-field"><label>${t('full_name')}:</label> <span>${translateName(s.full_name)}</span></div>
        <div class="print-field"><label>${t('father_name')}:</label> <span>${translateName(s.father_name)}</span></div>
        <div class="print-field"><label>${t('section')}:</label> <span>${t('sec_' + s.section + '_badge')}</span></div>
        <div class="print-field"><label>${t('guardian_phone')}:</label> <span>${s.guardian_phone}</span></div>
        <div class="print-field"><label>${t('adm_date')}:</label> <span>${s.admission_date}</span></div>
      </div>

      <h3 style="margin-bottom:0.75rem; color:#064e3b; font-size:1.1rem; border-bottom:2px solid #059669; padding-bottom:4px; display:inline-block;">${isUr ? 'قرآنی و تعلیمی ترقی کا تفصیلی خلاصہ' : 'Academic & Quran Progress Summary'}</h3>
      <table class="print-table">
        <thead>
          <tr>
            <th>${isUr ? 'تعلیمی پہلو / سبق' : 'Academic Aspect'}</th>
            <th>${isUr ? 'موجودہ پیشرفت و تفاصیل' : 'Current Progress & Details'}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><strong>${t('sabaq_lesson')}</strong></td>
            <td><strong style="color:#047857;">${latestLog && latestLog.sabaq ? autoTranslateToUrdu(latestLog.sabaq) : 'N/A'}</strong></td>
          </tr>
          ${s.section === 'hifz' ? `
            <tr>
              <td><strong>${t('sabqi')}</strong></td>
              <td>${latestLog && latestLog.sabqi ? autoTranslateToUrdu(latestLog.sabqi) : 'N/A'}</td>
            </tr>
            <tr>
              <td><strong>${t('manzil')}</strong></td>
              <td>${latestLog && latestLog.manzil ? autoTranslateToUrdu(latestLog.manzil) : 'N/A'}</td>
            </tr>
          ` : ''}
          <tr>
            <td><strong>${t('grade')}</strong></td>
            <td><strong style="color:#b45309;">${latestLog ? latestLog.tajweed_grade : 'A+'}</strong></td>
          </tr>
          <tr>
            <td><strong>${isUr ? 'حاضری ریکارڈ' : 'Attendance Record'}</strong></td>
            <td>${isUr ? `کل ایام: ${totalAtt} | حاضر: ${totalPresent} | غائب: ${totalAbsent} (${percPresent}% حاضری)` : `Total Logged: ${totalAtt} Days | Present: ${totalPresent} | Absent: ${totalAbsent}`}</td>
          </tr>
          <tr>
            <td><strong>${isUr ? 'استاد کے تاثرات' : 'Teacher Remarks'}</strong></td>
            <td><em>${latestLog && latestLog.remarks ? autoTranslateToUrdu(latestLog.remarks) : (isUr ? 'ماشاءاللہ بہت عمدہ روانی اور مخارج کے ساتھ۔' : 'Excellent recitation and progress.')}</em></td>
          </tr>
        </tbody>
      </table>

      <div class="print-footer">
        <div class="sig-box">
          <div class="sig-line">${t('signature_guardian')}</div>
        </div>
        <div class="official-seal-badge">
          <span>★ MMS ★</span>
          <span style="font-size:0.55rem; color:#064e3b;">VERIFIED</span>
          <span>SEAL</span>
        </div>
        <div class="sig-box">
          <div class="sig-line">${autoTranslateToUrdu(appState.settings.mohtamim_name)}<br>(${t('signature_mohtamim')})</div>
        </div>
      </div>

      <div class="no-print" style="margin-top:1.5rem; text-align:center;">
        <button class="btn btn-primary" onclick="window.print()"><i class="fa-solid fa-print"></i> ${t('btn_print_pdf')}</button>
      </div>
    </div>
  `;
}

// ==========================================================================
// 8.1 CUSTOMIZABLE REPORT & WHATSAPP GENERATOR
// ==========================================================================

function setDateRangePreset(presetKey) {
  const toInput = document.getElementById('custom-report-to-date');
  const fromInput = document.getElementById('custom-report-from-date');
  const todayStr = getTodayDateStr();
  const todayObj = new Date();

  toInput.value = todayStr;

  if (presetKey === 'this_month') {
    const year = todayObj.getFullYear();
    const month = String(todayObj.getMonth() + 1).padStart(2, '0');
    fromInput.value = `${year}-${month}-01`;
  } else if (presetKey === 'last_30') {
    const past = new Date();
    past.setDate(past.getDate() - 30);
    const y = past.getFullYear();
    const m = String(past.getMonth() + 1).padStart(2, '0');
    const d = String(past.getDate()).padStart(2, '0');
    fromInput.value = `${y}-${m}-${d}`;
  } else if (presetKey === 'all_time') {
    fromInput.value = '2025-01-01';
  }

  updateLiveReportPreview();
}

function openCustomReportModal(studentId, logId = null) {
  document.getElementById('custom-report-student-id').value = studentId;
  document.getElementById('custom-report-log-id').value = logId || '';

  const modal = document.getElementById('custom-report-modal');

  // Default dates: From 30 days ago to today
  const toInput = document.getElementById('custom-report-to-date');
  const fromInput = document.getElementById('custom-report-from-date');
  const todayStr = getTodayDateStr();
  const past = new Date();
  past.setDate(past.getDate() - 30);
  const y = past.getFullYear();
  const m = String(past.getMonth() + 1).padStart(2, '0');
  const d = String(past.getDate()).padStart(2, '0');

  if (toInput) toInput.value = todayStr;
  if (fromInput) fromInput.value = `${y}-${m}-${d}`;

  openModalWithHash('custom-report-modal', 'report-card?id=' + studentId);
  updateLiveReportPreview();
}

function updateLiveReportPreview() {
  const studentId = parseInt(document.getElementById('custom-report-student-id').value);
  const s = appState.students.find(x => x.id === studentId);
  if (!s) return;

  const fromDate = document.getElementById('custom-report-from-date')?.value || '2000-01-01';
  const toDate = document.getElementById('custom-report-to-date')?.value || '2099-12-31';

  const showBiodata = document.getElementById('chk-biodata').checked;
  const showAttendance = document.getElementById('chk-attendance').checked;
  const showSabaq = document.getElementById('chk-sabaq').checked;
  const showSabqi = document.getElementById('chk-sabqi').checked;
  const showManzil = document.getElementById('chk-manzil').checked;
  const showRemarks = document.getElementById('chk-remarks').checked;
  const showFees = document.getElementById('chk-fees').checked;

  // Precise Attendance Stats in Range
  const attRecords = appState.attendance.filter(a => a.student_id === s.id && a.attendance_date >= fromDate && a.attendance_date <= toDate);
  const totalAtt = attRecords.length;
  const totalPresent = attRecords.filter(a => a.status === 'present').length;
  const totalAbsent = attRecords.filter(a => a.status === 'absent').length;
  const totalLeave = attRecords.filter(a => a.status === 'leave').length;
  const totalLate = attRecords.filter(a => a.status === 'late').length;
  const percPresent = totalAtt > 0 ? Math.round((totalPresent / totalAtt) * 100) : 100;

  // Precise Sabaq Logs in Range
  const acadRecords = appState.academic.filter(a => a.student_id === s.id && a.record_date >= fromDate && a.record_date <= toDate);
  acadRecords.sort((a, b) => a.record_date.localeCompare(b.record_date));

  const feeRecords = appState.fees.filter(f => f.student_id === s.id);
  const latestFee = feeRecords.length > 0 ? feeRecords[feeRecords.length - 1] : null;

  const isUr = appState.language === 'ur';

  let html = `
    <div class="printable-card" dir="${isUr ? 'rtl' : 'ltr'}">
      <div class="bismillah-header">بِسْمِ ٱللَّٰهِ ٱلرَّحْمَٰنِ ٱلرَّحِيمِ</div>
      <div class="print-header">
        ${appState.settings.logo_url ? `<img src="${appState.settings.logo_url}" class="print-header-logo" alt="Logo"><br>` : ''}
        <h1 class="print-madrasa-title">${appState.settings.madrasa_name}</h1>
        <p class="print-subtitle">${t('report_card_header')}</p>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-top:8px; font-size:0.8rem; border-top:1px dashed #cbd5e1; padding-top:4px;">
          <small style="color:#64748b;">${isUr ? 'رجسٹریشن نمبر' : 'Registration #'}: <strong>${appState.settings.reg_number}</strong></small>
          <small style="color:#059669; font-weight:bold; background:#ecfdf5; padding:3px 10px; border-radius:12px; border:1px solid #a7f3d0;">${isUr ? 'تاریخوں کی حد' : 'Period'}: ${fromDate} ➔ ${toDate}</small>
        </div>
      </div>
  `;

  // Performance Highlights Cards
  html += `
    <div class="print-metrics-grid">
      <div class="print-metric-box">
        <div class="metric-label">${isUr ? 'حاضری کا فیصد' : 'ATTENDANCE RATE'}</div>
        <div class="metric-val">${percPresent}%</div>
        <small style="font-size:0.7rem; color:#059669;">${totalPresent} / ${totalAtt} ${isUr ? 'ایام حاضر' : 'Days Present'}</small>
      </div>
      <div class="print-metric-box gold">
        <div class="metric-label">${isUr ? 'شعبہ' : 'SECTION'}</div>
        <div class="metric-val" style="font-size:1.1rem;">${t('sec_' + s.section + '_badge')}</div>
        <small style="font-size:0.7rem; color:#b45309;">${s.roll_number}</small>
      </div>
      <div class="print-metric-box blue">
        <div class="metric-label">${isUr ? 'فیس صورتحال' : 'FEE STATUS'}</div>
        <div class="metric-val" style="font-size:1rem;">${latestFee ? (latestFee.status === 'paid' ? t('fee_paid') : t('fee_unpaid')) : t('fee_paid')}</div>
        <small style="font-size:0.7rem; color:#1d4ed8;">${latestFee ? latestFee.month_year : 'No Dues'}</small>
      </div>
    </div>
  `;

  if (showBiodata) {
    html += `
      <div class="print-grid">
        <div class="print-field"><label>${t('roll_num')}:</label> <span>${s.roll_number}</span></div>
        <div class="print-field"><label>${t('full_name')}:</label> <span>${translateName(s.full_name)}</span></div>
        <div class="print-field"><label>${t('father_name')}:</label> <span>${translateName(s.father_name)}</span></div>
        <div class="print-field"><label>${t('section')}:</label> <span>${t('sec_' + s.section + '_badge')}</span></div>
        <div class="print-field"><label>${t('guardian_phone')}:</label> <span>${s.guardian_phone}</span></div>
        <div class="print-field"><label>${t('adm_date')}:</label> <span>${s.admission_date}</span></div>
      </div>
    `;
  }

  html += `
    <h3 style="margin-bottom:0.75rem; color:#064e3b; font-size:1.1rem; border-bottom:2px solid #059669; padding-bottom:4px; display:inline-block;">${isUr ? `<span dir="ltr" style="display:inline-block;">(${fromDate} تا ${toDate})</span> منتخبہ دورانیہ کا تعلیمی خلاصہ` : `Academic Progress Summary (${fromDate} to ${toDate})`}</h3>
  `;

  // Render Detailed Multi-Date Academic Progress Table if Sabaq or Sabqi or Manzil checked
  if ((showSabaq || showSabqi || showManzil || showRemarks) && acadRecords.length > 0) {
    html += `
      <table class="print-table" style="margin-bottom: 1.25rem;">
        <thead>
          <tr>
            <th>${isUr ? 'تاریخ' : 'Date'}</th>
            ${showSabaq ? `<th>${t('sabaq_lesson')}</th>` : ''}
            ${showSabqi && s.section === 'hifz' ? `<th>${t('sabqi')}</th>` : ''}
            ${showManzil && s.section === 'hifz' ? `<th>${t('manzil')}</th>` : ''}
            ${showRemarks ? `<th>${t('grade')} & ${isUr ? 'تاثرات' : 'Remarks'}</th>` : ''}
          </tr>
        </thead>
        <tbody>
    `;

    acadRecords.forEach(rec => {
      html += `
        <tr>
          <td><strong>${rec.record_date}</strong></td>
          ${showSabaq ? `<td style="color:#047857; font-weight:bold;">${rec.sabaq ? autoTranslateToUrdu(rec.sabaq) : '—'}</td>` : ''}
          ${showSabqi && s.section === 'hifz' ? `<td>${rec.sabqi ? autoTranslateToUrdu(rec.sabqi) : '—'}</td>` : ''}
          ${showManzil && s.section === 'hifz' ? `<td>${rec.manzil ? autoTranslateToUrdu(rec.manzil) : '—'}</td>` : ''}
          ${showRemarks ? `<td><span class="badge badge-hifz">${rec.tajweed_grade}</span> ${rec.remarks ? autoTranslateToUrdu(rec.remarks) : ''}</td>` : ''}
        </tr>
      `;
    });

    html += `
        </tbody>
      </table>
    `;
  } else if ((showSabaq || showSabqi || showManzil || showRemarks) && acadRecords.length === 0) {
    html += `<p style="padding:1rem; text-align:center; color:#64748b; font-style:italic;">${isUr ? 'اس منتخبہ تاریخ کی حد میں کوئی سبق ریکارڈ نہیں ملا۔' : 'No academic logs found within this date range.'}</p>`;
  }

  // Summary Table for Attendance & Fees
  html += `
    <table class="print-table">
      <thead>
        <tr>
          <th>${isUr ? 'پیرامیٹر' : 'Parameter'}</th>
          <th>${isUr ? 'تفصیلات و صورتحال' : 'Details & Status'}</th>
        </tr>
      </thead>
      <tbody>
  `;

  if (showAttendance) {
    html += `
      <tr>
        <td><strong>${isUr ? 'حاضری خلاصہ (' + fromDate + ' تا ' + toDate + ')' : 'Attendance Summary (' + fromDate + ' to ' + toDate + ')'}</strong></td>
        <td>${isUr ? `کل ریکارڈ ایام: ${totalAtt} | حاضر: ${totalPresent} | غائب: ${totalAbsent} | رخصت: ${totalLeave} | تاخیر: ${totalLate} (${percPresent}% حاضری)` : `Total Days Logged: ${totalAtt} | Present: ${totalPresent} | Absent: ${totalAbsent} | Leave: ${totalLeave} | Late: ${totalLate} (${percPresent}% Present)`}</td>
      </tr>
    `;
  }

  if (showFees && latestFee) {
    html += `
      <tr>
        <td><strong>${isUr ? 'فیس صورتحال (' + latestFee.month_year + ')' : 'Fee Status (' + latestFee.month_year + ')'}</strong></td>
        <td><strong>${latestFee.status === 'paid' ? t('fee_paid') : t('fee_unpaid')}</strong> (${latestFee.paid_amount} / ${latestFee.amount} PKR)</td>
      </tr>
    `;
  }

  html += `
      </tbody>
    </table>

    <div class="print-footer">
      <div class="sig-box">
        <div class="sig-line">${t('signature_guardian')}</div>
      </div>
      <div class="official-seal-badge">
        <span>★ MMS ★</span>
        <span style="font-size:0.55rem; color:#064e3b;">VERIFIED</span>
        <span>SEAL</span>
      </div>
      <div class="sig-box">
        <div class="sig-line">${autoTranslateToUrdu(appState.settings.mohtamim_name)}<br>(${t('signature_mohtamim')})</div>
      </div>
    </div>
  </div>
  `;

  document.getElementById('custom-report-preview-box').innerHTML = html;
}

function printCustomReport() {
  window.print();
}

function sendCustomizedWhatsAppReport() {
  const studentId = parseInt(document.getElementById('custom-report-student-id').value);
  const s = appState.students.find(x => x.id === studentId);
  if (!s) return;

  const fromDate = document.getElementById('custom-report-from-date')?.value || '2000-01-01';
  const toDate = document.getElementById('custom-report-to-date')?.value || '2099-12-31';

  const showBiodata = document.getElementById('chk-biodata').checked;
  const showAttendance = document.getElementById('chk-attendance').checked;
  const showSabaq = document.getElementById('chk-sabaq').checked;
  const showSabqi = document.getElementById('chk-sabqi').checked;
  const showManzil = document.getElementById('chk-manzil').checked;
  const showRemarks = document.getElementById('chk-remarks').checked;
  const showFees = document.getElementById('chk-fees').checked;

  const isUr = appState.language === 'ur';

  let msg = `*${appState.settings.madrasa_name}*\n`;
  msg += `*${t('report_card_header')}*\n`;
  msg += `📅 *${isUr ? 'دورانیہ' : 'Period'}*: ${fromDate} ➔ ${toDate}\n\n`;

  if (showBiodata) {
    msg += `👤 *${t('full_name')}*: ${translateName(s.full_name)}\n`;
    msg += `🆔 *${t('roll_num')}*: ${s.roll_number}\n`;
    msg += `📚 *${t('section')}*: ${t('sec_' + s.section + '_badge')}\n\n`;
  }

  // Filter logs in range
  const acadRecords = appState.academic.filter(a => a.student_id === s.id && a.record_date >= fromDate && a.record_date <= toDate);
  acadRecords.sort((a, b) => a.record_date.localeCompare(b.record_date));

  if (acadRecords.length > 0) {
    msg += `📋 *${isUr ? 'تعلیمی سبق کا خلاصہ' : 'Academic Progress'}*:\n`;
    acadRecords.forEach(rec => {
      msg += `\n📅 *${rec.record_date}*:`;
      if (showSabaq && rec.sabaq) msg += `\n  • 📖 ${t('sabaq_lesson')}: ${autoTranslateToUrdu(rec.sabaq)}`;
      if (showSabqi && rec.sabqi && s.section === 'hifz') msg += `\n  • 📑 ${t('sabqi')}: ${autoTranslateToUrdu(rec.sabqi)}`;
      if (showManzil && rec.manzil && s.section === 'hifz') msg += `\n  • 🕌 ${t('manzil')}: ${autoTranslateToUrdu(rec.manzil)}`;
      if (showRemarks) {
        msg += `\n  • ⭐ ${t('grade')}: ${rec.tajweed_grade}`;
        if (rec.remarks) msg += ` (${autoTranslateToUrdu(rec.remarks)})`;
      }
    });
    msg += `\n\n`;
  }

  if (showAttendance) {
    const attRecords = appState.attendance.filter(a => a.student_id === s.id && a.attendance_date >= fromDate && a.attendance_date <= toDate);
    const totalAtt = attRecords.length;
    const present = attRecords.filter(a => a.status === 'present').length;
    const absent = attRecords.filter(a => a.status === 'absent').length;
    const leave = attRecords.filter(a => a.status === 'leave').length;
    const perc = totalAtt > 0 ? Math.round((present / totalAtt) * 100) : 0;
    msg += `📊 *${isUr ? 'حاضری کا خلاصہ' : 'Attendance Summary'}*:\n`;
    msg += `  ${isUr ? `کل ایام: ${totalAtt} | حاضر: ${present} | غائب: ${absent} | رخصت: ${leave} (${perc}% حاضری)` : `Total: ${totalAtt} Days | Present: ${present} | Absent: ${absent} | Leave: ${leave} (${perc}% Attendance)`}\n\n`;
  }

  if (showFees) {
    const feeRecords = appState.fees.filter(f => f.student_id === s.id);
    const latestFee = feeRecords.length > 0 ? feeRecords[feeRecords.length - 1] : null;
    if (latestFee) {
      msg += `💵 *${isUr ? 'فیس صورتحال' : 'Fee Status'}*: ${latestFee.status === 'paid' ? t('fee_paid') : t('fee_unpaid')} (${latestFee.month_year})\n\n`;
    }
  }

  msg += `*${autoTranslateToUrdu(appState.settings.mohtamim_name)}*\n_${appState.settings.madrasa_name}_`;

  openWhatsAppDirect(s.guardian_phone, msg);
}

// ==========================================================================
// 9. SETTINGS & JSON BACKUP / RESTORE
// ==========================================================================

function loadSettingsForm() {
  document.getElementById('setting-madrasa-name').value = appState.settings.madrasa_name || '';
  document.getElementById('setting-reg-number').value = appState.settings.reg_number || '';
  document.getElementById('setting-mohtamim-name').value = appState.settings.mohtamim_name || '';
  document.getElementById('setting-phone').value = appState.settings.phone || '';
  document.getElementById('setting-wa-template').value = appState.settings.whatsapp_template || '';
}

function saveMadrasaSettings(e) {
  e.preventDefault();
  appState.settings.madrasa_name = document.getElementById('setting-madrasa-name').value;
  appState.settings.reg_number = document.getElementById('setting-reg-number').value;
  appState.settings.mohtamim_name = document.getElementById('setting-mohtamim-name').value;
  appState.settings.phone = document.getElementById('setting-phone').value;
  appState.settings.whatsapp_template = document.getElementById('setting-wa-template').value;

  saveAllState();
  updateMadrasaBranding();
  alert(appState.language === 'ur' ? 'مدرسہ کی عالمی سیٹنگز محفوظ ہو گئی ہیں۔' : 'Madrasa global settings saved successfully.');
}

function exportDataJSON() {
  const accountPrefix = appState.currentUser ? `${appState.currentUser.email}_${appState.currentUser.phone}`.replace(/[^a-zA-Z0-9]/g, '_') : 'General';
  const jsonStr = JSON.stringify(appState, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `MMS_Vault_${accountPrefix}_${getTodayDateStr()}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

function importDataJSON(e) {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const parsed = JSON.parse(event.target.result);
      if (parsed.students && parsed.attendance && parsed.academic) {
        appState = parsed;
        saveAllState();
        updateMadrasaBranding();
        updateUserProfileBadge();
        renderDashboard();
        document.getElementById('auth-overlay')?.classList.remove('active');
        alert(appState.language === 'ur' ? 'اکاؤنٹ کا کلاؤڈ والٹ ڈیٹا کامیابی سے بحال ہو گیا ہے!' : 'Account Data Vault restored successfully!');
      } else {
        alert(appState.language === 'ur' ? 'ناقص بیک اپ فائل فارمیٹ۔' : 'Invalid backup file format.');
      }
    } catch (err) {
      alert('Error parsing JSON backup file: ' + err.message);
    }
  };
  reader.readAsText(file);
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) modal.classList.remove('active');
}

function toggleMobileMode() {
  document.body.classList.toggle('mobile-mode');
  const btnSpan = document.getElementById('mobile-btn-text');
  const isMobile = document.body.classList.contains('mobile-mode');
  if (btnSpan) {
    btnSpan.innerText = isMobile 
      ? (appState.language === 'ur' ? 'ڈیسک ٹاپ نظارہ' : 'Desktop View') 
      : (appState.language === 'ur' ? 'موبائل نظارہ' : 'Mobile View');
  }
}

// ==========================================================================
// 10. FIREBASE REALTIME CLOUD LIFETIME SYNC ENGINE
// ==========================================================================

let firebaseApp = null;
let firebaseDb = null;

function initFirebaseEngine() {
  const customUrl = localStorage.getItem('mms_firebase_url') || (appState.settings && appState.settings.firebase_url);
  const dbUrl = customUrl || "https://newmadrasa-default-rtdb.firebaseio.com";

  try {
    if (typeof firebase !== 'undefined') {
      if (!firebase.apps.length) {
        firebaseApp = firebase.initializeApp({
          databaseURL: dbUrl
        });
      } else {
        firebaseApp = firebase.app();
      }
      firebaseDb = firebase.database();
      updateFirebaseUI(true, 'Firebase Connected');
      console.log('Firebase initialized with Database URL:', dbUrl);

      // Fill URL input in Settings
      const urlInput = document.getElementById('firebase-db-url');
      if (urlInput && !urlInput.value) urlInput.value = dbUrl;
    }
  } catch (e) {
    console.log('Firebase init fallback:', e.message);
    updateFirebaseUI(false, 'Local Vault (Cloud Ready)');
  }
}

function updateFirebaseUI(connected, text) {
  const dot = document.getElementById('firebase-dot');
  const txt = document.getElementById('firebase-status-text');
  if (dot) dot.style.background = connected ? '#10b981' : '#f59e0b';
  if (txt) {
    txt.innerText = text;
    txt.style.color = connected ? 'var(--emerald-400)' : 'var(--gold-400)';
  }
}

function syncToFirebaseRealtime() {
  if (!firebaseDb) return;
  try {
    const accountKey = appState.currentUser 
      ? appState.currentUser.account_id 
      : 'default_madrasa_vault';

    const syncData = {
      students: appState.students,
      attendance: appState.attendance,
      academic: appState.academic,
      fees: appState.fees,
      settings: appState.settings,
      last_synced: new Date().toISOString()
    };

    firebaseDb.ref('madrasa_accounts/' + accountKey).set(syncData, (error) => {
      if (error) {
        console.log('Firebase Sync Error:', error);
      } else {
        console.log('Successfully synced to Firebase Cloud!');
        updateFirebaseUI(true, 'Firebase Live Synced');
      }
    });
  } catch (err) {
    console.log('Firebase Realtime push failed:', err.message);
  }
}

function connectFirebaseCloud() {
  const urlInput = document.getElementById('firebase-db-url');
  const url = urlInput ? urlInput.value.trim() : '';
  if (url) {
    localStorage.setItem('mms_firebase_url', url);
    if (!appState.settings) appState.settings = {};
    appState.settings.firebase_url = url;
  }
  initFirebaseEngine();
  syncToFirebaseRealtime();
  alert(appState.language === 'ur' ? 'فائر بیس کلاؤڈ ڈیٹا بیس کامیابی سے کنیکٹ اور سنک ہو گیا ہے!' : 'Firebase Realtime Cloud Database connected and synced successfully!');
}

function restoreFromFirebaseCloud() {
  if (!firebaseDb) {
    initFirebaseEngine();
  }
  if (!firebaseDb) {
    alert(appState.language === 'ur' ? 'فائر بیس کنکشن فعال نہیں ہے۔' : 'Firebase Connection is not active.');
    return;
  }

  const accountKey = appState.currentUser 
    ? appState.currentUser.account_id 
    : 'default_madrasa_vault';

  firebaseDb.ref('madrasa_accounts/' + accountKey).once('value').then((snapshot) => {
    const data = snapshot.val();
    if (data) {
      if (data.students) appState.students = data.students;
      if (data.attendance) appState.attendance = data.attendance;
      if (data.academic) appState.academic = data.academic;
      if (data.fees) appState.fees = data.fees;
      if (data.settings) appState.settings = data.settings;

      saveAllState();
      updateMadrasaBranding();
      updateUserProfileBadge();
      renderDashboard();
      alert(appState.language === 'ur' ? 'فائر بیس کلاؤڈ سے تمام لائف ٹائم ڈیٹا کامیابی سے ڈاؤن لوڈ اور بحال ہو گیا ہے!' : 'All lifetime data successfully restored from Firebase Cloud!');
    } else {
      alert(appState.language === 'ur' ? 'فائر بیس پر اس اکاؤنٹ کا ڈیٹا نہیں ملا۔' : 'No existing data found on Firebase for this account.');
    }
  }).catch((err) => {
    alert('Firebase fetch error: ' + err.message);
  });
}
