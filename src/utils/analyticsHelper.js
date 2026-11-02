/**
 * Comprehensive Analytics & Synthetic Dataset Engine for Zainstein Admin Dashboard
 * Exact target: 3,684 registrations (Real 58 + Synthetic 3,626)
 */

export const ANNOUNCED_TOTAL_TARGET = 3684;

// Gender Classifier
export function detectGender(name) {
  if (!name) return 'غير محدد';
  const n = name.trim().toLowerCase();
  const firstWord = n.split(/\s+/)[0];

  const femaleNames = [
    'شهد', 'ميرنا', 'merna', 'رنيم', 'raneem', 'هايدي', 'haidy', 'نادين', 'nadine',
    'بسمه', 'بسمة', 'basma', 'اميرة', 'أميرة', 'amira', 'جنى', 'جنا', 'jana', 'آيات', 'ايات', 'ayat',
    'سجود', 'sojoud', 'جهاد', 'gehad', 'جاكلين', 'gaklen', 'هدير', 'hadeer',
    'منه', 'منة', 'menna', 'آية', 'اية', 'aya', 'ساره', 'سارة', 'sara', 'sarah',
    'حنين', 'hanin', 'ملك', 'malak', 'يقين', 'yaqeen', 'ندى', 'nada', 'الاء', 'آلاء', 'alaa',
    'نورهان', 'nourhan', 'فاطمة', 'فاطمه', 'مريم', 'maryam', 'mariam', 'ياسمين', 'سلمى', 'salma',
    'نور', 'nour', 'دنيا', 'donia', 'اسراء', 'إسراء', 'esraa', 'دعاء', 'doaa', 'حبيبة', 'habiba',
    'خلود', 'kholoud', 'رضوى', 'radwa', 'شروق', 'shrouk', 'شيماء', 'shimaa', 'رانيا', 'rania',
    'روان', 'rawan', 'يارا', 'yara', 'مروة', 'marwa', 'نجلاء', 'داليا', 'dalia', 'منى', 'mona',
    'ريم', 'reem', 'هبة', 'heba', 'ايمان', 'إيمان', 'eman', 'امال', 'amal', 'شروق', 'shorouk',
    'حنان', 'hanan', 'سهيلة', 'sohila', 'رويدا', 'rowida', 'تسنيم', 'tasneem', 'شمس', 'shams'
  ];

  const maleNames = [
    'محمد', 'mohamed', 'mohammed', 'muhammad', 'احمد', 'أحمد', 'ahmed', 'محمود', 'mahmoud',
    'مصطفى', 'مصطفي', 'mostafa', 'mustafa', 'عبدالحميد', 'عبد الحميد', 'عبدالرحمن', 'عبد الرحمن',
    'عبد', 'مهند', 'mohaned', 'علي', 'على', 'ali', 'عمر', 'omar', 'ايهاب', 'إيهاب', 'ehab',
    'اسامة', 'أسامة', 'osama', 'ابراهيم', 'إبراهيم', 'ibrahim', 'سامح', 'sameh', 'فارس', 'fares',
    'زياد', 'ziad', 'zeyad', 'هشام', 'hesham', 'اسماعيل', 'إسماعيل', 'ismail', 'انس', 'أنس', 'anas',
    'عصام', 'essam', 'خالد', 'khaled', 'طارق', 'tarek', 'حسن', 'hassan', 'يوسف', 'youssef', 'yousef',
    'كريم', 'kareem', 'karim', 'حازم', 'hazem', 'عمرو', 'amr', 'حمزة', 'hamza', 'بلال', 'belal',
    'مروان', 'marwan', 'سيف', 'seif', 'ياسين', 'yassin', 'ايمن', 'أيمن', 'ayman', 'وليد', 'walid',
    'وائل', 'wael', 'حسام', 'hossam', 'ماجد', 'maged', 'عادل', 'adel', 'رامي', 'rami', 'رامى',
    'شريف', 'sherif', 'صلاح', 'salah', 'سعيد', 'saeed', 'يحيى', 'yahia', 'معاذ', 'moaz', 'مازن', 'mazen',
    'باسل', 'basel', 'فادي', 'fady', 'موسى', 'mousa', 'سالم', 'salem'
  ];

  if (femaleNames.includes(firstWord) || femaleNames.some((fn) => n.startsWith(fn + ' '))) return 'إناث';
  if (maleNames.includes(firstWord) || maleNames.some((mn) => n.startsWith(mn + ' '))) return 'ذكور';
  if (firstWord.startsWith('عبد') || firstWord.startsWith('أبو') || firstWord.startsWith('ابو')) return 'ذكور';
  if (firstWord.endsWith('ة') || firstWord.endsWith('اء') || firstWord.endsWith('ى')) return 'إناث';

  return 'غير محدد';
}

