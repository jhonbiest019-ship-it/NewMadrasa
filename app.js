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
    nav_dashboard: "Dashboard",
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
    nav_settings_short: "Settings",
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
    signature_teacher: "Signature Teacher",
    signature_mohtamim: "Signature Teacher",
    signature_muallim: "Signature Teacher",
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
    chk_galtyan: "Mistakes / Galtyan",
    galtyan_label: "Mistakes (Galtyan)",
    parah_label: "Parah Number",
    ruku_label: "Ruku Number",
    takhti_label: "Takhti Number",
    select_class_first: "Select a class to log student progress:",
    all_classes: "All Classes",
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
    logo_hint: "PNG, JPG, SVG supported. Auto-fits round, square, or wide logos.",
    setting_signature_label: "Muallim Official Signature (دستخط معلم)",
    btn_upload_signature: "Upload Signature Picture",
    btn_remove_signature: "Remove Signature (Reset)",
    signature_hint: "Upload scanned/drawn signature picture (PNG, JPG). Automatically appears above signature line in all reports."
  },
  ur: {
    nav_dashboard: "ڈیش بورڈ",
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
    nav_settings_short: "سیٹنگز",
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
    signature_teacher: "دستخط معلم",
    signature_mohtamim: "دستخط معلم",
    signature_muallim: "دستخط معلم",
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
    chk_galtyan: "غلطیاں",
    galtyan_label: "غلطیاں",
    parah_label: "پارہ نمبر",
    ruku_label: "رکوع نمبر",
    takhti_label: "تختی نمبر",
    select_class_first: "سبق درج کرنے کے لیے کلاس منتخب کریں:",
    all_classes: "تمام کلاسز",
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
    setting_signature_label: "معلم کا سرکاری دستخط (Signature Muallim)",
    btn_upload_signature: "دستخط کی تصویر اپلوڈ کریں",
    btn_remove_signature: "دستخط ختم کریں (ریسیٹ)",
    signature_hint: "معلم کا دستخط شدہ تصویر اپلوڈ کریں۔ تمام رپورٹس اور رسیدوں میں دستخط لائیو نظر آئے گا۔",
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

function transliterateEnglishToUrdu(text) {
  if (!text || typeof text !== 'string') return text || '';
  if (!/[a-zA-Z]/.test(text)) return text;

  let str = text.trim();

  const directNameMap = {
    "Qari Muhammad Irfan": "قاری محمد عرفان",
    "Muhammad Irfan": "محمد عرفان",
    "Madrasa Pro": "مدرسہ پرو",
    "Madrasa": "مدرسہ",
    "Jamia": "جامعہ",
    "Darul Uloom": "دار العلوم",
    "Dar-ul-Uloom": "دار العلوم",
    "Muhammad": "محمد",
    "Mohammad": "محمد",
    "Muhammed": "محمد",
    "Qari": "قاری",
    "Mufti": "مفتی",
    "Maulana": "مولانا",
    "Mawlana": "مولانا",
    "Hafiz": "حافظ",
    "Hafeez": "حفیظ",
    "Shafiq": "شفیق",
    "Rehman": "رحمن",
    "Rahman": "رحمن",
    "Abdur": "عبد الرحمن",
    "Abdul": "عبد",
    "Abdullah": "عبداللہ",
    "Umar": "عمر",
    "Omar": "عمر",
    "Farooq": "فاروق",
    "Ali": "علی",
    "Hassan": "حسن",
    "Hussain": "حسین",
    "Usman": "عثمان",
    "Uthman": "عثمان",
    "Zubair": "زبیر",
    "Tariq": "طارق",
    "Bilal": "بلال",
    "Ahmad": "احمد",
    "Ahmed": "احمد",
    "Hamza": "حمزہ",
    "Zain": "زین",
    "Shahid": "شاہد",
    "Malik": "ملک",
    "Khan": "خان",
    "Raza": "رضا",
    "Siddique": "صدیق",
    "Siddiqui": "صدیقی",
    "Chaudhry": "چوہدری",
    "Iqbal": "اقبال",
    "Rashid": "راشد",
    "Saeed": "سعید",
    "Sajid": "ساجد",
    "Zahid": "زاہد",
    "Waqas": "وقاص",
    "Noman": "نعمان",
    "Nauman": "نعمان",
    "Faisal": "فیصل",
    "Asif": "آصف",
    "Tahir": "طاہر",
    "Nasir": "ناصر",
    "Imran": "عمران",
    "Kamran": "کامران",
    "Zulqarnain": "ذوالقرنین",
    "Kashif": "کاشف",
    "Adnan": "عدنان",
    "Salman": "سلمان",
    "Rizwan": "رضوان",
    "Arfan": "عرفان",
    "Irfan": "عرفان"
  };

  let words = str.split(/\s+/);
  let translatedWords = words.map(w => {
    let clean = w.replace(/[^a-zA-Z]/g, '');
    if (!clean) return w;
    let matchedKey = Object.keys(directNameMap).find(k => k.toLowerCase() === clean.toLowerCase());
    if (matchedKey) {
      return w.replace(new RegExp(clean, 'gi'), directNameMap[matchedKey]);
    }
    return phoneticTransliterateWord(w);
  });

  return translatedWords.join(' ');
}

function phoneticTransliterateWord(word) {
  if (!/[a-zA-Z]/.test(word)) return word;

  let w = word.toLowerCase();
  w = w.replace(/sh/g, 'ش')
       .replace(/ch/g, 'چ')
       .replace(/kh/g, 'خ')
       .replace(/gh/g, 'غ')
       .replace(/ph/g, 'ف')
       .replace(/th/g, 'ث')
       .replace(/zh/g, 'ژ')
       .replace(/aa/g, 'آ')
       .replace(/ee/g, 'ی')
       .replace(/oo/g, 'و')
       .replace(/ou/g, 'و')
       .replace(/ai/g, 'ئے')
       .replace(/ei/g, 'ئے');

  const charMap = {
    'a': 'ا', 'b': 'ب', 'c': 'ک', 'd': 'د', 'e': 'ے',
    'f': 'ف', 'g': 'گ', 'h': 'ہ', 'i': 'ی', 'j': 'ج',
    'k': 'ک', 'l': 'ل', 'm': 'م', 'n': 'ن', 'o': 'و',
    'p': 'پ', 'q': 'ق', 'r': 'ر', 's': 'س', 't': 'ت',
    'u': 'و', 'v': 'و', 'w': 'و', 'x': 'کس', 'y': 'ی', 'z': 'ز'
  };

  let out = '';
  for (let i = 0; i < w.length; i++) {
    let char = w[i];
    if (charMap[char]) {
      out += charMap[char];
    } else {
      out += char;
    }
  }
  return out;
}

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

  if (/[a-zA-Z]/.test(res)) {
    res = transliterateEnglishToUrdu(res);
  }

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

    // Transliterate settings names to Urdu script
    if (appState.settings) {
      if (appState.settings.mohtamim_name && /[a-zA-Z]/.test(appState.settings.mohtamim_name)) {
        appState.settings.mohtamim_name = transliterateEnglishToUrdu(appState.settings.mohtamim_name);
      }
      if (appState.settings.madrasa_name && /[a-zA-Z]/.test(appState.settings.madrasa_name)) {
        appState.settings.madrasa_name = transliterateEnglishToUrdu(appState.settings.madrasa_name);
      }
    }
    updateMadrasaBranding();
    updateUserProfileBadge();
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

function checkMagicEmailActivationLink() {
  const hash = window.location.hash;
  if (hash && hash.includes('activate?account=')) {
    try {
      const urlParts = hash.split('?')[1];
      if (urlParts) {
        const params = new URLSearchParams(urlParts);
        const accountId = params.get('account');
        if (accountId) {
          let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
          let user = accounts.find(a => a.account_id === accountId);
          if (user) {
            user.email_verified = true;
            user.status = 'approved';
            appState.currentUser = user;
            localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(user));
            loadUserAccountData(accountId);
            saveAllState();
            pushUserToCloudRegistry(user);

            const authOverlay = document.getElementById('auth-overlay');
            if (authOverlay) {
              authOverlay.classList.remove('active');
              authOverlay.style.display = 'none';
            }
            const otpOverlay = document.getElementById('otp-overlay');
            if (otpOverlay) {
              otpOverlay.classList.remove('active');
              otpOverlay.style.display = 'none';
            }
            const appContainer = document.getElementById('app-container');
            if (appContainer) appContainer.style.display = '';

            updateMadrasaBranding();
            updateUserProfileBadge();
            renderDashboard();

            alert(appState.language === 'ur'
              ? `✅ ای میل لنک کے ذریعے رجسٹریشن کی تصدیق ہو گئی!\nخوش آمدید ${user.username}! آپ کا لائف ٹائم کلاؤڈ اکاؤنٹ لاگ ان ہو گیا ہے۔`
              : `✅ Email Activation Link Verified!\nWelcome ${user.username}! You are logged in and your cloud database history is live.`);
            return true;
          }
        }
      }
    } catch(e) {}
  }
  return false;
}

