/**
 * Analytics helper functions and models for Zainstein Admin Dashboard
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
    'شريف', 'sherif', 'صلاح', 'salah', 'سعيد', 'saeed', 'يحيى', 'yahia', 'معاذ', 'moaz', 'مازن', 'mazen'
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
  return 'غير محدد';
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
  if (g.includes('saudi') || g.includes('سعودية') || g.includes('سعوديه') || g.includes('ksa') || g.includes('الرياض') || g.includes('جدة')) {
    return { country: 'السعودية', governorate: 'السعودية', isEgypt: false };
  }
  if (g.includes('morocco') || g.includes('مغرب') || g.includes('maroc')) {
    return { country: 'المغرب', governorate: 'المغرب', isEgypt: false };
  }
  if (g.includes('palestine') || g.includes('فلسطين') || g.includes('غزة') || g.includes('القدس')) {
    return { country: 'فلسطين', governorate: 'فلسطين', isEgypt: false };
  }
  if (g.includes('jordan') || g.includes('أردن') || g.includes('اردن') || g.includes('عمان')) {
    return { country: 'الأردن', governorate: 'الأردن', isEgypt: false };
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
  } else {
    gov = governorateRaw.trim();
  }

  return { country: 'مصر', governorate: gov, isEgypt: true };
}

/**
 * Compute Real Analytics from active database registrations
 */
export function computeRealAnalytics(registrations = []) {
  const total = registrations.length;
  const contacted = registrations.filter((r) => r.status === 'contacted').length;
  const enrolled = registrations.filter((r) => r.status === 'enrolled').length;
  const newCount = registrations.filter((r) => !r.status || r.status === 'new').length;
  const pending = total - contacted;
  const contactRate = total > 0 ? ((contacted / total) * 100).toFixed(1) : '0.0';

  // Gender
  const genderCounts = { 'ذكور': 0, 'إناث': 0, 'غير محدد': 0 };
  // Education
  const eduCounts = { 'طلاب': 0, 'خريجون': 0, 'عاملون': 0, 'غير محدد': 0 };
  // Age
  const ageCounts = {
    'أقل من 18 سنة': 0,
    'من 18 إلى 23 سنة': 0,
    'من 24 إلى 28 سنة': 0,
    'من 29 إلى 40 سنة': 0,
    'أكبر من 40 سنة': 0,
  };
  // Countries
  const countryCounts = {
    'مصر': 0,
    'السعودية': 0,
    'المغرب': 0,
    'فلسطين': 0,
    'الأردن': 0,
    'دول أخرى': 0,
  };
  // Egyptian Governorates
  const govCounts = {};

  // Timeline
  const dateMap = {};

  registrations.forEach((r) => {
    // Gender
    const g = detectGender(r.name);
    genderCounts[g] = (genderCounts[g] || 0) + 1;

    // Edu
    const e = detectEducation(r.study_info, r.age);
    eduCounts[e] = (eduCounts[e] || 0) + 1;

    // Age
    const a = detectAgeGroup(r.age);
    if (ageCounts[a] !== undefined) {
      ageCounts[a]++;
    }

    // Location
    const loc = detectLocation(r.governorate);
    if (countryCounts[loc.country] !== undefined) {
      countryCounts[loc.country]++;
    } else {
      countryCounts['دول أخرى']++;
    }

    if (loc.isEgypt) {
      govCounts[loc.governorate] = (govCounts[loc.governorate] || 0) + 1;
    }

    // Timeline
    if (r.created_at) {
      const d = new Date(r.created_at).toISOString().slice(0, 10);
      dateMap[d] = (dateMap[d] || 0) + 1;
    }
  });

  const graduatesCount = eduCounts['خريجون'] || 0;
  const studentsCount = eduCounts['طلاب'] || 0;

  // Format array structures for charts
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

  // Timeline series
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
    graduatesCount,
    studentsCount,
    genderData,
    eduData,
    ageData,
    countryData,
    govData,
    timelineData,
  };
}

/**
 * Standard Simulated / Estimated Analytics Model for the Announced Target (3,684)
 * Strictly analytical representation: DOES NOT generate or inject fake user identities.
 */
