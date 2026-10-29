import React, { useState, useEffect } from 'react';
import {
  Lock,
  Unlock,
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
  AlertCircle,
  Clock,
  BookOpen,
} from 'lucide-react';
import { generateWhatsAppMessage } from './utils/emailTemplate';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [copiedWaId, setCopiedWaId] = useState(null);

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
        const res = await fetch(`${SUPABASE_URL}/rest/v1/course_registrations?order=created_at.desc`, {
          headers: {
            apikey: adminPin,
            Authorization: `Bearer ${adminPin}`,
          },
        });
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
          throw new Error('الـ RPC غير مفعل في Supabase بعد. أدخل المفتاح السري (sb_secret_...) لتفعيل لوحة التحكم فوراً.');
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

  const exportToCSV = () => {
    if (!registrations.length) return;
    const headers = [
      'رقم التسجيل',
      'كود التسجيل',
      'الاسم',
      'رقم الهاتف',
      'البريد الإلكتروني',
      'السن',
      'المحافظة',
      'التخصص',
      'الحالة',
      'تاريخ التسجيل',
    ];
    const rows = registrations.map((r) => [
      r.registration_number || '',
      `"${r.registration_code || ''}"`,
      `"${r.name || ''}"`,
      `"${r.phone || ''}"`,
      `"${r.email || ''}"`,
      r.age || '',
      `"${r.governorate || ''}"`,
      `"${r.study_info || ''}"`,
      `"${r.status || 'new'}"`,
      `"${new Date(r.created_at).toLocaleString('ar-EG')}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `zainstein_registrations_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filteredRegistrations = registrations.filter((r) => {
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.phone && r.phone.includes(q)) ||
      (r.email && r.email.toLowerCase().includes(q)) ||
      (r.governorate && r.governorate.toLowerCase().includes(q)) ||
      (r.study_info && r.study_info.toLowerCase().includes(q)) ||
      (r.registration_code && r.registration_code.toLowerCase().includes(q)) ||
      (r.registration_number && String(r.registration_number).includes(q));

    const matchesStatus = statusFilter === 'all' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="admin-container">
      {/* TOP HEADER */}
      <header className="admin-header">
        <div className="admin-brand">
          <img src="/zainstein-logo.png" alt="Zainstein" className="admin-logo" />
          <div className="admin-badge">لوحة الإدارة</div>
        </div>
        <div className="admin-nav-actions">
          {isAuthenticated && (
            <button className="btn-admin-logout" onClick={handleLogout}>
              خروج
            </button>
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
            <p className="admin-sub">أدخل رمز الدخول (PIN) الخاص بك لمتابعة المسجلين في الكورس.</p>

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
                {isLoading ? 'جارٍ التحقق...' : 'فتح لوحة التحكم'}
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
          {/* STATS CARDS */}
          <section className="admin-stats-grid">
            <div className="admin-stat-card yellow">
              <div className="admin-stat-icon">
                <Users size={24} strokeWidth={2.5} />
              </div>
              <div className="admin-stat-content">
                <span className="stat-label">إجمالي المسجلين</span>
                <span className="stat-number">{registrations.length}</span>
              </div>
            </div>

            <div className="admin-stat-card mint">
              <div className="admin-stat-icon">
                <Clock size={24} strokeWidth={2.5} />
              </div>
              <div className="admin-stat-content">
                <span className="stat-label">تسجيلات جديدة</span>
                <span className="stat-number">
                  {registrations.filter((r) => !r.status || r.status === 'new').length}
                </span>
              </div>
            </div>

            <div className="admin-stat-card lilac">
              <div className="admin-stat-icon">
                <Check size={24} strokeWidth={2.5} />
              </div>
              <div className="admin-stat-content">
                <span className="stat-label">تم التواصل معهم</span>
                <span className="stat-number">
                  {registrations.filter((r) => r.status === 'contacted').length}
                </span>
              </div>
            </div>
          </section>

          {/* CONTROLS BAR */}
          <section className="admin-controls">
            <div className="admin-search">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="ابحث بالاسم أو التليفون أو المحافظة..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="admin-filters">
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                <option value="all">كل الحالات ({registrations.length})</option>
                <option value="new">جديد فقط</option>
                <option value="contacted">تم التواصل</option>
                <option value="enrolled">مشترك مؤكد</option>
              </select>

              <button
                className="btn-admin-action"
                onClick={() => fetchRegistrations(pin)}
                title="تحديث البيانات"
                disabled={isLoading}
              >
                <RefreshCw size={16} className={isLoading ? 'spin' : ''} />
                <span>تحديث</span>
              </button>

              <button
                className="btn-admin-action green"
                onClick={exportToCSV}
                title="تصدير إلى إكسل"
                disabled={!registrations.length}
              >
                <Download size={16} />
                <span>تحميل Excel</span>
              </button>
            </div>
          </section>

          {/* STUDENTS LIST */}
          <section className="admin-cards-list">
            {filteredRegistrations.length === 0 ? (
              <div className="admin-empty">
                <Users size={48} strokeWidth={1.5} />
                <h3>لا توجد تسجيلات مطابقة</h3>
                <p>لم يتم العثور على أي بيانات مطابقة لبحثك.</p>
              </div>
            ) : (
              filteredRegistrations.map((reg) => {
                const waPhone = formatEgyptianPhone(reg.phone);
                const waText = generateWhatsAppMessage({
                  name: reg.name,
                  registrationNumber: reg.registration_number,
                  registrationCode: reg.registration_code,
                  adminName: 'أحمد الملاح',
                });
                const waMsg = encodeURIComponent(waText);

                return (
                  <article key={reg.id} className="admin-reg-card">
                    <div className="reg-card-top">
                      <div className="reg-title-wrap">
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                          <h3>{reg.name}</h3>
                          {reg.registration_number && (
                            <span className="reg-number-chip">#{reg.registration_number}</span>
                          )}
                          {reg.registration_code && (
                            <span className="reg-code-badge">{reg.registration_code}</span>
                          )}
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
                              title="فتح محادثة واتساب بالرسالة الترحيبية وتفاصيل الباقة"
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
                              <span>{copiedWaId === reg.id ? 'تم نسخ الرسالة' : 'نسخ النص'}</span>
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
          </section>
        </main>
      )}
    </div>
  );
}