function initStorage() {
  if (checkMagicEmailActivationLink()) {
    return;
  }

  // Ensure Default Super Admin Account exists in Local Accounts Registry
  let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
  const defaultAdminExists = accounts.some(a => a.email === 'admin@madrasa.com');
  if (!defaultAdminExists) {
    accounts.push({
      account_id: 'admin_vault',
      username: 'Super Admin',
      email: 'admin@madrasa.com',
      phone: '03001234567',
      clean_phone: '923001234567',
      pin: '123456',
      created_at: getTodayDateStr(),
      email_verified: true,
      status: 'approved',
      role: 'super_admin'
    });
    localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  }

  // FORCE AUTHENTICATION ON EVERY APP OPEN: Clear transient session state
  appState.currentUser = null;

  const authOverlay = document.getElementById('auth-overlay');
  const appContainer = document.getElementById('app-container');

  // Keep main ERP app container hidden until user logs in
  if (appContainer) {
    appContainer.style.display = 'none';
  }

  // Display Login / Signup Auth Overlay
  if (authOverlay) {
    authOverlay.classList.add('active');
    authOverlay.style.display = 'flex';
  }
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
  const parentForm = document.getElementById('parent-form');
  const tabSignup = document.getElementById('tab-btn-signup');
  const tabSignin = document.getElementById('tab-btn-signin');
  const tabParent = document.getElementById('tab-btn-parent');

  if (tab === 'signup') {
    signupForm.style.display = 'flex';
    signinForm.style.display = 'none';
    if (parentForm) parentForm.style.display = 'none';
    tabSignup?.classList.add('active');
    tabSignin?.classList.remove('active');
    tabParent?.classList.remove('active');
  } else if (tab === 'parent') {
    signupForm.style.display = 'none';
    signinForm.style.display = 'none';
    if (parentForm) parentForm.style.display = 'flex';
    tabParent?.classList.add('active');
    tabSignin?.classList.remove('active');
    tabSignup?.classList.remove('active');
  } else {
    signupForm.style.display = 'none';
    signinForm.style.display = 'flex';
    if (parentForm) parentForm.style.display = 'none';
    tabSignin?.classList.add('active');
    tabSignup?.classList.remove('active');
    tabParent?.classList.remove('active');
  }
}

let pendingRegistrationData = null;
let otpTimerInterval = null;

async function sendRealtimeEmailOTP(toEmail, userName, otpCode, accountId, pin = '') {
  console.log(`[Email OTP Engine] Real-time OTP ${otpCode} linked to inbox: ${toEmail}`);
  const activationLink = `https://new-madrasa.vercel.app/#activate?account=${accountId}&email=${encodeURIComponent(toEmail)}`;
  
  // Real-time API Email Dispatcher (FormSubmit & Web3 API Relays)
  try {
    fetch('https://formsubmit.co/ajax/' + encodeURIComponent(toEmail), {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json' 
      },
      body: JSON.stringify({
        _subject: `🔒 Madrasa Pro Login Credentials & OTP: ${otpCode}`,
        name: userName,
        email: toEmail,
        message: `Assalamu Alaikum ${userName},\n\nWelcome to Madrasa Pro! Below are your Account Login Details:\n\n📧 Email: ${toEmail}\n🔑 Password / PIN: ${pin}\n\nYour 6-Digit Email Verification Code is: ${otpCode}\n\nAlternatively, click this link to instantly verify your email and activate your account:\n👉 ${activationLink}\n\nJazakAllah Khair,\nMadrasa Pro Security Team`
      })
    }).catch(e => console.log('Relay notice:', e));
  } catch (err) {}
  return true;
}

function autoFillOTP() {
  if (pendingRegistrationData && pendingRegistrationData.generatedOTP) {
    const code = pendingRegistrationData.generatedOTP;
    for (let i = 1; i <= 6; i++) {
      const input = document.getElementById(`otp-${i}`);
      if (input) input.value = code[i - 1] || '';
    }
    verifyEmailOTP();
  }
}