// Educational Status Classifier
export function detectEducation(studyInfo, age) {
  if (!studyInfo) {
    if (age && age >= 26) return 'عاملون';
    if (age && age <= 23) return 'طلاب';
    return 'غير محدد';
  }
  const s = studyInfo.toLowerCase();
  if (
    s.includes('خريج') ||
    s.includes('خريجه') ||
    s.includes('خريجة') ||
    s.includes('graduate') ||
    s.includes('تخرج') ||
    s.includes('بكالوريوس') ||
    s.includes('ليسانس')
  ) {
    return 'خريجون';
  }
  if (
    s.includes('مهندس') ||
    s.includes('شغال') ||
    s.includes('عمل') ||
    s.includes('موظف') ||
    s.includes('engineer') ||
    s.includes('طبيب') ||
    s.includes('معلم') ||
    s.includes('developer') ||
    s.includes('محاسب') ||
    s.includes('freelance') ||
    s.includes('freelancer')
  ) {
    return 'عاملون';
  }
  if (
    s.includes('طالب') ||
    s.includes('طالبه') ||
    s.includes('طالبة') ||
    s.includes('كلية') ||
    s.includes('كليه') ||
    s.includes('جامعة') ||
    s.includes('جامعه') ||
    s.includes('فرقة') ||
    s.includes('فرقه') ||
    s.includes('سنة') ||
    s.includes('تكنولوجيا') ||
    s.includes('حاسبات') ||
    s.includes('علوم') ||
    s.includes('تربية') ||
    s.includes('تربيه') ||
    s.includes('اداب') ||
    s.includes('آداب') ||
    s.includes('حقوق') ||
    s.includes('تجارة') ||
    s.includes('تجاره') ||
    s.includes('ألسن') ||
    s.includes('السن') ||
    s.includes('تمريض') ||
    s.includes('طب') ||
    s.includes('معهد') ||
    s.includes('ثانوي') ||
    s.includes('مدرسة') ||
    s.includes('faculty') ||
    s.includes('student') ||
    s.includes('bis') ||
    s.includes('gis') ||
    s.includes('cs')
  ) {
    return 'طلاب';
  }
  if (age && age <= 23) return 'طلاب';
  if (age && age >= 26) return 'عاملون';
  return 'أخرى';
}

// Age Group Classifier
export function detectAgeGroup(age) {
  if (!age || isNaN(age)) return 'غير محدد';
  const a = Number(age);
  if (a < 18) return 'أقل من 18 سنة';
  if (a >= 18 && a <= 23) return 'من 18 إلى 23 سنة';
  if (a >= 24 && a <= 28) return 'من 24 إلى 28 سنة';
  if (a >= 29 && a <= 40) return 'من 29 إلى 40 سنة';
  return 'أكبر من 40 سنة';
}

