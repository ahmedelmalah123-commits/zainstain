import React, { useState, useEffect } from 'react';
import {
  X,
  Send,
  Check,
  Copy,
  ExternalLink,
  MessageSquare,
  Users,
  Search,
  Sparkles,
  RotateCcw,
} from 'lucide-react';

const DEFAULT_MESSAGE = `أهلًا تاني 👋

عشان أي جديد عن الكورس يوصلك في وقته، خلّي بالك إننا هننشر كل التحديثات والإعلانات على صفحاتنا. تابعنا على الاتنين:

فيسبوك:
https://www.facebook.com/share/1FxuC8BCBj/?mibextid=wwXIfr

إنستجرام:
https://www.instagram.com/zain.stein

ولو عندك أي سؤال، ابعتلنا على الصفحة وهنرد عليك.

نورتنا 🚀`;

function cleanEgyptianPhone(raw) {
  if (!raw) return '';
  let digits = raw.replace(/[^\d+]/g, '');
  const arabicDigits = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  for (let i = 0; i < 10; i++) {
    digits = digits.split(arabicDigits[i]).join(i.toString());
  }
  digits = digits.replace(/\D/g, '');
  if (digits.startsWith('01')) digits = '2' + digits;
  else if (digits.startsWith('1') && digits.length === 10) digits = '20' + digits;
  return digits;
}