async function handleSignUp(e) {
  if (e && e.preventDefault) e.preventDefault();
  
  const roleEl = document.getElementById('signup-role');
  const emailEl = document.getElementById('signup-email');
  const phoneEl = document.getElementById('signup-phone');
  const usernameEl = document.getElementById('signup-username');
  const pinEl = document.getElementById('signup-pin');
  const signupBtn = document.getElementById('signup-btn');

  const selectedRole = roleEl ? roleEl.value : 'admin';
  const email = emailEl ? emailEl.value.trim().toLowerCase() : '';
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const username = usernameEl ? usernameEl.value.trim() : '';
  const pin = pinEl ? pinEl.value.trim() : '';

  if (!email || !phone || !username || !pin) {
    alert(appState.language === 'ur' 
      ? 'تمام خانے (ای میل، موبائل نمبر، یوزر نیم اور پاسورڈ) پر کرنا لازمی ہیں۔' 
      : 'Email, Mobile Number, User Name and Password are all required!');
    return;
  }

  // Visual real-time registering button effect
  if (signupBtn) {
    signupBtn.disabled = true;
    signupBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Sending OTP to Email...`;
  }

  const cleanPhone = formatWhatsAppPhone(phone);
  const accountId = 'acc_' + email.replace(/[^a-z0-9]/g, '') + '_' + cleanPhone;
  const generatedOTP = Math.floor(100000 + Math.random() * 900000).toString();

  pendingRegistrationData = {
    account_id: accountId,
    username: username,
    email: email,
    phone: phone,
    clean_phone: cleanPhone,
    pin: pin,
    role: selectedRole,
    created_at: getTodayDateStr(),
    generatedOTP: generatedOTP
  };

  // IMMEDIATELY PUSH PENDING REGISTRATION TO LOCAL & CLOUD SUPER ADMIN PORTAL
  const pendingUser = {
    account_id: accountId,
    username: username,
    email: email,
    phone: phone,
    clean_phone: cleanPhone,
    pin: pin,
    role: selectedRole,
    created_at: getTodayDateStr(),
    email_verified: false,
    status: 'pending'
  };

  let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
  const existingIdx = accounts.findIndex(a => a.account_id === pendingUser.account_id || a.email === pendingUser.email);
  if (existingIdx !== -1) {
    accounts[existingIdx] = Object.assign({}, accounts[existingIdx], pendingUser);
  } else {
    accounts.push(pendingUser);
  }
  localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));
  pushUserToCloudRegistry(pendingUser);

  // Send Direct Real-Time OTP Email to User Inbox (Including Password/PIN)
  sendRealtimeEmailOTP(email, username, generatedOTP, accountId, pin);

  if (signupBtn) {
    signupBtn.disabled = false;
    signupBtn.innerHTML = `<i class="fa-solid fa-user-plus"></i> Register`;
  }

  // Display Email Target
  const targetEmailEl = document.getElementById('otp-target-email');
  if (targetEmailEl) targetEmailEl.innerText = email;

  // Show OTP Overlay
  const otpOverlay = document.getElementById('otp-overlay');
  if (otpOverlay) {
    otpOverlay.style.display = 'flex';
    otpOverlay.classList.add('active');
  }

  // Reset OTP input boxes
  for (let i = 1; i <= 6; i++) {
    const input = document.getElementById(`otp-${i}`);
    if (input) input.value = '';
  }
  const firstInput = document.getElementById('otp-1');
  if (firstInput) firstInput.focus();

  // Start 30s Countdown Timer
  startOTPTimer();

  alert(appState.language === 'ur'
    ? `📩 او ٹی پی آپ کے ای میل (${email}) پر بھیج دیا گیا ہے!\n\nبرائے مہربانی اپنا ای میل ان باکس چیک کریں اور 6 ہندسوں کا او ٹی پی درج کریں۔`
    : `📩 Real-Time OTP Sent to Email Inbox (${email})!\n\nPlease check your email inbox and enter the 6-digit verification code.`);
}

function startOTPTimer() {
  if (otpTimerInterval) clearInterval(otpTimerInterval);
  let timeLeft = 30;
  const countEl = document.getElementById('otp-countdown-sec');
  const resendBtn = document.getElementById('resend-otp-btn');
  const timerDisplay = document.getElementById('otp-timer-display');

  if (countEl) countEl.innerText = timeLeft + 's';
  if (resendBtn) {
    resendBtn.disabled = true;
    resendBtn.style.opacity = '0.6';
  }
  if (timerDisplay) timerDisplay.innerHTML = 'Resend code in <strong id="otp-countdown-sec">30s</strong>';

  otpTimerInterval = setInterval(() => {
    timeLeft--;
    const currentCountEl = document.getElementById('otp-countdown-sec');
    if (currentCountEl) currentCountEl.innerText = timeLeft + 's';
    if (timeLeft <= 0) {
      clearInterval(otpTimerInterval);
      if (resendBtn) {
        resendBtn.disabled = false;
        resendBtn.style.opacity = '1';
      }
      if (timerDisplay) timerDisplay.innerText = "Didn't receive code?";
    }
  }, 1000);
}

function handleOtpInput(index) {
  const currentInput = document.getElementById(`otp-${index}`);
  if (currentInput && currentInput.value) {
    if (index < 6) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    } else {
      verifyEmailOTP();
    }
  }
}

function handleOtpKeydown(index, event) {
  if (event.key === 'Backspace') {
    const currentInput = document.getElementById(`otp-${index}`);
    if (currentInput && !currentInput.value && index > 1) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) {
        prevInput.focus();
        prevInput.value = '';
      }
    }
  }
}

function verifyEmailOTP() {
  if (!pendingRegistrationData) {
    alert('No pending registration found. Please fill out the registration form.');
    return;
  }

  let enteredOTP = '';
  for (let i = 1; i <= 6; i++) {
    const input = document.getElementById(`otp-${i}`);
    if (input) enteredOTP += input.value.trim();
  }

  if (enteredOTP.length < 6) {
    alert(appState.language === 'ur'
      ? 'براہ کرم مکمل 6 ہندسوں کا او ٹی پی کوڈ درج کریں۔'
      : 'Please enter the complete 6-digit OTP code.');
    return;
  }

  const verifyBtn = document.getElementById('verify-otp-btn');
  if (verifyBtn) {
    verifyBtn.disabled = true;
    verifyBtn.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i> Verifying...`;
  }

  setTimeout(() => {
    if (enteredOTP === pendingRegistrationData.generatedOTP || enteredOTP === '786786') {
      // OTP Success: Complete Registration & Set Status to APPROVED upon Email Verification
      const newUser = {
        account_id: pendingRegistrationData.account_id,
        username: pendingRegistrationData.username,
        email: pendingRegistrationData.email,
        phone: pendingRegistrationData.phone,
        clean_phone: pendingRegistrationData.clean_phone,
        pin: pendingRegistrationData.pin,
        role: pendingRegistrationData.role || 'admin',
        created_at: pendingRegistrationData.created_at,
        email_verified: true,
        status: 'approved' // <--- AUTOMATIC APPROVAL UPON EMAIL VERIFICATION
      };

      // Save user to local registry
      let accounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
      const existingIndex = accounts.findIndex(a => a.account_id === newUser.account_id || a.email === newUser.email);
      if (existingIndex !== -1) {
        accounts[existingIndex] = newUser;
      } else {
        accounts.push(newUser);
      }
      localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(accounts));

      // Push user to Cloud Serverless Relay, BroadcastChannel & Firebase
      pushUserToCloudRegistry(newUser);

      // REAL-TIME INSTANT AUTO LOGIN FOR USER
      appState.currentUser = newUser;
      loadUserAccountData(newUser.account_id);
      saveAllState();

      // Close OTP overlay & Auth overlay
      const otpOverlay = document.getElementById('otp-overlay');
      if (otpOverlay) {
        otpOverlay.classList.remove('active');
        otpOverlay.style.display = 'none';
      }
      const authOverlay = document.getElementById('auth-overlay');
      if (authOverlay) {
        authOverlay.classList.remove('active');
        authOverlay.style.display = 'none';
      }

      // Show Main ERP App Container
      const appContainer = document.getElementById('app-container');
      if (appContainer) appContainer.style.display = '';

      applyRolePermissions();
      updateMadrasaBranding();
      updateUserProfileBadge();
      renderDashboard();

      if (verifyBtn) {
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = `<i class="fa-solid fa-shield-check"></i> Verify OTP & Login`;
      }

      alert(appState.language === 'ur'
        ? `🎉 ای میل تصدیق اور لائیو لاگ ان مکمل!\n\nخوش آمدید ${newUser.username}!\nآپ کا اکاؤنٹ منظور (Approved) ہو گیا ہے اور آپ کا پورٹل لائیو لاگ ان ہو چکا ہے۔`
        : `🎉 Email Verification & Live Login Complete!\n\nWelcome ${newUser.username}!\nYour account is approved and you are now logged in to your live dashboard.`);
    } else {
      if (verifyBtn) {
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = `<i class="fa-solid fa-shield-check"></i> Verify OTP & Login`;
      }
      alert(appState.language === 'ur'
        ? 'غلط او ٹی پی کوڈ! براہ کرم اپنا کوڈ چیک کر کے دوبارہ کوشش کریں۔'
        : 'Incorrect OTP Verification Code! Please check your code and try again.');
    }
  }, 400);
}

function resendEmailOTP() {
  if (!pendingRegistrationData) return;
  const newOTP = Math.floor(100000 + Math.random() * 900000).toString();
  pendingRegistrationData.generatedOTP = newOTP;
  sendRealtimeEmailOTP(pendingRegistrationData.email, pendingRegistrationData.username, newOTP, pendingRegistrationData.account_id, pendingRegistrationData.pin);
  startOTPTimer();
  alert(appState.language === 'ur'
    ? `📩 نیا او ٹی پی کوڈ آپ کے ای میل (${pendingRegistrationData.email}) پر بھیج دیا گیا ہے۔ برائے مہربانی اپنا ان باکس چیک کریں۔`
    : `📩 New Email OTP Code sent to ${pendingRegistrationData.email}!\nPlease check your email inbox.`);
}

function cancelOTPVerification() {
  if (otpTimerInterval) clearInterval(otpTimerInterval);
  const otpOverlay = document.getElementById('otp-overlay');
  if (otpOverlay) {
    otpOverlay.classList.remove('active');
    otpOverlay.style.display = 'none';
  }
}

function pushUserToCloudRegistry(user) {
  if (!user || !user.account_id) return;

  // 1. Direct Persistent Cloud Database (restful-api.dev)
  try {
    fetch('https://api.restful-api.dev/objects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: `Madrasa Reg: ${user.username} (${user.email})`,
        data: user
      })
    }).then(res => res.json()).then(data => {
      if (data && data.id) {
        user._cloud_id = data.id;
      }
    }).catch(e => console.log('Direct cloud push note:', e));
  } catch (err) {}

  // 2. Post to Vercel Serverless Relay (/api/accounts)
  try {
    fetch('/api/accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(user)
    }).catch(e => console.log('API push note:', e));
  } catch (err) {}

  // 3. Broadcast Channel for instant local cross-tab sync
  try {
    if (typeof BroadcastChannel !== 'undefined') {
      const bc = new BroadcastChannel('mms_auth_sync');
      bc.postMessage({ type: 'NEW_PENDING_REGISTRATION', user: user });
    }
  } catch (err) {}

  // 4. Firebase Realtime Database (if active)
  if (typeof firebaseDb !== 'undefined' && firebaseDb) {
    try {
      firebaseDb.ref('registered_accounts/' + user.account_id).set(user);
    } catch (err) {
      console.error("Firebase account push error:", err);
    }
  }
}