// Location / Governorate Normalizer
export function detectLocation(governorateRaw) {
  if (!governorateRaw) return { country: 'مصر', governorate: 'غير محدد', isEgypt: true };
  const g = governorateRaw.trim().toLowerCase();

  // Countries
  if (
    g.includes('saudi') ||
    g.includes('سعودية') ||
    g.includes('سعوديه') ||
    g.includes('ksa') ||
    g.includes('الرياض') ||
    g.includes('جدة') ||
    g.includes('الدمام') ||
    g.includes('مكة') ||
    g.includes('المدينة')
  ) {
    return { country: 'السعودية', governorate: 'السعودية', isEgypt: false };
  }
  if (g.includes('morocco') || g.includes('مغرب') || g.includes('maroc') || g.includes('الدار البيضاء') || g.includes('الرباط')) {
    return { country: 'المغرب', governorate: 'المغرب', isEgypt: false };
  }
  if (g.includes('palestine') || g.includes('فلسطين') || g.includes('غزة') || g.includes('القدس') || g.includes('رام الله')) {
    return { country: 'فلسطين', governorate: 'فلسطين', isEgypt: false };
  }
  if (g.includes('jordan') || g.includes('أردن') || g.includes('اردن') || g.includes('عمان') || g.includes('إربد')) {
    return { country: 'الأردن', governorate: 'الأردن', isEgypt: false };
  }

  // Other non-Egypt countries
  if (
    g.includes('إمارات') ||
    g.includes('امارات') ||
    g.includes('uae') ||
    g.includes('دبي') ||
    g.includes('كويت') ||
    g.includes('قطر') ||
    g.includes('تونس') ||
    g.includes('عراق') ||
    g.includes('دول أخرى') ||
    g.includes('أخرى')
  ) {
    return { country: 'دول أخرى', governorate: 'دول أخرى', isEgypt: false };
  }

  // Egypt Governorates
  let gov = 'أخرى';
  if (g.includes('بحير') || g.includes('behira') || g.includes('beheira') || g.includes('بحريه')) {
    gov = 'البحيرة';
  } else if (g.includes('سويس') || g.includes('suez')) {
    gov = 'السويس';
  } else if (g.includes('اسكندر') || g.includes('إسكندر') || g.includes('alex')) {
    gov = 'الإسكندرية';
  } else if (g.includes('قاهر') || g.includes('cairo')) {
    gov = 'القاهرة';
  } else if (g.includes('مطروح') || g.includes('matrouh')) {
    gov = 'مطروح';
  } else if (g.includes('شرقي') || g.includes('zagazig')) {
    gov = 'الشرقية';
  } else if (g.includes('غربي') || g.includes('tanta') || g.includes('طنطا')) {
    gov = 'الغربية';
  } else if (g.includes('جيز') || g.includes('giza')) {
    gov = 'الجيزة';
  } else if (g.includes('قليوب') || g.includes('banha')) {
    gov = 'القليوبية';
  } else if (g.includes('واد') || g.includes('جديد')) {
    gov = 'الوادي الجديد';
  } else if (g.includes('دقهلي') || g.includes('منصور')) {
    gov = 'الدقهلية';
  } else if (g.includes('منوفي') || g.includes('منوفيه')) {
    gov = 'المنوفية';
  } else if (g.includes('اسيوط') || g.includes('أسيوط')) {
    gov = 'أسيوط';
  } else if (g.includes('سوهاج')) {
    gov = 'سوهاج';
  } else if (g.includes('بورسعيد')) {
    gov = 'بورسعيد';
  } else if (g.includes('دمياط')) {
    gov = 'دمياط';
  } else if (g.includes('إسماعيلية') || g.includes('اسماعيلية')) {
    gov = 'الإسماعيلية';
  } else if (g.includes('كفر الشيخ')) {
    gov = 'كفر الشيخ';
  } else if (g.includes('فيوم')) {
    gov = 'الفيوم';
  } else if (g.includes('بني سويف')) {
    gov = 'بني سويف';
  } else if (g.includes('منيا')) {
    gov = 'المنيا';
  } else if (g.includes('قنا')) {
    gov = 'قنا';
  } else if (g.includes('أسوان') || g.includes('اسوان')) {
    gov = 'أسوان';
  } else {
    gov = governorateRaw.trim();
  }

  return { country: 'مصر', governorate: gov, isEgypt: true };
}

export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return Number(num).toLocaleString('ar-EG');
}

/**
 * Deterministic Synthetic Dataset Generator
 * Generates exact 3,626 synthetic records so:
 * Real (58) + Synthetic (3,626) = 3,684 records exactly.
 */
const MALE_NAMES = [
  'أحمد محمد الشناوي', 'كريم حسن الدسوقي', 'عمر فاروق الشريف', 'يوسف محمود الجندي',
  'مصطفى علي النجار', 'خالد إبراهيم رضوان', 'عبدالرحمن سالم مهران', 'طارق سعيد الباز',
  'سيف عادل الصاوي', 'حمزة وائل البدري', 'بلال حسام فهمي', 'حازم هشام زهران',
  'مازن شريف غنيم', 'زياد صلاح قنديل', 'معاذ عثمان الهواري', 'رامي السعيد الجيار',
  'يحيى فاروق بركات', 'باسل درويش الشافعي', 'فادي خطاب شلبي', 'عمرو عبدالحميد زكي',
  'أيمن إيهاب الصالح', 'وليد كمال العطار', 'محمد أسامة خليل', 'إسماعيل أنس عياد',
  'أنس تامر يونس', 'عصام مجدي عاشور', 'ماجد طلعت السويدي', 'ياسين رجب درويش'
];

