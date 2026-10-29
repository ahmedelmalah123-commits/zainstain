import React, { useState } from 'react';
import {
  X,
  Search,
  CheckCircle2,
  AlertCircle,
  Award,
  Sparkles,
  Zap,
  Wrench,
  ShieldCheck,
  Gift,
} from 'lucide-react';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '') || '';
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';

export default function VerifyCodeModal({ isOpen, onClose }) {
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleVerify = async (e) => {
    e.preventDefault();
    const cleanCode = code.trim().toUpperCase();
    if (!cleanCode) {
      setError('من فضلك أدخل كود التسجيل (مثال: ZS101A)');
      return;
    }

    setLoading(true);
    setError('');
    setResult(null);

    try {
      // 1. Try the verify_registration_code RPC
      const res = await fetch(`${SUPABASE_URL}/rest/v1/rpc/verify_registration_code`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ p_code: cleanCode }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.valid) {
          setResult(data);
        } else {
          setError(data.message || 'كود التسجيل غير مسجل في النظام');
        }
      } else {
        // Fallback: check admin registrations if RPC isn't loaded
        const adminRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_admin_registrations`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ pin_code: '2026' }),
        });

        if (adminRes.ok) {
          const list = await adminRes.json();
          const match = list.find(
            (r) =>
              (r.registration_code && r.registration_code.toUpperCase() === cleanCode) ||
              cleanCode.includes(String(r.registration_number || ''))
          );

          if (match) {
            setResult({
              valid: true,
              registration_number: match.registration_number || 100,
              registration_code: match.registration_code || cleanCode,
              student_first_name: match.name ? match.name.split(' ')[0] : 'طالب',
              course_name: 'Foundation of Software Engineering and Artificial Intelligence',
              voucher_discount: '100%',
              workshop_included: true,
              early_access: true,
            });
          } else {
            setError('كود التسجيل غير موجود في قاعدة البيانات');
          }
        } else {
          setError('تعذّر التحقق من الكود حاليًا. يرجى المحاولة لاحقًا.');
        }
      }
    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء التحقق من الكود.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overlay open" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal verify-modal">
        <button className="modal-close" onClick={onClose} aria-label="إغلاق">
          <X size={18} strokeWidth={3} />
        </button>

        <div className="modal-icon verify">
          <ShieldCheck size={28} strokeWidth={2.5} />
        </div>

        <h2>التحقق من كود التسجيل</h2>
        <p className="sub">
          أدخل كود التسجيل الخاص بك (Registration Code) للتأكد من حالة تسجيلك وتفعيل الفاوتشر والورشة.
        </p>

        <form onSubmit={handleVerify} className="verify-form">
          <div className="fg">
            <label htmlFor="verify-code-input">كود التسجيل (مثال: ZS101A)</label>
            <div className="verify-input-wrap">
              <input
                id="verify-code-input"
                type="text"
                placeholder="أدخل الكود مثل: ZS101A"
                value={code}
                onChange={(e) => setCode(e.target.value.toUpperCase())}
                autoFocus
              />
              <button type="submit" className="btn-verify-submit" disabled={loading}>
                {loading ? 'جارٍ التحقق...' : <Search size={18} />}
              </button>
            </div>
          </div>
        </form>

        {error && (
          <div className="verify-error-box">
            <AlertCircle size={20} />
            <span>{error}</span>
          </div>
        )}

        {result && (
          <div className="verify-result-card">
            <div className="verify-badge-status">
              <CheckCircle2 size={18} />
              <span>كود صالح ومسجل رسميًا</span>
            </div>

            <h3 className="verify-student-name">
              أهلاً بك يا {result.student_first_name || 'طالب متميز'}
            </h3>

            <div className="verify-stats-row">
              <div className="verify-stat">
                <span className="v-label">رقم التسجيل:</span>
                <span className="v-val">#{result.registration_number}</span>
              </div>
              <div className="verify-stat">
                <span className="v-label">كود الطالب:</span>
                <span className="v-val code">{result.registration_code}</span>
              </div>
            </div>

            <div className="verify-perks">
              <div className="v-perk-item">
                <Gift size={16} className="v-icon" />
                <span>قسيمة خصم 100% مفعلة (Voucher Free)</span>
              </div>
              <div className="v-perk-item">
                <Zap size={16} className="v-icon" />
                <span>أولوية الوصول المبكر للكورس (Early Access)</span>
              </div>
              <div className="v-perk-item">
                <Wrench size={16} className="v-icon" />
                <span>ورشة العمل التطبيقية مشمولة مجانًا</span>
              </div>
            </div>

            <p className="verify-footer-note">
              كورس: <strong>{result.course_name}</strong>
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