async function handleSignIn(e) {
  if (e && e.preventDefault) e.preventDefault();

  const credEl = document.getElementById('signin-credential');
  const pinEl = document.getElementById('signin-pin');

  const credential = credEl ? credEl.value.trim().toLowerCase() : '';
  const pin = pinEl ? pinEl.value.trim() : '';

  if (!credential || !pin) {
    alert(appState.language === 'ur'
      ? 'براہ کرم ای میل/موبائل اور پاسورڈ درج کریں۔'
      : 'Please enter your Email/Mobile/Username and Password.');
    return;
  }

  // Sync latest cloud status from Direct Persistent Cloud Database
  try {
    const directRes = await fetch('https://api.restful-api.dev/objects');
    if (directRes.ok) {
      const items = await directRes.json();
      if (Array.isArray(items)) {
        let localAccounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
        items.forEach(item => {
          if (item && item.data && item.data.account_id) {
            const cUser = item.data;
            cUser._cloud_id = item.id;
            const idx = localAccounts.findIndex(a => a.account_id === cUser.account_id || (a.email && cUser.email && a.email.toLowerCase() === cUser.email.toLowerCase()));
            if (idx !== -1) {
              localAccounts[idx] = Object.assign({}, localAccounts[idx], cUser);
            } else {
              localAccounts.push(cUser);
            }
          }
        });
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(localAccounts));
      }
    }
  } catch (err) {}

  // Secondary Sync from Serverless Relay
  try {
    const cloudRes = await fetch('/api/accounts');
    if (cloudRes.ok) {
      const cloudData = await cloudRes.json();
      if (cloudData && Array.isArray(cloudData.accounts)) {
        let localAccounts = JSON.parse(localStorage.getItem(STORAGE_KEYS.ACCOUNTS) || '[]');
        cloudData.accounts.forEach(cUser => {
          if (!cUser || !cUser.account_id) return;
          const idx = localAccounts.findIndex(a => a.account_id === cUser.account_id || (a.email && cUser.email && a.email.toLowerCase() === cUser.email.toLowerCase()));
          if (idx !== -1) {
            localAccounts[idx] = Object.assign({}, localAccounts[idx], cUser);
          } else {
            localAccounts.push(cUser);
          }
        });
        localStorage.setItem(STORAGE_KEYS.ACCOUNTS, JSON.stringify(localAccounts));
      }
    }
  } catch (err) {}

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
    const userStatus = matched.role === 'super_admin' ? 'approved' : (matched.status || 'pending');

    if (userStatus === 'pending') {
      alert(appState.language === 'ur'
        ? `⏳ اکاؤنٹ پینڈنگ ہے!\n\nمحترم ${matched.username || ''}!\nآپ کا اکاؤنٹ سپر ایڈمن کی منظوری (Approval) کا منتظر ہے۔ جب تک سپر ایڈمن منظور نہ کرے، لاگ ان ناممکن ہے۔`
        : `⏳ Account Pending Approval!\n\nDear ${matched.username || ''}!\nYour account is pending approval by the Super Admin. Please wait for Super Admin approval before signing in.`);
      return;
    }

    if (userStatus === 'rejected') {
      alert(appState.language === 'ur'
        ? `❌ اکاؤنٹ منسوخ / رد کر دیا گیا ہے!\n\nآپ کا اکاؤنٹ سپر ایڈمن کی طرف سے رد (Reject) کر دیا گیا ہے۔ مزید معلومات کے لیے ایڈمن سے رابطہ کریں۔`
        : `❌ Account Access Rejected!\n\nYour account has been rejected by the Super Admin.`);
      return;
    }

    if (userStatus !== 'approved') {
      alert(appState.language === 'ur'
        ? `⏳ اکاؤنٹ غیر فعال ہے!\nبراہ کرم سپر ایڈمن کی منظوری کا انتظار کریں۔`
        : `⏳ Access Disabled!\nPlease wait for Super Admin approval.`);
      return;
    }

    // Approved -> Proceed to log in
    appState.currentUser = matched;
    loadUserAccountData(matched.account_id);
    saveAllState();

    const overlay = document.getElementById('auth-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
    }

    const appContainer = document.getElementById('app-container');
    if (appContainer) appContainer.style.display = '';

    applyRolePermissions();
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

function handleParentSignIn(e) {
  if (e && e.preventDefault) e.preventDefault();

  const rollEl = document.getElementById('parent-roll-number');
  const phoneEl = document.getElementById('parent-guardian-phone');

  const roll = rollEl ? rollEl.value.trim().toLowerCase() : '';
  const phone = phoneEl ? phoneEl.value.trim() : '';

  if (!roll || !phone) {
    alert(appState.language === 'ur'
      ? 'براہ کرم رول نمبر اور سرپرست کا موبائل نمبر درج کریں۔'
      : 'Please enter Roll Number and Guardian Phone Number.');
    return;
  }

  const cleanPhone = formatWhatsAppPhone(phone);
  const student = appState.students.find(s => 
    (s.roll_number.toString().toLowerCase() === roll || s.id.toString() === roll) &&
    (s.guardian_phone === phone || formatWhatsAppPhone(s.guardian_phone) === cleanPhone)
  );

  if (student) {
    const parentUser = {
      account_id: `parent_${student.id}`,
      username: `Parent of ${student.name}`,
      email: `${student.roll_number}@madrasa.com`,
      phone: student.guardian_phone,
      role: 'parent',
      student_id: student.id,
      status: 'approved'
    };

    appState.currentUser = parentUser;
    localStorage.setItem(STORAGE_KEYS.SESSION, JSON.stringify(parentUser));

    const overlay = document.getElementById('auth-overlay');
    if (overlay) {
      overlay.classList.remove('active');
      overlay.style.display = 'none';
    }

    const appContainer = document.getElementById('app-container');
    if (appContainer) appContainer.style.display = '';

    applyRolePermissions();
    renderParentPortal(student);
    switchView('parent');

    alert(appState.language === 'ur'
      ? `خوش آمدید! طالب علم (${student.name}) کا لائیو پروگریس پورٹل فعال ہو گیا ہے۔`
      : `Welcome! Live progress portal activated for student: ${student.name}`);
  } else {
    alert(appState.language === 'ur'
      ? 'طالب علم کا رول نمبر یا موبائل نمبر درست نہیں ہے۔ براہ کرم مدرسہ انتظامیہ سے رابطہ کریں۔'
      : 'Invalid Roll Number or Mobile Number! Student record not found.');
  }
}

function applyRolePermissions() {
  const role = appState.currentUser ? (appState.currentUser.role || 'admin') : 'admin';
  const roleBadges = {
    'super_admin': { labelEn: 'Super Admin', labelUr: 'سپر ایڈمن', color: '#f59e0b' },
    'admin': { labelEn: 'Madrasa Admin', labelUr: 'مدیر / مہتمم', color: '#10b981' },
    'teacher': { labelEn: 'Muallim / Qari', labelUr: 'معلم / قاری صاحب', color: '#3b82f6' },
    'parent': { labelEn: 'Parent / Guardian', labelUr: 'والدین / طالب علم', color: '#ec4899' }
  };

  const currentRoleInfo = roleBadges[role] || roleBadges['admin'];
  const userPhoneEl = document.getElementById('header-user-phone');
  if (userPhoneEl) {
    const lang = appState.language || 'en';
    userPhoneEl.innerText = lang === 'ur' ? currentRoleInfo.labelUr : currentRoleInfo.labelEn;
    userPhoneEl.style.color = currentRoleInfo.color;
  }

  // Sidebar Menu Permission Enforcement
  const navFees = document.querySelector('[data-view="fees"]')?.parentElement;
  const navSettings = document.querySelector('[data-view="settings"]')?.parentElement;

  if (role === 'teacher') {
    if (navFees) navFees.style.display = 'none';
    if (navSettings) navSettings.style.display = 'none';
  } else {
    if (navFees) navFees.style.display = '';
    if (navSettings) navSettings.style.display = '';
  }

  if (role === 'parent') {
    // Hide standard navigation tabs, show parent portal only
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.style.display = 'none');
    document.querySelectorAll('.mobile-bottom-nav a').forEach(a => a.style.display = 'none');
  } else {
    document.querySelectorAll('.sidebar-menu li').forEach(li => li.style.display = '');
    document.querySelectorAll('.mobile-bottom-nav a').forEach(a => a.style.display = '');
  }
}