const FEMALE_NAMES = [
  'مريم أحمد الشناوي', 'سلمى خالد الدسوقي', 'سارة عمر الشريف', 'نور إبراهيم الجندي',
  'ياسمين مصطفى النجار', 'آية محمود رضوان', 'نورهان سالم مهران', 'حبيبة طارق الباز',
  'دنيا سيف الصاوي', 'ملك حمزة البدري', 'شهد بلال فهمي', 'هايدي حازم زهران',
  'روان مازن غنيم', 'يارا زياد قنديل', 'ريم معاذ الهواري', 'إيمان رامي الجيار',
  'منة يحيى بركات', 'خلود باسل الشافعي', 'رانيا فادي شلبي', 'رضوى عمرو زكي',
  'ميرنا أيمن الصالح', 'هبة وليد العطار', 'تسنيم محمد خليل', 'أسماء إسماعيل عياد',
  'نادين أنس يونس', 'حنين عصام عاشور', 'بسمة ماجد السويدي', 'شروق ياسين درويش'
];

const STUDY_STUDENTS = [
  'حاسبات ومعلومات - سنة 3',
  'هندسة برمجيات - فرقة 4',
  'علوم حاسب CS - فرقة 2',
  'ذكاء اصطناعي AI - سنة 2',
  'كلية التجارة قسم BIS',
  'كلية الهندسة قسم حاسبات',
  'نظم معلومات إدارية MIS',
  'تقنية معلومات IT - فرقة 3',
  'هندسة اتصالات وإلكترونيات',
  'علوم الحاسب والمعلومات'
];

const STUDY_GRADS = [
  'خريج هندسة حاسبات ونظم',
  'خريج علوم حاسب CS',
  'بكالوريوس تكنولوجيا معلومات IT',
  'خريج نظم معلومات إدارية',
  'خريج كلية الذكاء الاصطناعي',
  'خريج هندسة برمجيات وتطبيقات',
  'خريج حاسبات ومعلومات دفعة 2025'
];

const STUDY_EMPLOYEES = [
  'Junior Frontend Developer',
  'مطور برمجيات حر (Freelancer)',
  'Full Stack Web Developer',
  'Junior Backend Developer (Node.js)',
  'مهندس نظم ومحلل بيانات',
  'Software QA Engineer',
  'UI/UX & Frontend Developer'
];

const STUDY_OTHER = [
  'مهتم بالتحول لمجال الـ AI',
  'تطوير مهارات العمل الحر',
  'رائد أعمال تقني',
  'شغوف بهندسة البرمجيات'
];

const EGYPT_CITIES = [
  'القاهرة', 'الجيزة', 'الإسكندرية', 'الدقهلية', 'الغربية', 'الشرقية',
  'البحيرة', 'القليوبية', 'المنوفية', 'أسيوط', 'سوهاج', 'كفر الشيخ',
  'بورسعيد', 'السويس', 'دمياط', 'الإسماعيلية', 'الفيوم', 'بني سويف'
];

const SAUDI_CITIES = ['الرياض', 'جدة', 'الدمام', 'مكة المكرمة', 'المدينة المنورة', 'الخبر'];
const MOROCCO_CITIES = ['الدار البيضاء', 'الرباط', 'مراكش', 'طنجة', 'فاس'];
const PALESTINE_CITIES = ['القدس', 'رام الله', 'غزة', 'نابلس', 'الخليل'];
const JORDAN_CITIES = ['عمان', 'إربد', 'الزرقاء', 'العقبة'];
const OTHER_COUNTRIES = ['الإمارات', 'الكويت', 'قطر', 'تونس', 'العراق'];

// Cached synthetic dataset singleton so it generates instantly once
let cachedSyntheticRecords = null;

