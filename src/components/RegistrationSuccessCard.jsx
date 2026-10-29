import React, { useState } from 'react';
import {
  Check,
  Copy,
  CheckCheck,
  Download,
  Share2,
  Sparkles,
  Award,
  Zap,
  Wrench,
  Mail,
  MessageSquare,
} from 'lucide-react';
import { downloadPassImage } from '../utils/generatePassImage';

export default function RegistrationSuccessCard({
  registrationData,
  onClose,
}) {
  const [copied, setCopied] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const {
    name = '',
    email = '',
    phone = '',
    registration_number = 101,
    registration_code = 'ZS101A',
    course_name = 'Foundation of Software Engineering and Artificial Intelligence',
  } = registrationData || {};

  const handleCopyCode = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(registration_code);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = registration_code;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.warn('Copy failed:', err);
    }
  };

  const handleDownload = () => {
    setDownloading(true);
    try {
      downloadPassImage({
        name,
        registrationNumber: registration_number,
        registrationCode: registration_code,
        courseName: course_name,
      });
    } catch (err) {
      console.error('Download pass error:', err);
    } finally {
      setTimeout(() => setDownloading(false), 1000);
    }
  };

  const handleShare = async () => {
    const text = `🎉 سجلت في كورس "${course_name}" وحصلت على قسيمة خصم 100% ورشة عمل تطبيقية مجانية! كود التسجيل الخاص بي: ${registration_code} — ورقمي: #${registration_number}`;
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'بطاقة تسجيل كورس Zainstein',
          text,
          url: window.location.origin,
        });
      } catch (e) {
        // user cancelled
      }
    } else {
      handleCopyCode();
      alert('تم نسخ تفاصيل التسجيل والكود للمشاركة بنجاح!');
    }
  };

  return (
    <div className="reg-success-container">
      {/* SUCCESS TOP BANNER */}
      <div className="reg-success-header">
        <div className="reg-success-badge">
          <Sparkles size={16} />
          <span>تهانينا! أنت الآن مسجل رسميًا</span>
        </div>
        <h2 className="reg-success-title">تم تأكيد تسجيلك بنجاح 🎉</h2>
        <p className="reg-success-sub">
          أهلاً بك يا <strong>{name}</strong>! تم حجز مقعدك وتوليد بطاقة تسجيلك الرسمية.
        </p>
      </div>

      {/* THE VIP REGISTRATION PASS CARD */}
      <div className="vip-ticket-card" id="student-pass-card">
        {/* Ticket Header */}
        <div className="ticket-top-bar">
          <div className="ticket-badge">
            <Award size={16} />
            <span>بطاقة طالب معتمدة — VIP Early Access</span>
          </div>
          <div className="ticket-rank-chip">
            المسجل رقم <strong>#{registration_number}</strong>
          </div>
        </div>

        {/* Course Info */}
        <div className="ticket-course-block">
          <span className="ticket-label">الكورس المسجل:</span>
          <h3 className="ticket-course-name">{course_name}</h3>
        </div>

        {/* CODE HIGHLIGHT BOX */}
        <div className="ticket-code-section">
          <span className="code-label">كود التسجيل المميز الخاص بك (Registration Code)</span>
          <div className="code-display-wrap">
            <span className="code-value">{registration_code}</span>
            <button
              type="button"
              className={`btn-copy-code ${copied ? 'copied' : ''}`}
              onClick={handleCopyCode}
              title="نسخ كود التسجيل"
            >
              {copied ? (
                <>
                  <CheckCheck size={16} />
                  <span>تم النسخ!</span>
                </>
              ) : (
                <>
                  <Copy size={16} />
                  <span>نسخ الكود</span>
                </>
              )}
            </button>
          </div>
          <p className="code-hint">
            احتفظ بهذا الكود؛ فهو يثبت ترتيبك <strong>(#{registration_number})</strong> واستحقاقك للفاوتشر.
          </p>
        </div>

        {/* 100% VOUCHER NOTIFICATION */}
        <div className="ticket-voucher-box">
          <div className="voucher-icon">🎁</div>
          <div className="voucher-details">
            <h4>قسيمة خصم 100% مفعلة (Voucher 100% OFF)</h4>
            <p>حصلت على خصم 100% الكامل على الكورس — مقعدك مجاني بالكامل ضمن هذه الدفعة!</p>
          </div>
        </div>

        {/* EXCLUSIVE PERKS */}
        <div className="ticket-perks-box">
          <div className="perks-heading">المميزات الحصرية المشمولة بتسجيلك:</div>
          <ul className="perks-list">
            <li>
              <Zap size={18} className="perk-icon yellow" />
              <div>
                <strong>من أوائل المستفيدين (Early Bird Access):</strong>
                <span>أولوية الوصول إلى المحتوى والمنصة فور الانطلاق.</span>
              </div>
            </li>
            <li>
              <Wrench size={18} className="perk-icon mint" />
              <div>
                <strong>ورشة عمل تطبيقية مجانية:</strong>
                <span>حضور ورشة عمل عملية مكثفة لبناء وتطبيق مشاريع واقعية مع الكورس.</span>
              </div>
            </li>
          </ul>
        </div>

        {/* EMAIL CONFIRMATION NOTE */}
        <div className="ticket-email-note">
          <Mail size={16} />
          <span>
            تم إرسال نسخة من بطاقة التأكيد وتفاصيل الكود إلى بريدك الإلكتروني: <strong>{email}</strong>
          </span>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="reg-actions-grid">
        <button
          type="button"
          className="btn-action-pass download"
          onClick={handleDownload}
          disabled={downloading}
        >
          <Download size={18} />
          <span>{downloading ? 'جارٍ التحميل...' : 'حفظ البطاقة كصورة (PNG)'}</span>
        </button>

        <button
          type="button"
          className="btn-action-pass share"
          onClick={handleShare}
        >
          <Share2 size={18} />
          <span>مشاركة الكارت</span>
        </button>

        <button
          type="button"
          className="btn-action-pass close"
          onClick={onClose}
        >
          <Check size={18} />
          <span>تم، إغلاق النافذة</span>
        </button>
      </div>
    </div>
  );
}