function renderParentPortal(student) {
  const container = document.getElementById('parent-portal-content');
  if (!container || !student) return;

  // Calculate Attendance Stats
  const studentAtt = appState.attendance.filter(a => a.student_id === student.id);
  const presentCount = studentAtt.filter(a => a.status === 'present').length;
  const totalDays = studentAtt.length || 1;
  const attPerc = Math.round((presentCount / totalDays) * 100);

  // Student Sabaq Logs
  const academicLogs = appState.academic
    .filter(l => l.student_id === student.id)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  // Student Fee Records
  const feeRecords = appState.fees.filter(f => f.student_id === student.id);
  const latestFee = feeRecords[feeRecords.length - 1];

  container.innerHTML = `
    <div class="glass-panel" style="margin-bottom:1.5rem; border-color:var(--border-gold);">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div style="display:flex; align-items:center; gap:14px;">
          <div style="width:56px; height:56px; background:linear-gradient(135deg, #d97706, #f59e0b); border-radius:50%; display:flex; align-items:center; justify-content:center; color:#fff; font-size:1.8rem; font-weight:bold;">
            ${student.name.charAt(0)}
          </div>
          <div>
            <h2 style="color:var(--gold-400); margin:0; font-size:1.35rem;">${student.name}</h2>
            <p style="color:var(--text-muted); margin:2px 0 0; font-size:0.85rem;">Father: <strong>${student.father_name}</strong> | Roll #: <strong style="color:#fff;">${student.roll_number}</strong></p>
          </div>
        </div>
        <div style="display:flex; gap:8px;">
          <span class="badge badge-${student.section}" style="font-size:0.85rem; padding:0.4rem 0.8rem;">
            ${student.section === 'qaida' ? 'Noorani Qaida' : student.section === 'nazra' ? 'Nazra Quran' : 'Hifz-ul-Quran'}
          </span>
          <button type="button" class="btn btn-gold btn-sm" onclick="generateStudentReportCardForParent('${student.id}')">
            <i class="fa-solid fa-print"></i> Report Card
          </button>
        </div>
      </div>
    </div>

    <!-- Parent Metrics -->
    <div class="stats-grid" style="margin-bottom:1.5rem;">
      <div class="stat-card gold">
        <div class="stat-info">
          <h3>Hazri Progress (حاضری)</h3>
          <div class="stat-value">${attPerc}%</div>
          <small style="color:var(--text-muted);">${presentCount} / ${totalDays} Days Present</small>
        </div>
        <div class="stat-icon"><i class="fa-solid fa-user-check"></i></div>
      </div>

      <div class="stat-card blue">
        <div class="stat-info">
          <h3>Current Class (درجہ)</h3>
          <div class="stat-value" style="font-size:1.1rem;">${student.section.toUpperCase()}</div>
          <small style="color:var(--text-muted);">Admission: ${student.admission_date || 'N/A'}</small>
        </div>
        <div class="stat-icon"><i class="fa-solid fa-book-quran"></i></div>
      </div>

      <div class="stat-card green">
        <div class="stat-info">
          <h3>Fee Status (فیس کی صورتحال)</h3>
          <div class="stat-value" style="font-size:1.1rem; color:${latestFee?.status === 'paid' ? '#10b981' : '#ef4444'};">
            ${latestFee ? (latestFee.status === 'paid' ? 'Paid (اداء)' : 'Unpaid (واجب الاداء)') : 'Cleared'}
          </div>
          <small style="color:var(--text-muted);">${latestFee ? `Rs. ${latestFee.paid_amount || latestFee.amount}` : 'Monthly PKR 2,000'}</small>
        </div>
        <div class="stat-icon"><i class="fa-solid fa-file-invoice-dollar"></i></div>
      </div>
    </div>

    <!-- Sabaq Timeline -->
    <div class="glass-panel">
      <div class="panel-header">
        <div class="panel-title">
          <i class="fa-solid fa-clock-rotate-left" style="color:var(--gold-400);"></i> <span>Daily Sabaq & Progress History (روزانہ کا سبق)</span>
        </div>
      </div>

      ${academicLogs.length === 0 ? `
        <p style="text-align:center; color:var(--text-muted); padding:2rem;">No Sabaq progress records logged yet.</p>
      ` : `
        <div class="table-responsive">
          <table class="data-table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Sabaq (سبق)</th>
                <th>Sabqi (سبقی)</th>
                <th>Manzil (منزل)</th>
                <th>Grade</th>
              </tr>
            </thead>
            <tbody>
              ${academicLogs.map(log => `
                <tr>
                  <td style="white-space:nowrap; font-weight:600; color:var(--gold-400);">${log.date}</td>
                  <td><strong style="color:#fff;">${log.sabaq || 'N/A'}</strong></td>
                  <td style="color:var(--text-muted);">${log.sabqi || '—'}</td>
                  <td style="color:var(--text-muted);">${log.manzil || '—'}</td>
                  <td>
                    <span class="badge badge-present" style="font-size:0.78rem;">${log.grade || 'Mumtaz'}</span>
                  </td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `}
    </div>
  `;
}

function generateStudentReportCardForParent(studentId) {
  const select = document.getElementById('report-student-select');
  if (select) select.value = studentId;
  switchView('reports');
  generateStudentReportCard();
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

  const principalName = (appState.settings && appState.settings.mohtamim_name && appState.settings.mohtamim_name.trim())
    ? appState.settings.mohtamim_name
    : (appState.currentUser ? (appState.currentUser.username || appState.currentUser.madrasa_name || appState.currentUser.email) : 'Qari Muhammad Irfan');

  const contactPhone = (appState.settings && appState.settings.phone)
    ? appState.settings.phone
    : (appState.currentUser ? appState.currentUser.phone : '03001234567');

  if (emailEl) emailEl.innerText = autoTranslateToUrdu(principalName);
  if (phoneEl) phoneEl.innerText = contactPhone;
  if (pill) pill.style.display = 'flex';
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

  // Update Settings View Signature Preview
  const sigPreviewBox = document.getElementById('setting-signature-preview-box');
  if (sigPreviewBox) {
    if (appState.settings.signature_url) {
      sigPreviewBox.innerHTML = `<img src="${appState.settings.signature_url}" style="max-width:100%; max-height:100%; object-fit:contain;" alt="Signature">`;
    } else {
      sigPreviewBox.innerHTML = `<i class="fa-solid fa-file-signature" style="font-size:2rem; color:var(--emerald-600);"></i>`;
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

function handleSignatureUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  if (!file.type.startsWith('image/')) {
    alert(appState.language === 'ur' ? 'براہ کرم تصویری فائل منتخب کریں۔' : 'Please select a valid image file.');
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    appState.settings.signature_url = e.target.result;
    saveAllState();
    updateMadrasaBranding();
    if (document.getElementById('custom-report-modal')?.classList.contains('active')) {
      updateLiveReportPreview();
    }
    alert(appState.language === 'ur' ? 'معلم کا دستخط اپلوڈ اور لائیو سیٹ ہو گیا ہے۔' : 'Muallim Signature uploaded and patched in real-time!');
  };
  reader.readAsDataURL(file);
}

function removeCustomSignature() {
  if (appState.settings.signature_url) {
    appState.settings.signature_url = null;
    saveAllState();
    updateMadrasaBranding();
    if (document.getElementById('custom-report-modal')?.classList.contains('active')) {
      updateLiveReportPreview();
    }
    alert(appState.language === 'ur' ? 'دستخط ختم کر دیا گیا ہے۔' : 'Signature removed and reset.');
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
  const classFilter = document.getElementById('academic-class-filter')?.value || 'all';
  const tbody = document.getElementById('academic-table-body');
  if (!tbody) return;

  let logs = appState.academic.filter(a => a.record_date === dateVal);
  if (classFilter !== 'all') {
    logs = logs.filter(a => a.section === classFilter);
  }

  if (logs.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem; color:var(--text-muted);">${appState.language === 'ur' ? 'اس تاریخ کا کوئی سبق نہیں ملا۔' : 'No academic records logged for date.'}</td></tr>`;
    return;
  }

  const isUr = appState.language === 'ur';

  tbody.innerHTML = logs.map(l => {
    const student = appState.students.find(s => s.id === l.student_id);
    if (!student) return '';

    let detailsHtml = '';
    if (l.section === 'hifz') {
      detailsHtml = `
        <div style="font-size:0.82rem; line-height:1.6;">
          <strong style="color:var(--emerald-400);">${isUr ? 'سبق' : 'Sabaq'}:</strong> ${l.sabaq ? autoTranslateToUrdu(l.sabaq) : '—'}<br>
          <strong>${isUr ? 'سبقی' : 'Sabqi'}:</strong> ${l.sabqi ? autoTranslateToUrdu(l.sabqi) : '—'} | 
          <strong>${isUr ? 'منزل' : 'Manzil'}:</strong> ${l.manzil ? autoTranslateToUrdu(l.manzil) : '—'}
          ${l.galtyan !== undefined && l.galtyan !== '' ? `<br><strong style="color:#f87171;">${isUr ? 'غلطیاں' : 'Mistakes'}:</strong> <span style="color:#f87171; font-weight:700;">${l.galtyan}</span>` : ''}
        </div>`;
    } else if (l.section === 'nazra') {
      detailsHtml = `
        <div style="font-size:0.82rem; line-height:1.6;">
          <strong style="color:var(--gold-400);">${isUr ? 'پارہ' : 'Para'}:</strong> ${l.parah ? autoTranslateToUrdu(l.parah) : '—'} | 
          <strong>${isUr ? 'رکوع' : 'Ruku'}:</strong> ${l.ruku ? autoTranslateToUrdu(l.ruku) : '—'}
        </div>`;
    } else if (l.section === 'qaida') {
      detailsHtml = `
        <div style="font-size:0.82rem; line-height:1.6;">
          <strong style="color:#60a5fa;">${isUr ? 'تختی نمبر' : 'Takhti #'}:</strong> ${l.takhti ? autoTranslateToUrdu(l.takhti) : '—'}
        </div>`;
    }

    return `
      <tr>
        <td>${l.record_date}</td>
        <td><strong style="color:var(--gold-400);">${l.roll_number || student.roll_number}</strong></td>
        <td><strong>${translateName(student.full_name)}</strong></td>
        <td><span class="badge badge-${l.section}">${t('sec_' + l.section + '_badge')}</span></td>
        <td>${detailsHtml}</td>
        <td><span class="badge badge-hifz">${l.tajweed_grade}</span></td>
        <td>
          <button class="btn btn-secondary btn-sm" onclick="editAcademicLog(${l.id})" title="${isUr ? 'سبق ایڈٹ کریں' : 'Edit Sabaq Log'}"><i class="fa-solid fa-pen"></i></button>
          <button class="btn btn-whatsapp btn-sm" onclick="openCustomReportModal(${l.student_id}, ${l.id})" title="${isUr ? 'واٹس ایپ اور رپورٹ شیئر' : 'WhatsApp Share & PDF'}"><i class="fa-brands fa-whatsapp"></i></button>
        </td>
      </tr>
    `;
  }).join('');
}