export function generateSyntheticRegistrations(realRegistrations = []) {
  if (cachedSyntheticRecords && cachedSyntheticRecords.length === 3626) {
    return cachedSyntheticRecords;
  }

  // Targets for 3,684
  const TOTAL_TARGET = 3684;
  const realCount = realRegistrations.length || 58;
  const syntheticCount = TOTAL_TARGET - realCount; // 3626

  // Count real distributions
  let realMale = 0;
  let realFemale = 0;
  const realCountries = { 'مصر': 0, 'السعودية': 0, 'المغرب': 0, 'فلسطين': 0, 'الأردن': 0, 'دول أخرى': 0 };
  const realAges = { 'أقل من 18 سنة': 0, 'من 18 إلى 23 سنة': 0, 'من 24 إلى 28 سنة': 0, 'من 29 إلى 40 سنة': 0, 'أكبر من 40 سنة': 0 };
  const realEdu = { 'طلاب': 0, 'خريجون': 0, 'عاملون': 0, 'أخرى': 0 };

  realRegistrations.forEach((r) => {
    const g = detectGender(r.name);
    if (g === 'ذكور') realMale++;
    else realFemale++;

    const loc = detectLocation(r.governorate);
    if (realCountries[loc.country] !== undefined) realCountries[loc.country]++;
    else realCountries['دول أخرى']++;

    const a = detectAgeGroup(r.age);
    if (realAges[a] !== undefined) realAges[a]++;
    else realAges['من 18 إلى 23 سنة']++;

    const e = detectEducation(r.study_info, r.age);
    if (e === 'خريجون') realEdu['خريجون']++;
    else if (e === 'عاملون') realEdu['عاملون']++;
    else if (e === 'طلاب') realEdu['طلاب']++;
    else realEdu['أخرى']++;
  });

  // Target distributions for combined 3,684:
  // Male 2,174, Female 1,510
  const synthMaleTarget = Math.max(0, 2174 - realMale);
  const synthFemaleTarget = Math.max(0, 1510 - realFemale);

  // Countries: Egypt 2,579, Saudi 405, Morocco 258, Palestine 184, Jordan 147, Other 111
  const countryQuotas = [
    { country: 'مصر', remaining: Math.max(0, 2579 - realCountries['مصر']), cities: EGYPT_CITIES, dial: '+20 1' },
    { country: 'السعودية', remaining: Math.max(0, 405 - realCountries['السعودية']), cities: SAUDI_CITIES, dial: '+966 5' },
    { country: 'المغرب', remaining: Math.max(0, 258 - realCountries['المغرب']), cities: MOROCCO_CITIES, dial: '+212 6' },
    { country: 'فلسطين', remaining: Math.max(0, 184 - realCountries['فلسطين']), cities: PALESTINE_CITIES, dial: '+970 59' },
    { country: 'الأردن', remaining: Math.max(0, 147 - realCountries['الأردن']), cities: JORDAN_CITIES, dial: '+962 7' },
    { country: 'دول أخرى', remaining: Math.max(0, 111 - realCountries['دول أخرى']), cities: OTHER_COUNTRIES, dial: '+971 50' },
  ];

  // Age quotas: <18: 184, 18-23: 2,247, 24-28: 737, 29-40: 368, >40: 148
  const ageQuotas = [
    { group: 'أقل من 18 سنة', remaining: Math.max(0, 184 - realAges['أقل من 18 سنة']), min: 15, max: 17 },
    { group: 'من 18 إلى 23 سنة', remaining: Math.max(0, 2247 - realAges['من 18 إلى 23 سنة']), min: 18, max: 23 },
    { group: 'من 24 إلى 28 سنة', remaining: Math.max(0, 737 - realAges['من 24 إلى 28 سنة']), min: 24, max: 28 },
    { group: 'من 29 إلى 40 سنة', remaining: Math.max(0, 368 - realAges['من 29 إلى 40 سنة']), min: 29, max: 39 },
    { group: 'أكبر من 40 سنة', remaining: Math.max(0, 148 - realAges['أكبر من 40 سنة']), min: 41, max: 48 },
  ];

  // Edu quotas: Students 2,395, Graduates 737, Employees 405, Other 147
  const eduQuotas = [
    { edu: 'طلاب', remaining: Math.max(0, 2395 - realEdu['طلاب']), pool: STUDY_STUDENTS },
    { edu: 'خريجون', remaining: Math.max(0, 737 - realEdu['خريجون']), pool: STUDY_GRADS },
    { edu: 'عاملون', remaining: Math.max(0, 405 - realEdu['عاملون']), pool: STUDY_EMPLOYEES },
    { edu: 'أخرى', remaining: Math.max(0, 147 - realEdu['أخرى']), pool: STUDY_OTHER },
  ];

  // Timeline quotas (7 Days): [1180, 760, 520, 410, 340, 274, 200]
  // Adjust day 1 by realCount
  const timelineQuotas = [
    { day: 1, dateStr: '2026-10-24', remaining: Math.max(0, 1180 - realCount) },
    { day: 2, dateStr: '2026-10-25', remaining: 760 },
    { day: 3, dateStr: '2026-10-26', remaining: 520 },
    { day: 4, dateStr: '2026-10-27', remaining: 410 },
    { day: 5, dateStr: '2026-10-28', remaining: 340 },
    { day: 6, dateStr: '2026-10-29', remaining: 274 },
    { day: 7, dateStr: '2026-10-30', remaining: 200 },
  ];

  let currentMaleLeft = synthMaleTarget;
  const records = [];

  for (let i = 0; i < syntheticCount; i++) {
    // 1. Gender selection
    const isMale = currentMaleLeft > 0;
    if (isMale) currentMaleLeft--;
    const namePool = isMale ? MALE_NAMES : FEMALE_NAMES;
    const nameBase = namePool[i % namePool.length];
    const fullName = `${nameBase} ${i % 3 === 0 ? '' : (i % 7) + 1}`.trim();

    // 2. Country selection
    let chosenCountry = countryQuotas.find((c) => c.remaining > 0);
    if (!chosenCountry) chosenCountry = countryQuotas[0];
    chosenCountry.remaining--;
    const city = chosenCountry.cities[i % chosenCountry.cities.length];
    const locDisplay = chosenCountry.country === 'مصر' ? city : `${chosenCountry.country} - ${city}`;

    // 3. Age selection
    let chosenAge = ageQuotas.find((a) => a.remaining > 0);
    if (!chosenAge) chosenAge = ageQuotas[1];
    chosenAge.remaining--;
    const ageVal = chosenAge.min + ((i * 3) % (chosenAge.max - chosenAge.min + 1));

    // 4. Education selection
    let chosenEdu = eduQuotas.find((e) => e.remaining > 0);
    if (!chosenEdu) chosenEdu = eduQuotas[0];
    chosenEdu.remaining--;
    const studyVal = chosenEdu.pool[i % chosenEdu.pool.length];

    // 5. Timeline selection
    let chosenTimeline = timelineQuotas.find((t) => t.remaining > 0);
    if (!chosenTimeline) chosenTimeline = timelineQuotas[timelineQuotas.length - 1];
    chosenTimeline.remaining--;

    const synthNumber = 1000 + i + 1;
    const phoneDigitSuffix = String(1000000 + ((i * 73) % 8999999));
    const phone = `${chosenCountry.dial}${phoneDigitSuffix}`;
    const emailPrefix = `student.${synthNumber}`;
    const emailDomain = i % 4 === 0 ? 'gmail.com' : i % 3 === 0 ? 'outlook.com' : 'yahoo.com';
    const email = `${emailPrefix}@${emailDomain}`;

    const hour = 9 + (i % 14);
    const minute = (i * 7) % 60;
    const createdIso = `${chosenTimeline.dateStr}T${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}:00.000Z`;

    records.push({
      id: `synth_${synthNumber}`,
      name: fullName,
      email,
      phone,
      age: ageVal,
      governorate: locDisplay,
      study_info: studyVal,
      registration_number: synthNumber,
      registration_code: `ZS-SYNTH-${synthNumber}`,
      status: 'synthetic',
      record_type: 'synthetic',
      created_at: createdIso,
    });
  }

  cachedSyntheticRecords = records;
  return records;
}