export default function BroadcastModal({ isOpen, onClose, registrations = [] }) {
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [platformMode, setPlatformMode] = useState('web'); // 'web' or 'app'
  const [sentMap, setSentMap] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('zainstein_broadcast_sent') || '{}');
    } catch {
      return {};
    }
  });
  const [filterSearch, setFilterSearch] = useState('');

  // Extract unique valid recipients
  const uniqueRecipients = React.useMemo(() => {
    const map = new Map();
    for (const reg of registrations) {
      const clean = cleanEgyptianPhone(reg.phone);
      // Skip obvious test phone numbers like 01011112222
      if (clean && clean.length >= 11 && clean !== '201011112222') {
        if (!map.has(clean)) {
          map.set(clean, {
            ...reg,
            cleanPhone: clean,
          });
        }
      }
    }
    return Array.from(map.values());
  }, [registrations]);

  const filtered = uniqueRecipients.filter((r) => {
    const q = filterSearch.toLowerCase().trim();
    if (!q) return true;
    return (
      (r.name && r.name.toLowerCase().includes(q)) ||
      (r.cleanPhone && r.cleanPhone.includes(q)) ||
      (r.governorate && r.governorate.toLowerCase().includes(q)) ||
      (r.registration_code && r.registration_code.toLowerCase().includes(q))
    );
  });

  const sentCount = uniqueRecipients.filter((r) => sentMap[r.cleanPhone]).length;
  const progressPercent = uniqueRecipients.length
    ? Math.round((sentCount / uniqueRecipients.length) * 100)
    : 0;

  const toggleSent = (phone) => {
    const updated = { ...sentMap, [phone]: !sentMap[phone] };
    setSentMap(updated);
    try {
      localStorage.setItem('zainstein_broadcast_sent', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage save notice:', e);
    }
  };

  const resetSent = () => {
    if (window.confirm('هل تريد إعادة تعيين حالات الإرسال والبدء من جديد؟')) {
      setSentMap({});
      localStorage.removeItem('zainstein_broadcast_sent');
    }
  };

  const handleCopyMessage = () => {
    if (navigator?.clipboard?.writeText) {
      navigator.clipboard.writeText(message);
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2000);
    }
  };

  const getWaLink = (cleanPhone) => {
    const encoded = encodeURIComponent(message);
    if (platformMode === 'web') {
      return `https://web.whatsapp.com/send?phone=${cleanPhone}&text=${encoded}`;
    }
    return `https://wa.me/${cleanPhone}?text=${encoded}`;
  };

  const openNextUnsent = () => {
    const next = uniqueRecipients.find((r) => !sentMap[r.cleanPhone]);
    if (!next) {
      alert('تهانينا! لقد تم إرسال الرسالة لجميع الطلاب المسجلين.');
      return;
    }
    const link = getWaLink(next.cleanPhone);
    window.open(link, '_blank');
    toggleSent(next.cleanPhone);
  };

  if (!isOpen) return null;

  return (
    <div className="broadcast-modal-overlay" onClick={onClose}>
      <div className="broadcast-modal-box" onClick={(e) => e.stopPropagation()}>
        {/* HEADER */}
        <div className="broadcast-header">
          <div className="broadcast-title-wrap">
            <span className="badge-chip">
              <Sparkles size={14} />
              حملة رسائل المتابعة (سوشيال ميديا)
            </span>
            <h2>إرسال التحديثات لجميع المسجلين</h2>
            <p>
              إرسال روابط صفحات الفيسبوك وإنستجرام عبر محادثات واتساب المباشرة لـ{' '}
              <strong>{uniqueRecipients.length}</strong> طالب مسجل.
            </p>
          </div>
          <button className="btn-close-modal" onClick={onClose} aria-label="إغلاق">
            <X size={20} />
          </button>
        </div>

        {/* PROGRESS BAR */}
        <div className="broadcast-progress-bar-wrap">
          <div className="broadcast-progress-info">
            <span>
              تم الإرسال: <strong>{sentCount}</strong> من <strong>{uniqueRecipients.length}</strong> طالب ({progressPercent}%)
            </span>
            {sentCount > 0 && (
              <button className="btn-text-link" onClick={resetSent}>
                <RotateCcw size={13} />
                <span>إعادة ضبط</span>
              </button>
            )}
          </div>
          <div className="broadcast-progress-track">
            <div
              className="broadcast-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* MESSAGE PREVIEW & EDIT */}
        <div className="broadcast-message-section">
          <div className="msg-header-row">
            <label>نص الرسالة المجهز للإرسال:</label>
            <div className="msg-actions">
              <div className="platform-toggle">
                <button
                  type="button"
                  className={platformMode === 'web' ? 'active' : ''}
                  onClick={() => setPlatformMode('web')}
                  title="الفتح المباشر داخل واتساب ويب في المتصفح"
                >
                  واتساب ويب (WhatsApp Web)
                </button>
                <button
                  type="button"
                  className={platformMode === 'app' ? 'active' : ''}
                  onClick={() => setPlatformMode('app')}
                  title="الفتح عبر تطبيق الهاتف أو الويندوز"
                >
                  تطبيق واتساب (wa.me)
                </button>
              </div>

              <button
                type="button"
                className="btn-copy-mini"
                onClick={handleCopyMessage}
              >
                {copiedMsg ? <Check size={14} /> : <Copy size={14} />}
                <span>{copiedMsg ? 'تم نسخ النص' : 'نسخ الرسالة'}</span>
              </button>
            </div>
          </div>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={6}
            className="broadcast-textarea"
          />
        </div>

        {/* QUICK NEXT BUTTON */}
        <div className="broadcast-quick-bar">
          <button
            type="button"
            className="btn-open-next"
            onClick={openNextUnsent}
            disabled={sentCount === uniqueRecipients.length}
          >
            <Send size={16} />
            <span>
              {sentCount === uniqueRecipients.length
                ? 'تم الانتهاء من جميع المسجلين'
                : 'فتح محادثة الطالب التالي تلقائياً في واتساب'}
            </span>
          </button>
          <span className="quick-hint">
            (يفتح شات واتساب ومكتوب فيه الرسالة جاهزة، تضغط Enter فقط للإرسال)
          </span>
        </div>

        {/* RECIPIENTS LIST */}
        <div className="broadcast-list-section">
          <div className="list-top-bar">
            <h3>قائمة الطلاب المسجلين ({filtered.length}):</h3>
            <div className="search-mini">
              <Search size={14} />
              <input
                type="text"
                placeholder="بحث بالاسم أو التليفون..."
                value={filterSearch}
                onChange={(e) => setFilterSearch(e.target.value)}
              />
            </div>
          </div>

          <div className="broadcast-students-list">
            {filtered.map((student, idx) => {
              const isSent = !!sentMap[student.cleanPhone];
              const waLink = getWaLink(student.cleanPhone);

              return (
                <div
                  key={student.cleanPhone}
                  className={`broadcast-student-card ${isSent ? 'sent' : ''}`}
                >
                  <div className="student-info">
                    <span className="student-index">#{idx + 1}</span>
                    <div className="student-name-box">
                      <h4>{student.name}</h4>
                      <div className="student-meta">
                        <span dir="ltr" className="phone-num">
                          {student.cleanPhone}
                        </span>
                        {student.governorate && (
                          <span className="gov-tag">{student.governorate}</span>
                        )}
                        {student.registration_code && (
                          <span className="code-tag">{student.registration_code}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="student-actions">
                    <a
                      href={waLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-send-wa"
                      onClick={() => {
                        if (!isSent) toggleSent(student.cleanPhone);
                      }}
                    >
                      <MessageSquare size={16} />
                      <span>{isSent ? 'إعادة الفتح' : 'فتح واتساب'}</span>
                      <ExternalLink size={13} />
                    </a>

                    <button
                      type="button"
                      className={`btn-check-sent ${isSent ? 'active' : ''}`}
                      onClick={() => toggleSent(student.cleanPhone)}
                      title={isSent ? 'تحديد كغير مرسل' : 'تحديد كتم الإرسال'}
                    >
                      <Check size={16} />
                      <span>{isSent ? 'تم الإرسال' : 'لم يتم'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