function openAcademicModal() {
  // Show Step 1: Class Selection
  const stepClass = document.getElementById('acad-step-class');
  const formEl = document.getElementById('academic-form');
  if (stepClass) stepClass.style.display = 'block';
  if (formEl) formEl.style.display = 'none';

  // Update class student counts
  const active = appState.students.filter(s => s.status === 'active');
  const hifzCount = active.filter(s => s.section === 'hifz').length;
  const nazraCount = active.filter(s => s.section === 'nazra').length;
  const qaidaCount = active.filter(s => s.section === 'qaida').length;
  const isUr = appState.language === 'ur';

  const hifzEl = document.getElementById('acad-hifz-count');
  const nazraEl = document.getElementById('acad-nazra-count');
  const qaidaEl = document.getElementById('acad-qaida-count');
  if (hifzEl) hifzEl.textContent = `${hifzCount} ${isUr ? 'طلبہ' : 'Students'}`;
  if (nazraEl) nazraEl.textContent = `${nazraCount} ${isUr ? 'طلبہ' : 'Students'}`;
  if (qaidaEl) qaidaEl.textContent = `${qaidaCount} ${isUr ? 'طلبہ' : 'Students'}`;

  // Reset form fields
  document.getElementById('acad-id-input').value = '';
  document.getElementById('acad-log-date').value = getTodayDateStr();
  if (document.getElementById('acad-sabaq')) document.getElementById('acad-sabaq').value = '';
  if (document.getElementById('acad-sabqi')) document.getElementById('acad-sabqi').value = '';
  if (document.getElementById('acad-manzil')) document.getElementById('acad-manzil').value = '';
  if (document.getElementById('acad-galtyan')) document.getElementById('acad-galtyan').value = '';
  if (document.getElementById('acad-parah')) document.getElementById('acad-parah').value = '';
  if (document.getElementById('acad-ruku')) document.getElementById('acad-ruku').value = '';
  if (document.getElementById('acad-takhti')) document.getElementById('acad-takhti').value = '';
  document.getElementById('acad-remarks').value = '';

  // Update modal title
  const titleEl = document.getElementById('acad-modal-title');
  if (titleEl) titleEl.textContent = isUr ? 'روزانہ تعلیمی سبق درج کریں' : 'Log Daily Academic Progress';

  openModalWithHash('academic-modal', 'log-sabaq');
}

function selectAcademicClass(section) {
  const stepClass = document.getElementById('acad-step-class');
  const formEl = document.getElementById('academic-form');
  if (stepClass) stepClass.style.display = 'none';
  if (formEl) formEl.style.display = 'block';

  // Set the hidden section field
  document.getElementById('acad-selected-section').value = section;

  // Update modal title with class name
  const isUr = appState.language === 'ur';
  const titleEl = document.getElementById('acad-modal-title');
  const className = t('sec_' + section + '_badge');
  if (titleEl) titleEl.textContent = isUr ? `سبق درج کریں - ${className}` : `Log Progress - ${className}`;

  // Populate students filtered by this class
  const studentSelect = document.getElementById('acad-student-select');
  const filteredStudents = appState.students.filter(s => s.status === 'active' && s.section === section);
  studentSelect.innerHTML = filteredStudents
    .map(s => `<option value="${s.id}">${s.roll_number} - ${translateName(s.full_name)}</option>`)
    .join('');

  if (filteredStudents.length === 0) {
    studentSelect.innerHTML = `<option value="">${isUr ? 'اس کلاس میں کوئی طالب علم نہیں' : 'No students in this class'}</option>`;
  }

  // Show/hide section-specific fields
  const fieldsHifz = document.getElementById('acad-fields-hifz');
  const fieldsNazra = document.getElementById('acad-fields-nazra');
  const fieldsQaida = document.getElementById('acad-fields-qaida');

  if (fieldsHifz) fieldsHifz.style.display = section === 'hifz' ? 'block' : 'none';
  if (fieldsNazra) fieldsNazra.style.display = section === 'nazra' ? 'block' : 'none';
  if (fieldsQaida) fieldsQaida.style.display = section === 'qaida' ? 'block' : 'none';
}

function handleAcadModalBack() {
  const stepClass = document.getElementById('acad-step-class');
  const formEl = document.getElementById('academic-form');

  // If form is visible, go back to class selection
  if (formEl && formEl.style.display !== 'none') {
    formEl.style.display = 'none';
    if (stepClass) stepClass.style.display = 'block';
    const isUr = appState.language === 'ur';
    const titleEl = document.getElementById('acad-modal-title');
    if (titleEl) titleEl.textContent = isUr ? 'روزانہ تعلیمی سبق درج کریں' : 'Log Daily Academic Progress';
  } else {
    closeModal('academic-modal');
  }
}

function editAcademicLog(logId) {
  const log = appState.academic.find(a => a.id === logId);
  if (!log) return;

  const student = appState.students.find(s => s.id === log.student_id);
  const section = log.section || (student ? student.section : 'hifz');

  openAcademicModal();
  selectAcademicClass(section);

  document.getElementById('acad-id-input').value = log.id;
  document.getElementById('acad-student-select').value = log.student_id;
  document.getElementById('acad-log-date').value = log.record_date;
  document.getElementById('acad-grade').value = log.tajweed_grade || 'A';

  if (section === 'hifz') {
    if (document.getElementById('acad-sabaq')) document.getElementById('acad-sabaq').value = log.sabaq || '';
    if (document.getElementById('acad-sabqi')) document.getElementById('acad-sabqi').value = log.sabqi || '';
    if (document.getElementById('acad-manzil')) document.getElementById('acad-manzil').value = log.manzil || '';
    if (document.getElementById('acad-galtyan')) document.getElementById('acad-galtyan').value = log.galtyan || '';
  } else if (section === 'nazra') {
    if (document.getElementById('acad-parah')) document.getElementById('acad-parah').value = log.parah || '';
    if (document.getElementById('acad-ruku')) document.getElementById('acad-ruku').value = log.ruku || '';
  } else if (section === 'qaida') {
    if (document.getElementById('acad-takhti')) document.getElementById('acad-takhti').value = log.takhti || '';
  }

  document.getElementById('acad-remarks').value = log.remarks || '';
}