/**
 * Combined Analytics Computer for Exact 3,684 Dataset
 */
export function computeCombinedAnalytics(realRegistrations = [], syntheticRegistrations = []) {
  const TOTAL = ANNOUNCED_TOTAL_TARGET; // 3684
  const realCount = realRegistrations.length || 58;
  const synthCount = syntheticRegistrations.length || (3684 - realCount);

  // Target Numbers
  const maleCount = 2174;
  const femaleCount = 1510;
  const malePct = ((maleCount / TOTAL) * 100).toFixed(1);
  const femalePct = ((femaleCount / TOTAL) * 100).toFixed(1);

  // 9 Required KPIs
  const kpis = {
    totalRegistrations: TOTAL,
    realCount,
    syntheticCount: synthCount,
    maleCount,
    femaleCount,
    malePct,
    femalePct,
    totalCountries: 6,
    graduatesCount: 737,
    graduatesPct: ((737 / TOTAL) * 100).toFixed(1), // 20.0%
    studentsCount: 2395,
    studentsPct: ((2395 / TOTAL) * 100).toFixed(1), // 65.0%
    employeesCount: 405,
    employeesPct: ((405 / TOTAL) * 100).toFixed(1), // 11.0%
    registrationGrowth: '+212%',
    dailyAverage: 526,
  };

  // 1. Gender Data (Donut Chart)
  const genderData = [
    { label: 'ذكور', count: maleCount, percentage: malePct, color: '#435bff' },
    { label: 'إناث', count: femaleCount, percentage: femalePct, color: '#ff7866' },
  ];

  // 2. Geographic Data (Bar Chart)
  const countryData = [
    { label: 'مصر', count: 2579, percentage: '70.0', flag: '🇪🇬', color: '#ffe15a' },
    { label: 'السعودية', count: 405, percentage: '11.0', flag: '🇸🇦', color: '#b9edcf' },
    { label: 'المغرب', count: 258, percentage: '7.0', flag: '🇲🇦', color: '#d9c6ff' },
    { label: 'فلسطين', count: 184, percentage: '5.0', flag: '🇵🇸', color: '#ff7866' },
    { label: 'الأردن', count: 147, percentage: '4.0', flag: '🇯🇴', color: '#435bff' },
    { label: 'دول أخرى', count: 111, percentage: '3.0', flag: '🌐', color: '#fff9ed' },
  ];

  // 3. Age Groups Data (Bar Chart)
  const ageData = [
    { label: 'أقل من 18 سنة', count: 184, percentage: '5.0', color: '#d9c6ff' },
    { label: 'من 18 إلى 23 سنة', count: 2247, percentage: '61.0', color: '#ffe15a' },
    { label: 'من 24 إلى 28 سنة', count: 737, percentage: '20.0', color: '#435bff' },
    { label: 'من 29 إلى 40 سنة', count: 368, percentage: '10.0', color: '#b9edcf' },
    { label: 'أكبر من 40 سنة', count: 148, percentage: '4.0', color: '#ff7866' },
  ];

  // 4. Educational Status Data (Donut Chart)
  const eduData = [
    { label: 'طلاب جامعات', count: 2395, percentage: '65.0', color: '#ffe15a' },
    { label: 'خريجون', count: 737, percentage: '20.0', color: '#435bff' },
    { label: 'عاملون ومحترفون', count: 405, percentage: '11.0', color: '#b9edcf' },
    { label: 'أخرى', count: 147, percentage: '4.0', color: '#d9c6ff' },
  ];

  // 5. Registration Timeline (7 Days Area/Line Chart)
  // Day 1: 1180 (Launch peak)
  // Day 2: 760 (-35.6%)
  // Day 3: 520 (-31.6%)
  // Day 4: 410 (-21.2%)
  // Day 5: 340 (-17.1%)
  // Day 6: 274 (-19.4%)
  // Day 7: 200 (-27.0%)
  // Sum = 3684
  const timelineData = [
    { day: 'اليوم 1', date: '2026-10-24', count: 1180, cumulative: 1180, rate: 'أعلى ذروة تسجيل (إطلاق)' },
    { day: 'اليوم 2', date: '2026-10-25', count: 760, cumulative: 1940, rate: '-35.6% انخفاض نسبي' },
    { day: 'اليوم 3', date: '2026-10-26', count: 520, cumulative: 2460, rate: '-31.6%' },
    { day: 'اليوم 4', date: '2026-10-27', count: 410, cumulative: 2870, rate: '-21.2%' },
    { day: 'اليوم 5', date: '2026-10-28', count: 340, cumulative: 3210, rate: '-17.1%' },
    { day: 'اليوم 6', date: '2026-10-29', count: 274, cumulative: 3484, rate: '-19.4%' },
    { day: 'اليوم 7', date: '2026-10-30', count: 200, cumulative: 3684, rate: '-27.0% استقرار' },
  ];

  return {
    kpis,
    genderData,
    countryData,
    ageData,
    eduData,
    timelineData,
  };
}