export function getSimulatedAnalytics(realCount = 58) {
  const total = ANNOUNCED_TOTAL_TARGET;
  const contacted = 1547;
  const enrolled = 295;
  const newCount = 1842;
  const pending = total - contacted;
  const contactRate = '42.0';

  const genderData = [
    { label: 'ذكور', count: 2174, color: '#435bff', percentage: '59.0' },
    { label: 'إناث', count: 1437, color: '#ff7866', percentage: '39.0' },
    { label: 'غير محدد', count: 73, color: '#ffe15a', percentage: '2.0' },
  ];

  const eduData = [
    { label: 'طلاب', count: 2431, color: '#ffe15a', percentage: '66.0' },
    { label: 'خريجون', count: 737, color: '#435bff', percentage: '20.0' },
    { label: 'عاملون', count: 405, color: '#b9edcf', percentage: '11.0' },
    { label: 'غير محدد', count: 111, color: '#d9c6ff', percentage: '3.0' },
  ];

  const ageData = [
    { label: 'أقل من 18 سنة', count: 221, color: '#d9c6ff', percentage: '6.0' },
    { label: 'من 18 إلى 23 سنة', count: 2247, color: '#ffe15a', percentage: '61.0' },
    { label: 'من 24 إلى 28 سنة', count: 737, color: '#435bff', percentage: '20.0' },
    { label: 'من 29 إلى 40 سنة', count: 368, color: '#b9edcf', percentage: '10.0' },
    { label: 'أكبر من 40 سنة', count: 111, color: '#ff7866', percentage: '3.0' },
  ];

  const countryData = [
    { label: 'مصر', count: 2726, flag: '🇪🇬', color: '#ffe15a', percentage: '74.0' },
    { label: 'السعودية', count: 368, flag: '🇸🇦', color: '#b9edcf', percentage: '10.0' },
    { label: 'المغرب', count: 221, flag: '🇲🇦', color: '#d9c6ff', percentage: '6.0' },
    { label: 'فلسطين', count: 147, flag: '🇵🇸', color: '#ff7866', percentage: '4.0' },
    { label: 'الأردن', count: 110, flag: '🇯🇴', color: '#435bff', percentage: '3.0' },
    { label: 'دول أخرى', count: 112, flag: '🌐', color: '#fff9ed', percentage: '3.0' },
  ];

  const govData = [
    { label: 'القاهرة', count: 818, color: '#ffe15a', percentage: '30.0' },
    { label: 'الجيزة', count: 436, color: '#ffe15a', percentage: '16.0' },
    { label: 'الإسكندرية', count: 382, color: '#ffe15a', percentage: '14.0' },
    { label: 'البحيرة', count: 327, color: '#ffe15a', percentage: '12.0' },
    { label: 'السويس والقناة', count: 218, color: '#ffe15a', percentage: '8.0' },
    { label: 'الدلتا والوجه البحري', count: 327, color: '#ffe15a', percentage: '12.0' },
    { label: 'الصعيد والمحافظات الحدودية', count: 218, color: '#ffe15a', percentage: '8.0' },
  ];

  // Timeline showing progressive growth up to 3,684
  const timelineData = [
    { date: 'الأسبوع 1', count: 420, cumulative: 420 },
    { date: 'الأسبوع 2', count: 680, cumulative: 1100 },
    { date: 'الأسبوع 3', count: 950, cumulative: 2050 },
    { date: 'الأسبوع 4', count: 830, cumulative: 2880 },
    { date: 'الأسبوع 5', count: 804, cumulative: 3684 },
  ];

  return {
    isSimulated: true,
    announcedTarget: ANNOUNCED_TOTAL_TARGET,
    realTotal: realCount,
    total,
    newCount,
    contactedCount: contacted,
    enrolledCount: enrolled,
    pendingCount: pending,
    contactRate,
    graduatesCount: 737,
    studentsCount: 2431,
    genderData,
    eduData,
    ageData,
    countryData,
    govData,
    timelineData,
  };
}

export function formatNumber(num) {
  if (num === undefined || num === null) return '0';
  return Number(num).toLocaleString('ar-EG');
}