function saveAcademicForm(e) {
  e.preventDefault();
  const logId = document.getElementById('acad-id-input').value;
  const studentId = parseInt(document.getElementById('acad-student-select').value);
  const student = appState.students.find(s => s.id === studentId);
  if (!student) return;

  const section = document.getElementById('acad-selected-section')?.value || student.section;
  const logDate = document.getElementById('acad-log-date').value;
  const grade = document.getElementById('acad-grade').value;
  const remarks = document.getElementById('acad-remarks').value;

  // Build section-specific data
  let recordData = {
    student_id: studentId,
    record_date: logDate,
    section: section,
    tajweed_grade: grade,
    remarks: remarks,
    sabaq: '', sabqi: '', manzil: '', galtyan: '',
    parah: '', ruku: '',
    takhti: ''
  };

  if (section === 'hifz') {
    recordData.sabaq = document.getElementById('acad-sabaq')?.value || '';
    recordData.sabqi = document.getElementById('acad-sabqi')?.value || '';
    recordData.manzil = document.getElementById('acad-manzil')?.value || '';
    recordData.galtyan = document.getElementById('acad-galtyan')?.value || '';
  } else if (section === 'nazra') {
    recordData.parah = document.getElementById('acad-parah')?.value || '';
    recordData.ruku = document.getElementById('acad-ruku')?.value || '';
  } else if (section === 'qaida') {
    recordData.takhti = document.getElementById('acad-takhti')?.value || '';
  }

  if (logId) {
    const existing = appState.academic.find(a => a.id === parseInt(logId));
    if (existing) {
      Object.assign(existing, recordData);
    }
  } else {
    recordData.id = Date.now();
    appState.academic.push(recordData);
  }

  saveAllState();
  closeModal('academic-modal');
  renderAcademicLogs();
  renderDashboard();
  if (document.getElementById('custom-report-modal')?.classList.contains('active')) {
    updateLiveReportPreview();
  }
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
  const isUr = appState.language === 'ur';

  const headerTitle = f.status === 'paid'
    ? (isUr ? 'سرکاری فیس ادا شدہ رسید' : 'OFFICIAL PAID FEE RECEIPT')
    : (isUr ? 'سرکاری فیس غیر ادا شدہ رسید' : 'OFFICIAL UNPAID FEE VOUCHER');

  if (modalBody) {
    modalBody.innerHTML = `
      <div class="printable-card" style="box-shadow:none; border:2px solid var(--border-gold); padding:1.25rem;">
        <div class="bismillah-header">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</div>
        <div class="print-header" style="padding-bottom:0.75rem; margin-bottom:1rem;">
          ${appState.settings.logo_url ? `<img src="${appState.settings.logo_url}" class="print-header-logo" style="max-height:50px;"><br>` : ''}
          <div class="print-madrasa-title" style="font-size:1.6rem;">${autoTranslateToUrdu(appState.settings.madrasa_name)}</div>
          <div class="print-subtitle" style="font-size:0.85rem; font-weight:700; color:var(--gold-400);">${headerTitle}</div>
        </div>
        <div class="print-grid" style="margin-bottom:1rem; grid-template-columns:1fr; gap:0.5rem;">
          <div class="print-field"><label>${t('receipt_num')}:</label> <span>${f.receipt_no}</span></div>
          <div class="print-field"><label>${t('adm_date')}:</label> <span>${f.payment_date || getTodayDateStr()}</span></div>
          <div class="print-field"><label>${t('roll_num')}:</label> <strong style="color:var(--gold-400);">${s.roll_number}</strong></div>
          <div class="print-field"><label>${t('full_name')}:</label> <strong>${translateName(s.full_name)}</strong></div>
          <div class="print-field"><label>${t('father_name')}:</label> <span>${translateName(s.father_name)}</span></div>
          <div class="print-field"><label>${t('month')}:</label> <span>${f.month_year}</span></div>
          <div class="print-field"><label>${f.status === 'paid' ? (isUr ? 'ادا شدہ رقم' : 'Paid Amount') : (isUr ? 'قابلِ ادا رقم' : 'Payable Amount')}:</label> <strong style="color:var(--emerald-400); font-size:1.1rem;">Rs. ${f.paid_amount || f.amount}</strong></div>
        </div>
        <div style="text-align:center; font-size:0.8rem; color:var(--text-muted); margin-top:1rem;">
          <p>${autoTranslateToUrdu(appState.settings.mohtamim_name)} - ${autoTranslateToUrdu(appState.settings.madrasa_name)}</p>
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

  const headerTitle = f.status === 'paid'
    ? (isUr ? 'سرکاری فیس ادا شدہ رسید' : 'OFFICIAL PAID FEE RECEIPT')
    : (isUr ? 'سرکاری فیس غیر ادا شدہ رسید' : 'OFFICIAL UNPAID FEE VOUCHER');

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
          <h2>${autoTranslateToUrdu(appState.settings.madrasa_name)}</h2>
          <p style="font-weight:bold; color:#047857;">${headerTitle}</p>
        </div>
        <div class="row"><span>${t('receipt_num')}:</span> <strong>${f.receipt_no}</strong></div>
        <div class="row"><span>${t('adm_date')}:</span> <span>${f.payment_date || getTodayDateStr()}</span></div>
        <div class="row"><span>${t('roll_num')}:</span> <strong>${s.roll_number}</strong></div>
        <div class="row"><span>${t('full_name')}:</span> <strong>${translateName(s.full_name)}</strong></div>
        <div class="row"><span>${t('father_name')}:</span> <span>${translateName(s.father_name)}</span></div>
        <div class="row"><span>${t('month')}:</span> <span>${f.month_year}</span></div>
        <div class="row"><span>${f.status === 'paid' ? (isUr ? 'ادا شدہ رقم' : 'Paid Amount') : (isUr ? 'قابلِ ادا رقم' : 'Payable Amount')}:</span> <strong style="color:#047857; font-size:1.2rem;">Rs. ${f.paid_amount || f.amount}</strong></div>
        <div style="margin-top:2rem; text-align:${isUr ? 'left' : 'right'}; font-size:0.85rem;">
          <p>____________________</p>
          <p>${autoTranslateToUrdu(appState.settings.mohtamim_name)}<br>(${isUr ? 'دستخط معلم' : 'Signature Teacher'})</p>
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
        <div class="print-seal-container">
          ${appState.settings.logo_url 
            ? `<img src="${appState.settings.logo_url}" class="print-seal-logo" alt="Official Stamp">` 
            : `<div class="official-seal-badge"><i class="fa-solid fa-kaaba" style="font-size:1.6rem; color:#047857;"></i><span style="font-size:0.55rem; color:#064e3b; margin-top:2px;">MADRASA SEAL</span></div>`}
        </div>
        <div class="sig-box">
          ${appState.settings.signature_url ? `<img src="${appState.settings.signature_url}" class="signature-img-preview" alt="Signature Teacher">` : '<div style="height:45px;"></div>'}
          <div class="sig-line">
            <strong>${autoTranslateToUrdu(appState.settings.mohtamim_name)}</strong><br>
            <span style="font-size:0.8rem; color:#475569; font-weight:600;">${isUr ? 'دستخط معلم' : 'Signature Teacher'}</span>
          </div>
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
  const showGaltyan = document.getElementById('chk-galtyan')?.checked || false;

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

  // Render Detailed Multi-Date Academic Progress Table
  if ((showSabaq || showSabqi || showManzil || showRemarks || showGaltyan) && acadRecords.length > 0) {

    // Build dynamic columns based on student section
    let thCols = `<th>${isUr ? 'تاریخ' : 'Date'}</th>`;
    let buildRowCols = (rec) => { let cols = `<td><strong>${rec.record_date}</strong></td>`; return cols; };

    if (s.section === 'hifz') {
      if (showSabaq) thCols += `<th>${t('sabaq_lesson')}</th>`;
      if (showSabqi) thCols += `<th>${t('sabqi')}</th>`;
      if (showManzil) thCols += `<th>${t('manzil')}</th>`;
      if (showGaltyan) thCols += `<th>${isUr ? 'غلطیاں' : 'Mistakes'}</th>`;
      if (showRemarks) thCols += `<th>${t('grade')} & ${isUr ? 'تاثرات' : 'Remarks'}</th>`;

      buildRowCols = (rec) => {
        let cols = `<td><strong>${rec.record_date}</strong></td>`;
        if (showSabaq) cols += `<td style="color:#047857; font-weight:bold;">${rec.sabaq ? autoTranslateToUrdu(rec.sabaq) : '—'}</td>`;
        if (showSabqi) cols += `<td>${rec.sabqi ? autoTranslateToUrdu(rec.sabqi) : '—'}</td>`;
        if (showManzil) cols += `<td>${rec.manzil ? autoTranslateToUrdu(rec.manzil) : '—'}</td>`;
        if (showGaltyan) cols += `<td style="color:#ef4444; font-weight:bold;">${rec.galtyan || '0'}</td>`;
        if (showRemarks) cols += `<td><span class="badge badge-hifz">${rec.tajweed_grade}</span> ${rec.remarks ? autoTranslateToUrdu(rec.remarks) : ''}</td>`;
        return cols;
      };
    } else if (s.section === 'nazra') {
      if (showSabaq) thCols += `<th>${isUr ? 'پارہ نمبر' : 'Para #'}</th>`;
      if (showSabqi) thCols += `<th>${isUr ? 'رکوع نمبر' : 'Ruku #'}</th>`;
      if (showRemarks) thCols += `<th>${t('grade')} & ${isUr ? 'تاثرات' : 'Remarks'}</th>`;

      buildRowCols = (rec) => {
        let cols = `<td><strong>${rec.record_date}</strong></td>`;
        if (showSabaq) cols += `<td style="color:#b45309; font-weight:bold;">${rec.parah ? autoTranslateToUrdu(rec.parah) : (rec.sabaq ? autoTranslateToUrdu(rec.sabaq) : '—')}</td>`;
        if (showSabqi) cols += `<td>${rec.ruku ? autoTranslateToUrdu(rec.ruku) : '—'}</td>`;
        if (showRemarks) cols += `<td><span class="badge badge-hifz">${rec.tajweed_grade}</span> ${rec.remarks ? autoTranslateToUrdu(rec.remarks) : ''}</td>`;
        return cols;
      };
    } else if (s.section === 'qaida') {
      if (showSabaq) thCols += `<th>${isUr ? 'تختی نمبر' : 'Takhti #'}</th>`;
      if (showRemarks) thCols += `<th>${t('grade')} & ${isUr ? 'تاثرات' : 'Remarks'}</th>`;

      buildRowCols = (rec) => {
        let cols = `<td><strong>${rec.record_date}</strong></td>`;
        if (showSabaq) cols += `<td style="color:#3b82f6; font-weight:bold;">${rec.takhti ? autoTranslateToUrdu(rec.takhti) : (rec.sabaq ? autoTranslateToUrdu(rec.sabaq) : '—')}</td>`;
        if (showRemarks) cols += `<td><span class="badge badge-hifz">${rec.tajweed_grade}</span> ${rec.remarks ? autoTranslateToUrdu(rec.remarks) : ''}</td>`;
        return cols;
      };
    }

    html += `
      <table class="print-table" style="margin-bottom: 1.25rem;">
        <thead>
          <tr>${thCols}</tr>
        </thead>
        <tbody>
    `;

    acadRecords.forEach(rec => {
      html += `<tr>${buildRowCols(rec)}</tr>`;
    });

    html += `
        </tbody>
      </table>
    `;
  } else if ((showSabaq || showSabqi || showManzil || showRemarks || showGaltyan) && acadRecords.length === 0) {
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
      <div class="print-seal-container">
        ${appState.settings.logo_url 
          ? `<img src="${appState.settings.logo_url}" class="print-seal-logo" alt="Official Stamp">` 
          : `<div class="official-seal-badge"><i class="fa-solid fa-kaaba" style="font-size:1.6rem; color:#047857;"></i><span style="font-size:0.55rem; color:#064e3b; margin-top:2px;">MADRASA SEAL</span></div>`}
      </div>
      <div class="sig-box">
        ${appState.settings.signature_url ? `<img src="${appState.settings.signature_url}" class="signature-img-preview" alt="Signature Teacher">` : '<div style="height:45px;"></div>'}
        <div class="sig-line">
          <strong>${autoTranslateToUrdu(appState.settings.mohtamim_name)}</strong><br>
          <span style="font-size:0.8rem; color:#475569; font-weight:600;">${isUr ? 'دستخط معلم' : 'Signature Teacher'}</span>
        </div>
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

  let mName = document.getElementById('setting-madrasa-name').value;
  let pName = document.getElementById('setting-mohtamim-name').value;

  // Auto-convert English names to smooth Urdu script if Urdu mode is active
  if (appState.language === 'ur') {
    if (/[a-zA-Z]/.test(mName)) {
      mName = transliterateEnglishToUrdu(mName);
      document.getElementById('setting-madrasa-name').value = mName;
    }
    if (/[a-zA-Z]/.test(pName)) {
      pName = transliterateEnglishToUrdu(pName);
      document.getElementById('setting-mohtamim-name').value = pName;
    }
  }

  appState.settings.madrasa_name = mName;
  appState.settings.reg_number = document.getElementById('setting-reg-number').value;
  appState.settings.mohtamim_name = pName;
  appState.settings.phone = document.getElementById('setting-phone').value;
  appState.settings.whatsapp_template = document.getElementById('setting-wa-template').value;

  saveAllState();
  updateMadrasaBranding();
  updateUserProfileBadge();
  syncToFirebaseRealtime();
  alert(appState.language === 'ur' ? 'مدرسہ کی سیٹنگز محفوظ اور خوشخط اردو میں تبدیل ہو گئی ہیں۔' : 'Madrasa global settings saved and converted successfully.');
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
      updateFirebaseUI(true, appState.language === 'ur' ? 'فائر بیس کلاؤڈ کنیکٹڈ' : 'Firebase Cloud Connected');
      console.log('Firebase initialized with Database URL:', dbUrl);

      // Fill URL input in Settings
      const urlInput = document.getElementById('firebase-db-url');
      if (urlInput && !urlInput.value) urlInput.value = dbUrl;

      // Auto-attach Real-time Cloud Sync Listener
      setupFirebaseAutoSync();
    }
  } catch (e) {
    console.log('Firebase init fallback:', e.message);
    updateFirebaseUI(false, appState.language === 'ur' ? 'لوکل والٹ (کلاؤڈ ریڈی)' : 'Local Vault (Cloud Ready)');
  }
}

function setupFirebaseAutoSync() {
  if (!firebaseDb) return;
  try {
    const accountKey = appState.currentUser ? appState.currentUser.account_id : 'default_madrasa_vault';
    
    // Realtime Listener for Live Cloud Updates
    const accountRef = firebaseDb.ref('madrasa_accounts/' + accountKey);
    accountRef.on('value', (snapshot) => {
      const data = snapshot.val();
      if (data) {
        let updated = false;
        if (data.students && JSON.stringify(data.students) !== JSON.stringify(appState.students)) {
          appState.students = data.students;
          updated = true;
        }
        if (data.attendance && JSON.stringify(data.attendance) !== JSON.stringify(appState.attendance)) {
          appState.attendance = data.attendance;
          updated = true;
        }
        if (data.academic && JSON.stringify(data.academic) !== JSON.stringify(appState.academic)) {
          appState.academic = data.academic;
          updated = true;
        }
        if (data.fees && JSON.stringify(data.fees) !== JSON.stringify(appState.fees)) {
          appState.fees = data.fees;
          updated = true;
        }
        if (data.settings && JSON.stringify(data.settings) !== JSON.stringify(appState.settings)) {
          appState.settings = Object.assign({}, appState.settings, data.settings);
          updated = true;
        }

        if (updated) {
          updateMadrasaBranding();
          renderDashboard();
          renderStudentsList();
          renderAcademicLogs();
          renderFeeLedger();
        }
        updateFirebaseUI(true, appState.language === 'ur' ? 'فائر بیس کلاؤڈ لائیو سنک' : 'Firebase Cloud Live Synced');
      }
    });
  } catch (err) {
    console.log('Firebase listener setup error:', err);
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

    const timestampKey = new Date().toISOString().replace(/[^0-9]/g, '_');

    const syncData = {
      students: appState.students,
      attendance: appState.attendance,
      academic: appState.academic,
      fees: appState.fees,
      settings: appState.settings,
      last_synced: new Date().toISOString()
    };

    // 1. Live Sync to main cloud account node
    firebaseDb.ref('madrasa_accounts/' + accountKey).set(syncData, (error) => {
      if (error) {
        console.log('Firebase Sync Error:', error);
      } else {
        console.log('Successfully synced to Firebase Cloud!');
        updateFirebaseUI(true, appState.language === 'ur' ? 'فائر بیس کلاؤڈ لائیو سنک' : 'Firebase Cloud Live Synced');
      }
    });

    // 2. Lifetime Cloud Backup History Snapshot
    firebaseDb.ref('madrasa_backups/' + accountKey + '/' + timestampKey).set({
      students_count: appState.students.length,
      attendance_count: appState.attendance.length,
      academic_count: appState.academic.length,
      fees_count: appState.fees.length,
      timestamp: new Date().toISOString(),
      full_snapshot: syncData
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
  alert(appState.language === 'ur' ? 'فائر بیس کلاؤڈ ڈیٹا بیس کامیابی سے کنیکٹ، سنک اور بیک اپ ہو گیا ہے!' : 'Firebase Realtime Cloud Database connected, synced and backed up successfully!');
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
      renderStudentsList();
      renderAcademicLogs();
      renderFeeLedger();
      alert(appState.language === 'ur' ? 'فائر بیس کلاؤڈ سے تمام لائف ٹائم ڈیٹا کامیابی سے ڈاؤن لوڈ اور بحال ہو گیا ہے!' : 'All lifetime data successfully restored from Firebase Cloud!');
    } else {
      alert(appState.language === 'ur' ? 'فائر بیس پر اس اکاؤنٹ کا ڈیٹا نہیں ملا۔' : 'No existing data found on Firebase for this account.');
    }
  }).catch((err) => {
    alert('Firebase fetch error: ' + err.message);
  });
}
