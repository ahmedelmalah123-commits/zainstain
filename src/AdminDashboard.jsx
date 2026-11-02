import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Lock,
  Users,
  Phone,
  Mail,
  MapPin,
  GraduationCap,
  Search,
  RefreshCw,
  Download,
  MessageSquare,
  Trash2,
  ArrowLeft,
  Check,
  Copy,
  Send,
  AlertCircle,
  Clock,
  Filter,
  X,
  BarChart3,
  SlidersHorizontal,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { generateWhatsAppMessage } from './utils/emailTemplate';
import BroadcastModal from './components/BroadcastModal';
import AnalyticsView from './components/analytics/AnalyticsView';
import {
  detectGender,
  detectEducation,
  detectAgeGroup,
  detectLocation,
  formatNumber,
} from './utils/analyticsHelper';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '') || '';
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

export default function AdminDashboard({ onBack }) {
  const [pin, setPin] = useState(() => localStorage.getItem('zainstein_admin_pin') || '');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [inputPin, setInputPin] = useState('');
  const [registrations, setRegistrations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [genderFilter, setGenderFilter] = useState('all');
  const [eduFilter, setEduFilter] = useState('all');
  const [ageFilter, setAgeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [activeChartFilter, setActiveChartFilter] = useState(null);

  const [copiedWaId, setCopiedWaId] = useState(null);
  const [isBroadcastOpen, setIsBroadcastOpen] = useState(false);

  const registrationsSectionRef = useRef(null);

  const handleCopyWaMessage = (id, text) => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(text);
      setCopiedWaId(id);
      setTimeout(() => setCopiedWaId(null), 2500);
    }
  };

  useEffect(() => {
    if (pin) {
      fetchRegistrations(pin);
    }
  }, []);

  const formatEgyptianPhone = (raw) => {
    if (!raw) return '';
    let digits = raw.replace(/\D/g, '');
    if (digits.startsWith('01')) {
      return '2' + digits;
    }
    if (digits.startsWith('201')) {
      return digits;
    }
    return digits;
  };

  const fetchRegistrations = async (adminPin) => {
    setIsLoading(true);
    setError('');

    try {
      // 1. Try if adminPin is a secret key directly
      if (adminPin.startsWith('sb_secret_') || adminPin.startsWith('eyJ')) {
        const res = await fetch(
          `${SUPABASE_URL}/rest/v1/course_registrations?order=created_at.desc`,
          {
            headers: {
              apikey: adminPin,
              Authorization: `Bearer ${adminPin}`,
            },
          }
        );
        if (!res.ok) throw new Error('فشل التحقق من المفتاح السري');
        const data = await res.json();
        setRegistrations(data);
        setIsAuthenticated(true);
        localStorage.setItem('zainstein_admin_pin', adminPin);
        setPin(adminPin);
        return;
      }

      // 2. Try the secure RPC with pin_code
      const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_admin_registrations`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ pin_code: adminPin }),
      });

      if (rpcRes.ok) {
        const data = await rpcRes.json();
        setRegistrations(data);
        setIsAuthenticated(true);
        localStorage.setItem('zainstein_admin_pin', adminPin);
        setPin(adminPin);
      } else {
        const errJson = await rpcRes.json().catch(() => ({}));
        if (rpcRes.status === 404) {
          throw new Error(
            'الـ RPC غير مفعل في Supabase بعد. أدخل المفتاح السري (sb_secret_...) لتفعيل لوحة التحكم فوراً.'
          );
        } else {
          throw new Error(errJson.message || 'رمز الدخول غير صحيح.');
        }
      }
    } catch (err) {
      console.error(err);
      setError(err.message || 'تعذّر جلب البيانات.');
      setIsAuthenticated(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!inputPin.trim()) return;
    fetchRegistrations(inputPin.trim());
  };

  const handleLogout = () => {
    localStorage.removeItem('zainstein_admin_pin');
    setPin('');
    setIsAuthenticated(false);
    setRegistrations([]);
    setInputPin('');
  };

  const handleDelete = async (id, name) => {
    if (!window.confirm(`هل أنت متأكد من حذف تسجيل "${name}"؟`)) return;

    try {
      if (pin.startsWith('sb_secret_') || pin.startsWith('eyJ')) {
        await fetch(`${SUPABASE_URL}/rest/v1/course_registrations?id=eq.${id}`, {
          method: 'DELETE',
          headers: {
            apikey: pin,
            Authorization: `Bearer ${pin}`,
          },
        });
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/rpc/delete_registration`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin_code: pin, reg_id: id }),
        });
      }
      setRegistrations((prev) => prev.filter((r) => r.id !== id));
    } catch (err) {
      alert('تعذّر الحذف');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      if (pin.startsWith('sb_secret_') || pin.startsWith('eyJ')) {
        await fetch(`${SUPABASE_URL}/rest/v1/course_registrations?id=eq.${id}`, {
          method: 'PATCH',
          headers: {
            apikey: pin,
            Authorization: `Bearer ${pin}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ status: newStatus }),
        });
      } else {
        await fetch(`${SUPABASE_URL}/rest/v1/rpc/update_registration_status`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin_code: pin, reg_id: id, new_status: newStatus }),
        });
      }
      setRegistrations((prev) =>
        prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r))
      );
    } catch (err) {
      alert('تعذّر تعديل الحالة');
    }
  };

  // Handle drill-down filter triggered from chart clicks
  const handleApplyChartFilter = ({ type, value }) => {
    // If clicking the same active filter, toggle it off
    if (activeChartFilter && activeChartFilter.type === type && activeChartFilter.value === value) {
      handleClearAllFilters();
      return;
    }

    let matcher = () => true;
    let label = `${value}`;

    if (type === 'gender') {
      matcher = (r) => detectGender(r.name) === value;
      label = `النوع: ${value}`;
    } else if (type === 'edu') {
      matcher = (r) => detectEducation(r.study_info, r.age) === value;
      label = `الحالة التعليمية: ${value}`;
    } else if (type === 'age') {
      matcher = (r) => detectAgeGroup(r.age) === value;
      label = `الفئة العمرية: ${value}`;
    } else if (type === 'country') {
      matcher = (r) => detectLocation(r.governorate).country === value;
      label = `الدولة: ${value}`;
    } else if (type === 'governorate') {
      matcher = (r) => detectLocation(r.governorate).governorate === value;
      label = `المحافظة: ${value}`;
    } else if (type === 'status') {
      if (value === 'pending') {
        matcher = (r) => r.status !== 'contacted';
        label = 'الحالة: لم يتم التواصل';
      } else if (value === 'new') {
        matcher = (r) => !r.status || r.status === 'new';
        label = 'الحالة: جديد';
      } else {
        matcher = (r) => r.status === value;
        label = `الحالة: ${value === 'contacted' ? 'تم التواصل' : 'مشترك مؤكد'}`;
      }
    }

    setActiveChartFilter({ type, value, label, matcher });

    // Smoothly scroll down to the registrations table
    setTimeout(() => {
      if (registrationsSectionRef.current) {
        registrationsSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleClearAllFilters = () => {
    setActiveChartFilter(null);
    setSearchQuery('');
    setStatusFilter('all');
    setGenderFilter('all');
    setEduFilter('all');
    setAgeFilter('all');
    setLocationFilter('all');
  };

  // Filtered registrations
  const filteredRegistrations = useMemo(() => {
    return registrations.filter((r) => {
      // 1. Chart Drill-down filter
      if (activeChartFilter && !activeChartFilter.matcher(r)) {
        return false;
      }

      // 2. Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchesName = r.name && r.name.toLowerCase().includes(q);
        const matchesPhone = r.phone && r.phone.includes(q);
        const matchesEmail = r.email && r.email.toLowerCase().includes(q);
        const matchesGov = r.governorate && r.governorate.toLowerCase().includes(q);
        const matchesStudy = r.study_info && r.study_info.toLowerCase().includes(q);
        const matchesCode = r.registration_code && r.registration_code.toLowerCase().includes(q);
        const matchesNum = r.registration_number && String(r.registration_number).includes(q);

        if (!matchesName && !matchesPhone && !matchesEmail && !matchesGov && !matchesStudy && !matchesCode && !matchesNum) {
          return false;
        }
      }

      // 3. Status filter
      if (statusFilter !== 'all') {
        if (statusFilter === 'pending') {
          if (r.status === 'contacted') return false;
        } else if (statusFilter === 'new') {
          if (r.status && r.status !== 'new') return false;
        } else if (r.status !== statusFilter) {
          return false;
        }
      }

      // 4. Gender filter
      if (genderFilter !== 'all' && detectGender(r.name) !== genderFilter) {
        return false;
      }

      // 5. Educational filter
      if (eduFilter !== 'all' && detectEducation(r.study_info, r.age) !== eduFilter) {
        return false;
      }

      // 6. Age filter
      if (ageFilter !== 'all' && detectAgeGroup(r.age) !== ageFilter) {
        return false;
      }

      // 7. Location filter
      if (locationFilter !== 'all') {
        const loc = detectLocation(r.governorate);
        if (loc.country !== locationFilter && loc.governorate !== locationFilter) {
          return false;
        }
      }

      return true;
    });
  }, [
    registrations,
    activeChartFilter,
    searchQuery,
    statusFilter,
    genderFilter,
    eduFilter,
    ageFilter,
    locationFilter,
  ]);

  const exportToCSV = () => {
    if (!registrations.length) return;
    const headers = [
      'رقم التسجيل',
      'كود التسجيل',
      'الاسم',
      'النوع (تقديري)',
      'رقم الهاتف',
      'البريد الإلكتروني',
      'السن',
      'الفئة العمرية',
      'المحافظة / الدولة',
      'التخصص / الدراسة',
      'الحالة التعليمية',
      'الحالة',
      'تاريخ التسجيل',
    ];

    const rows = registrations.map((r) => [
      r.registration_number || '',
      `"${r.registration_code || ''}"`,
      `"${r.name || ''}"`,
      `"${detectGender(r.name)}"`,
      `"${r.phone || ''}"`,
      `"${r.email || ''}"`,
      r.age || '',
      `"${detectAgeGroup(r.age)}"`,
      `"${r.governorate || ''}"`,
      `"${r.study_info || ''}"`,
      `"${detectEducation(r.study_info, r.age)}"`,
      `"${r.status || 'new'}"`,
      `"${new Date(r.created_at).toLocaleString('ar-EG')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zainstein_analytics_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const hasActiveFilters =
    Boolean(activeChartFilter) ||
    Boolean(searchQuery.trim()) ||
    statusFilter !== 'all' ||
    genderFilter !== 'all' ||
    eduFilter !== 'all' ||
    ageFilter !== 'all' ||
    locationFilter !== 'all';

  return (
    <div className="admin-container">
      {/* TOP HEADER */}
      <header className="admin-header">
        <div className="admin-brand">
          <img src="/zainstein-logo.png" alt="Zainstein" className="admin-logo" />
          <div className="admin-badge">لوحة الإدارة & التحليلات ⚡</div>
        </div>
        <div className="admin-nav-actions">
          {isAuthenticated && (
            <>
              <button
                className="btn-admin-action yellow"
                onClick={() => setIsBroadcastOpen(true)}
                title="إرسال رسائل المتابعة وتحديثات السوشيال ميديا لجميع المسجلين"
                disabled={!registrations.length}
              >
                <Send size={15} />
                <span className="hide-mobile">حملة الواتساب</span>
              </button>

              <button
                className="btn-admin-action"
                onClick={() => fetchRegistrations(pin)}
                title="تحديث البيانات من السيرفر"
                disabled={isLoading}
              >
                <RefreshCw size={15} className={isLoading ? 'spin' : ''} />
                <span className="hide-mobile">تحديث</span>
              </button>

              <button
                className="btn-admin-action green"
                onClick={exportToCSV}
                title="تصدير السجلات إلى ملف Excel (CSV)"
                disabled={!registrations.length}
              >
                <Download size={15} />
                <span className="hide-mobile">تحميل Excel</span>
              </button>

              <button className="btn-admin-logout" onClick={handleLogout}>
                خروج
              </button>
            </>
          )}

          <button className="btn-admin-back" onClick={onBack}>
            <ArrowLeft size={16} />
            <span>العودة للموقع</span>
          </button>
        </div>
      </header>

      {/* LOGIN VIEW */}
      {!isAuthenticated ? (
        <main className="admin-login-wrap">
          <div className="admin-login-card">
            <div className="admin-lock-icon">
              <Lock size={32} strokeWidth={2.5} />
            </div>
            <h2>تسجيل دخول المشرف</h2>
            <p className="admin-sub">
              أدخل رمز الدخول (PIN) الخاص بك لمتابعة المسجلين والتحليلات الإحصائية للكورس.
            </p>

            {error && (
              <div className="admin-error-box">
                <AlertCircle size={18} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="fg">
                <label htmlFor="admin-pin">رمز الدخول السري (PIN)</label>
                <input
                  id="admin-pin"
                  type="password"
                  placeholder="أدخل الـ PIN مثلاً: 2026"
                  value={inputPin}
                  onChange={(e) => setInputPin(e.target.value)}
                  autoFocus
                />
              </div>
              <button type="submit" className="btn-submit" disabled={isLoading}>
                {isLoading ? 'جارٍ التحقق...' : 'فتح لوحة الإدارة والتحليلات ⚡'}
              </button>
            </form>

            <div className="admin-hint">
              <strong>ملاحظة:</strong> الرمز الافتراضي هو <code>2026</code> (أو يمكنك استخدام المفتاح السري لـ Supabase).
            </div>
          </div>
        </main>
      ) : (
        /* DASHBOARD VIEW */
        <main className="admin-main">
          {/* 1. ANALYTICS & KPIS SECTION */}
          <AnalyticsView
            registrations={registrations}
            onApplyFilter={handleApplyChartFilter}
            activeFilter={activeChartFilter}
            onClearFilter={handleClearAllFilters}
          />

          {/* 2. REGISTRATIONS LIST & ADVANCED SEARCH SECTION */}
          <section
            id="registrations-section"
            ref={registrationsSectionRef}
            className="admin-registrations-section"
          >
            {/* SECTION HEADER */}
            <div className="registrations-section-header">
              <div className="section-title-wrap">
                <div className="section-title-pill">
                  <Users size={18} strokeWidth={2.5} />
                  <h3>سجل التسجيلات الحقيقية المعتمدة</h3>
                </div>
                <span className="real-counter-badge font-mono">
                  {filteredRegistrations.length === registrations.length
                    ? `إجمالي المسجلين: ${formatNumber(registrations.length)} تسجيل حقيقي`
                    : `عرض ${formatNumber(filteredRegistrations.length)} من إجمالي ${formatNumber(registrations.length)} تسجيل حقيقي`}
                </span>
              </div>

              {hasActiveFilters && (
                <button
                  type="button"
                  className="btn-reset-filters"
                  onClick={handleClearAllFilters}
                  title="مسح كل الفلاتر وعرض القائمة كاملة"
                >
                  <RotateCcw size={14} />
                  <span>إعادة ضبط الفلاتر</span>
                </button>
              )}
            </div>

            {/* ADVANCED FILTERS BAR */}
            <div className="admin-advanced-filters-card">
              <div className="filters-main-row">
                <div className="admin-search">
                  <Search size={18} className="search-icon" />
                  <input
                    type="text"
                    placeholder="ابحث بالاسم، التليفون، البريد، كود التسجيل..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      className="search-clear-btn"
                      onClick={() => setSearchQuery('')}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="filter-select-group">
                  {/* Status Filter */}
                  <div className="filter-item">
                    <label>الحالة:</label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="all">كل الحالات ({registrations.length})</option>
                      <option value="new">جديد</option>
                      <option value="contacted">تم التواصل</option>
                      <option value="pending">لم يتم التواصل</option>
                      <option value="enrolled">مشترك مؤكد</option>
                    </select>
                  </div>

                  {/* Gender Filter */}
                  <div className="filter-item">
                    <label>النوع:</label>
                    <select
                      value={genderFilter}
                      onChange={(e) => setGenderFilter(e.target.value)}
                    >
                      <option value="all">الكل</option>
                      <option value="ذكور">ذكور</option>
                      <option value="إناث">إناث</option>
                      <option value="غير محدد">غير محدد</option>
                    </select>
                  </div>

                  {/* Education Filter */}
                  <div className="filter-item">
                    <label>التعليم:</label>
                    <select
                      value={eduFilter}
                      onChange={(e) => setEduFilter(e.target.value)}
                    >
                      <option value="all">الكل</option>
                      <option value="طلاب">طلاب</option>
                      <option value="خريجون">خريجون</option>
                      <option value="عاملون">عاملون ومحترفون</option>
                    </select>
                  </div>

                  {/* Age Group Filter */}
                  <div className="filter-item">
                    <label>السن:</label>
                    <select
                      value={ageFilter}
                      onChange={(e) => setAgeFilter(e.target.value)}
                    >
                      <option value="all">كل الأعمار</option>
                      <option value="أقل من 18 سنة">أقل من 18</option>
                      <option value="من 18 إلى 23 سنة">18 - 23 سنة</option>
                      <option value="من 24 إلى 28 سنة">24 - 28 سنة</option>
                      <option value="من 29 إلى 40 سنة">29 - 40 سنة</option>
                      <option value="أكبر من 40 سنة">أكبر من 40</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Active Filter Indicators */}
              {hasActiveFilters && (
                <div className="active-filters-tags-row">
                  <span className="tags-label">الفلاتر المطبقة:</span>
                  {activeChartFilter && (
                    <span className="filter-tag-chip chart-tag">
                      <span>{activeChartFilter.label}</span>
                      <X size={12} onClick={() => setActiveChartFilter(null)} />
                    </span>
                  )}
                  {searchQuery && (
                    <span className="filter-tag-chip">
                      <span>بحث: "{searchQuery}"</span>
                      <X size={12} onClick={() => setSearchQuery('')} />
                    </span>
                  )}
                  {statusFilter !== 'all' && (
                    <span className="filter-tag-chip">
                      <span>الحالة: {statusFilter}</span>
                      <X size={12} onClick={() => setStatusFilter('all')} />
                    </span>
                  )}
                  {genderFilter !== 'all' && (
                    <span className="filter-tag-chip">
                      <span>النوع: {genderFilter}</span>
                      <X size={12} onClick={() => setGenderFilter('all')} />
                    </span>
                  )}
                  {eduFilter !== 'all' && (
                    <span className="filter-tag-chip">
                      <span>التعليم: {eduFilter}</span>
                      <X size={12} onClick={() => setEduFilter('all')} />
                    </span>
                  )}
                  {ageFilter !== 'all' && (
                    <span className="filter-tag-chip">
                      <span>السن: {ageFilter}</span>
                      <X size={12} onClick={() => setAgeFilter('all')} />
                    </span>
                  )}
                  {locationFilter !== 'all' && (
                    <span className="filter-tag-chip">
                      <span>الموقع: {locationFilter}</span>
                      <X size={12} onClick={() => setLocationFilter('all')} />
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* STUDENTS CARDS LIST */}
            <div className="admin-cards-list">
              {filteredRegistrations.length === 0 ? (
                <div className="admin-empty">
                  <Users size={48} strokeWidth={1.5} />
                  <h3>لا توجد تسجيلات مطابقة</h3>
                  <p>لم يتم العثور على أي بيانات مطابقة للفلاتر أو كلمة البحث الحالية.</p>
                  <button
                    type="button"
                    className="btn-reset-empty"
                    onClick={handleClearAllFilters}
                  >
                    إلغاء كل الفلاتر وعرض الجميع
                  </button>
                </div>
              ) : (
                filteredRegistrations.map((reg) => {
                  const waPhone = formatEgyptianPhone(reg.phone);
                  const waText = generateWhatsAppMessage({
                    name: reg.name,
                    email: reg.email,
                    phone: reg.phone,
                    age: reg.age,
                    governorate: reg.governorate,
                    study_info: reg.study_info,
                    registration_number: reg.registration_number,
                    registration_code: reg.registration_code,
                  });
                  const waMsg = encodeURIComponent(waText);

                  const detectedG = detectGender(reg.name);
                  const detectedE = detectEducation(reg.study_info, reg.age);
                  const detectedA = detectAgeGroup(reg.age);

                  return (
                    <article key={reg.id} className="admin-reg-card">
                      <div className="reg-card-top">
                        <div className="reg-title-wrap">
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '8px',
                              flexWrap: 'wrap',
                            }}
                          >
                            <h3>{reg.name}</h3>
                            {reg.registration_number && (
                              <span className="reg-number-chip">
                                #{reg.registration_number}
                              </span>
                            )}
                            {reg.registration_code && (
                              <span className="reg-code-badge font-mono">
                                {reg.registration_code}
                              </span>
                            )}
                          </div>

                          <div className="reg-auto-tags">
                            <span className={`tag-mini gender-${detectedG}`}>
                              {detectedG}
                            </span>
                            <span className="tag-mini edu">{detectedE}</span>
                            <span className="tag-mini age">{detectedA}</span>
                          </div>

                          <span className={`reg-badge status-${reg.status || 'new'}`}>
                            {reg.status === 'contacted'
                              ? 'تم التواصل'
                              : reg.status === 'enrolled'
                              ? 'مشترك مؤكد'
                              : 'تسجيل جديد'}
                          </span>
                        </div>
                        <div className="reg-time">
                          <Clock size={14} />
                          <span>{new Date(reg.created_at).toLocaleString('ar-EG')}</span>
                        </div>
                      </div>

                      <div className="reg-details-grid">
                        <div className="reg-field">
                          <Phone size={15} />
                          <span className="field-val" dir="ltr">
                            {reg.phone}
                          </span>
                        </div>
                        <div className="reg-field">
                          <Mail size={15} />
                          <a href={`mailto:${reg.email}`} className="field-link">
                            {reg.email}
                          </a>
                        </div>
                        <div className="reg-field">
                          <MapPin size={15} />
                          <span className="field-val">{reg.governorate}</span>
                        </div>
                        <div className="reg-field">
                          <GraduationCap size={15} />
                          <span className="field-val">
                            {reg.age} سنة — {reg.study_info}
                          </span>
                        </div>
                      </div>

                      <div className="reg-card-bottom">
                        <div className="reg-whatsapp-action">
                          {waPhone ? (
                            <>
                              <a
                                href={`https://wa.me/${waPhone}?text=${waMsg}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-whatsapp"
                                title="فتح محادثة واتساب بالرسالة الترحيبية وتفاصيل الكورس"
                              >
                                <MessageSquare size={16} fill="currentColor" />
                                <span>التواصل واتساب</span>
                              </a>

                              <button
                                type="button"
                                className={`btn-copy-wa ${copiedWaId === reg.id ? 'copied' : ''}`}
                                onClick={() => handleCopyWaMessage(reg.id, waText)}
                                title="نسخ نص الرسالة بالكامل إلى الحافظة"
                              >
                                {copiedWaId === reg.id ? <Check size={14} /> : <Copy size={14} />}
                                <span>
                                  {copiedWaId === reg.id ? 'تم نسخ الرسالة' : 'نسخ النص'}
                                </span>
                              </button>
                            </>
                          ) : (
                            <span className="text-muted">رقم غير صالح</span>
                          )}
                        </div>

                        <div className="reg-status-changer">
                          <label>الحالة:</label>
                          <select
                            value={reg.status || 'new'}
                            onChange={(e) => handleStatusChange(reg.id, e.target.value)}
                          >
                            <option value="new">جديد</option>
                            <option value="contacted">تم التواصل</option>
                            <option value="enrolled">مشترك مؤكد</option>
                          </select>

                          <button
                            type="button"
                            className="btn-delete"
                            onClick={() => handleDelete(reg.id, reg.name)}
                            title="حذف هذا السجل"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })
              )}
            </div>
          </section>
        </main>
      )}

      {/* BROADCAST MODAL */}
      <BroadcastModal
        isOpen={isBroadcastOpen}
        onClose={() => setIsBroadcastOpen(false)}
        registrations={registrations}
      />
    </div>
  );
}