/**
 * Real Database Only Analytics Calculator (for 58 real records)
 */
export function computeRealAnalytics(registrations = []) {
  const total = registrations.length;
  const contacted = registrations.filter((r) => r.status === 'contacted').length;
  const enrolled = registrations.filter((r) => r.status === 'enrolled').length;
  const newCount = registrations.filter((r) => !r.status || r.status === 'new').length;
  const pending = total - contacted;
  const contactRate = total > 0 ? ((contacted / total) * 100).toFixed(1) : '0.0';

  const genderCounts = { 'ذكور': 0, 'إناث': 0, 'غير محدد': 0 };
  const eduCounts = { 'طلاب': 0, 'خريجون': 0, 'عاملون': 0, 'غير محدد': 0 };
  const ageCounts = {
    'أقل من 18 سنة': 0,
    'من 18 إلى 23 سنة': 0,
    'من 24 إلى 28 سنة': 0,
    'من 29 إلى 40 سنة': 0,
    'أكبر من 40 سنة': 0,
  };
  const countryCounts = {
    'مصر': 0,
    'السعودية': 0,
    'المغرب': 0,
    'فلسطين': 0,
    'الأردن': 0,
    'دول أخرى': 0,
  };
  const govCounts = {};
  const dateMap = {};

  registrations.forEach((r) => {
    const g = detectGender(r.name);
    genderCounts[g] = (genderCounts[g] || 0) + 1;

    const e = detectEducation(r.study_info, r.age);
    eduCounts[e] = (eduCounts[e] || 0) + 1;

    const a = detectAgeGroup(r.age);
    if (ageCounts[a] !== undefined) ageCounts[a]++;

    const loc = detectLocation(r.governorate);
    if (countryCounts[loc.country] !== undefined) countryCounts[loc.country]++;
    else countryCounts['دول أخرى']++;

    if (loc.isEgypt) {
      govCounts[loc.governorate] = (govCounts[loc.governorate] || 0) + 1;
    }

    if (r.created_at) {
      const d = new Date(r.created_at).toISOString().slice(0, 10);
      dateMap[d] = (dateMap[d] || 0) + 1;
    }
  });

  const genderData = [
    { label: 'ذكور', count: genderCounts['ذكور'], color: '#435bff', percentage: total ? ((genderCounts['ذكور'] / total) * 100).toFixed(1) : 0 },
    { label: 'إناث', count: genderCounts['إناث'], color: '#ff7866', percentage: total ? ((genderCounts['إناث'] / total) * 100).toFixed(1) : 0 },
    { label: 'غير محدد', count: genderCounts['غير محدد'], color: '#ffe15a', percentage: total ? ((genderCounts['غير محدد'] / total) * 100).toFixed(1) : 0 },
  ];

  const eduData = [
    { label: 'طلاب', count: eduCounts['طلاب'], color: '#ffe15a', percentage: total ? ((eduCounts['طلاب'] / total) * 100).toFixed(1) : 0 },
    { label: 'خريجون', count: eduCounts['خريجون'], color: '#435bff', percentage: total ? ((eduCounts['خريجون'] / total) * 100).toFixed(1) : 0 },
    { label: 'عاملون', count: eduCounts['عاملون'], color: '#b9edcf', percentage: total ? ((eduCounts['عاملون'] / total) * 100).toFixed(1) : 0 },
    { label: 'غير محدد', count: eduCounts['غير محدد'], color: '#d9c6ff', percentage: total ? ((eduCounts['غير محدد'] / total) * 100).toFixed(1) : 0 },
  ];

  const ageData = [
    { label: 'أقل من 18 سنة', count: ageCounts['أقل من 18 سنة'], color: '#d9c6ff', percentage: total ? ((ageCounts['أقل من 18 سنة'] / total) * 100).toFixed(1) : 0 },
    { label: 'من 18 إلى 23 سنة', count: ageCounts['من 18 إلى 23 سنة'], color: '#ffe15a', percentage: total ? ((ageCounts['من 18 إلى 23 سنة'] / total) * 100).toFixed(1) : 0 },
    { label: 'من 24 إلى 28 سنة', count: ageCounts['من 24 إلى 28 سنة'], color: '#435bff', percentage: total ? ((ageCounts['من 24 إلى 28 سنة'] / total) * 100).toFixed(1) : 0 },
    { label: 'من 29 إلى 40 سنة', count: ageCounts['من 29 إلى 40 سنة'], color: '#b9edcf', percentage: total ? ((ageCounts['من 29 إلى 40 سنة'] / total) * 100).toFixed(1) : 0 },
    { label: 'أكبر من 40 سنة', count: ageCounts['أكبر من 40 سنة'], color: '#ff7866', percentage: total ? ((ageCounts['أكبر من 40 سنة'] / total) * 100).toFixed(1) : 0 },
  ];

  const countryFlags = {
    'مصر': '🇪🇬',
    'السعودية': '🇸🇦',
    'المغرب': '🇲🇦',
    'فلسطين': '🇵🇸',
    'الأردن': '🇯🇴',
    'دول أخرى': '🌐',
  };

  const countryData = Object.entries(countryCounts).map(([label, count]) => ({
    label,
    count,
    flag: countryFlags[label] || '🌐',
    color: label === 'مصر' ? '#ffe15a' : label === 'السعودية' ? '#b9edcf' : '#d9c6ff',
    percentage: total ? ((count / total) * 100).toFixed(1) : 0,
  }));

  const govData = Object.entries(govCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([label, count]) => ({
      label,
      count,
      percentage: total ? ((count / total) * 100).toFixed(1) : 0,
      color: '#ffe15a',
    }));

  const sortedDates = Object.keys(dateMap).sort();
  let running = 0;
  const timelineData = sortedDates.map((date) => {
    running += dateMap[date];
    return {
      date,
      count: dateMap[date],
      cumulative: running,
    };
  });

  return {
    isSimulated: false,
    announcedTarget: ANNOUNCED_TOTAL_TARGET,
    total,
    newCount,
    contactedCount: contacted,
    enrolledCount: enrolled,
    pendingCount: pending,
    contactRate,
    graduatesCount: eduCounts['خريجون'] || 0,
    studentsCount: eduCounts['طلاب'] || 0,
    genderData,
    eduData,
    ageData,
    countryData,
    govData,
    timelineData,
  };
}
