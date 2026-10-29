import React from 'react';
import {
  Zap,
  Play,
  Cpu,
  Bot,
  Layout,
  Server,
  Rocket,
  Briefcase,
  GraduationCap,
  Compass,
  Code2,
  X,
  Search,
  Gift,
} from 'lucide-react';
import AdminDashboard from './AdminDashboard';
import RegistrationSuccessCard from './components/RegistrationSuccessCard';
import VerifyCodeModal from './components/VerifyCodeModal';
import {
  generateConfirmationEmailHtml,
  generateConfirmationEmailText,
  generateAdminNotificationEmailHtml,
  generateAdminNotificationEmailText,
  COURSE_FULL_NAME,
} from './utils/emailTemplate';
import './index.css';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '') || '';
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'MuhO5R89GxlRH3KI_';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kos3ux3';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_9bxkspp';
const EMAILJS_USER_TEMPLATE_ID =
  import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID ||
  import.meta.env.VITE_EMAILJS_TEMPLATE_ID ||
  'template_9bxkspp';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'mala7.eg@gmail.com';

/**
 * Safely send EmailJS with template fallbacks without blocking the UI
 */
async function sendEmailSafely(serviceId, templateCandidates, params) {
  if (typeof window === 'undefined' || !window.emailjs) return false;
  for (const tid of templateCandidates) {
    if (!tid) continue;
    try {
      await window.emailjs.send(serviceId, tid, params);
      return true;
    } catch (err) {
      console.warn(`EmailJS send attempt with template [${tid}] note:`, err?.text || err?.message || err);
    }
  }
  return false;
}

export default function App() {
  const [isVideoPlaying, setIsVideoPlaying] = React.useState(false);
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [isVerifyOpen, setIsVerifyOpen] = React.useState(false);
  const [registrationSuccessData, setRegistrationSuccessData] = React.useState(null);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [formError, setFormError] = React.useState('');
  const videoRef = React.useRef(null);

  const handlePlayVideo = () => {
    if (videoRef.current) {
      setIsVideoPlaying(true);
      videoRef.current.play().catch((err) => {
        console.warn('Play prevented:', err);
      });
    }
  };

  const [isAdminView, setIsAdminView] = React.useState(
    () => typeof window !== 'undefined' && (window.location.pathname.startsWith('/admin') || window.location.hash === '#admin')
  );

  React.useEffect(() => {
    const handleLocation = () => {
      setIsAdminView(window.location.pathname.startsWith('/admin') || window.location.hash === '#admin');
    };
    window.addEventListener('popstate', handleLocation);
    window.addEventListener('hashchange', handleLocation);
    return () => {
      window.removeEventListener('popstate', handleLocation);
      window.removeEventListener('hashchange', handleLocation);
    };
  }, []);

  const navigateToAdmin = (e) => {
    e?.preventDefault();
    window.history.pushState({}, '', '/admin');
    setIsAdminView(true);
    window.scrollTo(0, 0);
  };

  const navigateToHome = (e) => {
    e?.preventDefault();
    window.history.pushState({}, '', '/');
    setIsAdminView(false);
    window.scrollTo(0, 0);
  };

  // NAV SCROLL
  React.useEffect(() => {
    const handleScroll = () => {
      const navEl = document.getElementById('nav');
      if (navEl) {
        navEl.classList.toggle('scrolled', window.scrollY > 60);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MODAL FUNCTIONS
  function openModal() {
    setRegistrationSuccessData(null);
    setFormError('');
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    setIsModalOpen(false);
    setRegistrationSuccessData(null);
    document.body.style.overflow = '';
  }

  function handleOverlay(e) {
    if (e.target.id === 'overlay') {
      closeModal();
    }
  }

  // REGISTRATION & EMAIL SUBMIT
  async function handleSubmit() {
    const nmInput = document.getElementById('nm');
    const emInput = document.getElementById('em');
    const phoneInput = document.getElementById('phone');
    const ageInput = document.getElementById('age');
    const govInput = document.getElementById('governorate');
    const studyInput = document.getElementById('study-info');
    const websiteInput = document.getElementById('website');

    const nm = nmInput ? nmInput.value.trim() : '';
    const em = emInput ? emInput.value.trim() : '';
    const phone = phoneInput ? phoneInput.value.trim() : '';
    const age = ageInput ? Number(ageInput.value) : 0;
    const governorate = govInput ? govInput.value.trim() : '';
    const studyInfo = studyInput ? studyInput.value.trim() : '';
    const website = websiteInput ? websiteInput.value.trim() : '';

    if (website) return; // honeypot
    if (!nm || !em || !phone || !age || !governorate || !studyInfo) {
      setFormError('من فضلك أكمل كل البيانات المطلوبة.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setFormError('اكتب بريدًا إلكترونيًا صحيحًا.');
      return;
    }
    if (!Number.isInteger(age) || age < 10 || age > 100) {
      setFormError('اكتب سنًا صحيحًا بين 10 و100.');
      return;
    }
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setFormError('التسجيل غير متاح حاليًا. لم يتم إعداد قاعدة البيانات بعد.');
      return;
    }

    setIsSubmitting(true);
    setFormError('');

    let regNumber = null;
    let regCode = null;

    try {
      // 1. Primary: Attempt RPC register_student (Atomic Sequence & Code Generation)
      try {
        const rpcRes = await fetch(`${SUPABASE_URL}/rest/v1/rpc/register_student`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            p_name: nm,
            p_email: em,
            p_phone: phone,
            p_age: age,
            p_governorate: governorate,
            p_study_info: studyInfo,
          }),
        });

        if (rpcRes.ok) {
          const rpcData = await rpcRes.json();
          regNumber = rpcData.registration_number;
          regCode = rpcData.registration_code;
        }
      } catch (rpcErr) {
        console.warn('RPC register_student attempt notice:', rpcErr);
      }

      // 2. Resilient Fallback: If RPC not deployed yet, compute sequential number starting at 101
      if (!regNumber || !regCode) {
        try {
          const adminCheck = await fetch(`${SUPABASE_URL}/rest/v1/rpc/get_admin_registrations`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ pin_code: '2026' }),
          });

          if (adminCheck.ok) {
            const existingList = await adminCheck.json();
            if (Array.isArray(existingList)) {
              const maxExistingReg = Math.max(100, ...existingList.map((r) => Number(r.registration_number) || 0));
              if (maxExistingReg > 100) {
                regNumber = maxExistingReg + 1;
              } else {
                // If existing rows (5) are present, numbering starts at 101 for the first new registration
                const newCount = Math.max(0, existingList.length - 5);
                regNumber = 101 + newCount;
              }
            }
          }
        } catch (e) {
          console.warn('Fallback sequence check notice:', e);
        }

        if (!regNumber) regNumber = 101;

        // Code format: ZS + regNumber + Latin uppercase letter
        const latinMatch = nm.match(/[a-zA-Z]/);
        const letter = latinMatch
          ? latinMatch[0].toUpperCase()
          : String.fromCharCode(65 + Math.floor(Math.random() * 26));
        regCode = `ZS${regNumber}${letter}`;

        // Insert into course_registrations table
        const insertPayload = {
          name: nm,
          email: em,
          phone,
          age,
          governorate,
          study_info: studyInfo,
        };

        // Try insert with registration fields
        let insertRes = await fetch(`${SUPABASE_URL}/rest/v1/course_registrations`, {
          method: 'POST',
          headers: {
            apikey: SUPABASE_KEY,
            Authorization: `Bearer ${SUPABASE_KEY}`,
            'Content-Type': 'application/json',
            Prefer: 'return=minimal',
          },
          body: JSON.stringify({
            ...insertPayload,
            registration_number: regNumber,
            registration_code: regCode,
          }),
        });

        // Fallback to standard fields if columns are not added yet
        if (!insertRes.ok) {
          insertRes = await fetch(`${SUPABASE_URL}/rest/v1/course_registrations`, {
            method: 'POST',
            headers: {
              apikey: SUPABASE_KEY,
              Authorization: `Bearer ${SUPABASE_KEY}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal',
            },
            body: JSON.stringify(insertPayload),
          });
        }

        if (!insertRes.ok) {
          throw new Error(`تعذّر حفظ التسجيل (${insertRes.status})`);
        }
      }

      // Successful registration details
      const confirmedData = {
        name: nm,
        email: em,
        phone,
        age,
        governorate,
        study_info: studyInfo,
        registration_number: regNumber,
        registration_code: regCode,
        course_name: COURSE_FULL_NAME,
      };

      // ⚡ IMMEDIATE SUCCESS: Transition to VIP Confirmation Pass instantly!
      // The user gets their confirmation in less than 1 second (no waiting on external SMTP)
      setRegistrationSuccessData(confirmedData);
      setIsSubmitting(false);

      // Asynchronous background email sending (does not block or delay UI display)
      (async () => {
        try {
          if (typeof window === 'undefined' || !window.emailjs) return;
          window.emailjs.init(EMAILJS_PUBLIC_KEY);

          // Generate Student and Owner email contents
          const studentEmailHtml = generateConfirmationEmailHtml(confirmedData);
          const studentEmailText = generateConfirmationEmailText(confirmedData);
          const adminEmailHtml = generateAdminNotificationEmailHtml(confirmedData);
          const adminEmailText = generateAdminNotificationEmailText(confirmedData);

          const templateCandidates = [
            EMAILJS_USER_TEMPLATE_ID,
            EMAILJS_TEMPLATE_ID,
            'template_9bxkspp',
            'p0ouexp',
          ].filter(Boolean);

          const studentParams = {
            to_email: em,
            from_email: em,
            user_email: em,
            email: em,
            recipient: em,
            to_name: nm,
            user_name: nm,
            name: nm,
            student_name: nm,
            from_name: 'Zainstein Academy',
            reply_to: ADMIN_EMAIL,
            registration_number: regNumber,
            registration_code: regCode,
            course_name: COURSE_FULL_NAME,
            voucher_discount: '100%',
            voucher_code: regCode,
            early_access_perk: 'أولوية الوصول المبكر للكورس',
            workshop_perk: 'ورشة عمل تطبيقية مجانية مرتبطة بالكورس',
            phone,
            whatsapp: phone,
            age,
            governorate,
            study_info: studyInfo,
            email_html: studentEmailHtml,
            message_html: studentEmailHtml,
            html_content: studentEmailHtml,
            content_html: studentEmailHtml,
            message: studentEmailText,
          };

          const adminParams = {
            to_email: ADMIN_EMAIL,
            from_name: nm,
            from_email: em,
            reply_to: em,
            name: nm,
            student_name: nm,
            full_name: nm,
            email: em,
            phone: phone,
            whatsapp: phone,
            age: age,
            governorate: governorate,
            study_info: studyInfo,
            registration_number: regNumber,
            registration_code: regCode,
            course_name: COURSE_FULL_NAME,
            voucher_discount: '100%',
            voucher_code: regCode,
            email_html: adminEmailHtml,
            message_html: adminEmailHtml,
            html_content: adminEmailHtml,
            content_html: adminEmailHtml,
            message: adminEmailText,
          };

          // Send both in parallel in background
          await Promise.allSettled([
            sendEmailSafely(EMAILJS_SERVICE_ID, templateCandidates, studentParams),
            sendEmailSafely(EMAILJS_SERVICE_ID, templateCandidates, adminParams),
          ]);
        } catch (emailErr) {
          console.warn('Background email processing notice:', emailErr);
        }
      })();
    } catch (err) {
      console.error(err);
      setFormError('تعذّر حفظ التسجيل. تأكد من اتصال الإنترنت والبيانات وحاول مرة أخرى.');
    } finally {
      setIsSubmitting(false);
    }
  }

  // ACCORDION
  function toggleMod(h) {
    const b = h.nextElementSibling;
    if (b) {
      b.classList.toggle('open');
    }
  }

  if (isAdminView) {
    return <AdminDashboard onBack={navigateToHome} />;
  }

  return (
    <>
      {/* NAV */}
      <nav id="nav">
        <a className="nav-logo" href="#about" aria-label="Zainstein - الصفحة الرئيسية">
          <img src="/zainstein-logo.png" alt="Zainstein" />
        </a>
        <ul className="nav-links">
          <li><a href="#about">عن الكورس</a></li>
          <li><a href="#promo">الفيديو</a></li>
          <li><a href="#syllabus">المنهج</a></li>
          <li><a href="#features">المميزات</a></li>
          <li>
            <button
              type="button"
              className="btn-nav-verify"
              onClick={() => setIsVerifyOpen(true)}
              title="التحقق من كود التسجيل المعتمد"
            >
              <Search size={14} />
              <span>التحقق من الكود</span>
            </button>
          </li>
        </ul>
        <button className="btn-nav" onClick={openModal}>التسجيل مفتوح</button>
      </nav>

      {/* HERO */}
      <main>
      <section className="hero" id="about">
        <div className="hero-text">
          <div className="badge">
            <Gift size={15} />
            <span>التسجيل مفتوح الآن — خصم 100%</span>
          </div>
          <h1><span className="g">Foundations of<br />Software Engineering</span><br />& Artificial Intelligence</h1>
          <p className="hero-sub">كورس متكامل يأخذك من الأساسيات إلى بناء مشاريع حقيقية باستخدام أحدث تقنيات الـ AI — مُصمَّم خصيصاً للطلاب والمطورين العرب.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={openModal}><Zap size={18} strokeWidth={2.5} fill="currentColor" /><span>احجز مكانك الآن</span></button>
            <button className="btn-ghost" onClick={() => document.getElementById('syllabus').scrollIntoView({behavior:'smooth'})}>تعرّف على المنهج</button>
          </div>
        </div>
        <div className="hero-card">
          <img src="/course-cover.webp" alt="غلاف كورس Foundations of Software Engineering & AI" />
        </div>
      </section>

      {/* STATS */}
      <section className="stats">
        <div className="stat">
          <div className="stat-n">48+</div>
          <div className="stat-l">ساعات تعليمية</div>
        </div>
        <div className="stat">
          <div className="stat-n">5</div>
          <div className="stat-l">وحدات أساسية</div>
        </div>
        <div className="stat">
          <div className="stat-n">100%</div>
          <div className="stat-l">مضمون النتائج</div>
        </div>
        <div className="stat">
          <div className="stat-n">∞</div>
          <div className="stat-l">دعم العرب</div>
        </div>
      </section>

      {/* PROMO VIDEO */}
      <section className="promo-section" id="promo">
        <div className="s-tag">Course Preview</div>
        <h2 className="s-title">شوف فكرة الكورس</h2>
        <p className="s-sub">شاهد الفيديو التعريفي لكورس Foundations of Software Engineering & AI</p>
        <div className="promo-player-wrap">
          <video
            ref={videoRef}
            controls
            playsInline
            webkit-playsinline="true"
            x5-playsinline="true"
            preload="auto"
            poster={isVideoPlaying ? undefined : '/course-cover.webp'}
            className="promo-video"
            onPlay={() => setIsVideoPlaying(true)}
            onPause={() => {
              if (videoRef.current && videoRef.current.currentTime === 0) {
                setIsVideoPlaying(false);
              }
            }}
            onEnded={() => setIsVideoPlaying(false)}
          >
            <source src="/course-promo.mp4" type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو مباشرة.
          </video>

          {!isVideoPlaying && (
            <div
              className="promo-overlay-btn"
              onClick={handlePlayVideo}
              role="button"
              tabIndex={0}
              aria-label="تشغيل الفيديو التعريفي"
            >
              <div className="promo-big-play">
                <Play size={36} strokeWidth={2.5} fill="currentColor" />
              </div>
              <span className="promo-play-text">
                <Play size={16} fill="currentColor" />
                <span>اضغط للمشاهدة الآن</span>
              </span>
            </div>
          )}
        </div>
      </section>

      {/* WHAT YOU LEARN */}
      <section id="features">
        <div className="s-tag">What You Learn</div>
        <h2 className="s-title">المهارات التي ستكتسبها</h2>
        <p className="s-sub">من أساسيات البرمجة إلى بناء تطبيقات متقدمة مع الذكاء الاصطناعي</p>
        <div className="learn-grid">
          <div className="l-card">
            <span className="l-icon"><Cpu size={24} strokeWidth={2.5} /></span>
            <h3>أساسيات هندسة البرمجيات</h3>
            <p>تعلم المبادئ الأساسية والممارسات الحديثة</p>
          </div>
          <div className="l-card">
            <span className="l-icon"><Bot size={24} strokeWidth={2.5} /></span>
            <h3>تطبيقات الذكاء الاصطناعي</h3>
            <p>دمج الذكاء الاصطناعي في مشاريعك الحقيقية</p>
          </div>
          <div className="l-card">
            <span className="l-icon"><Layout size={24} strokeWidth={2.5} /></span>
            <h3>Frontend Development</h3>
            <p>React و Tailwind CSS وتصميم واجهات احترافية</p>
          </div>
          <div className="l-card">
            <span className="l-icon"><Server size={24} strokeWidth={2.5} /></span>
            <h3>Backend & APIs</h3>
            <p>بناء سيرفرات آمنة وواجهات برمجية قوية</p>
          </div>
          <div className="l-card">
            <span className="l-icon"><Rocket size={24} strokeWidth={2.5} /></span>
            <h3>Deployment & DevOps</h3>
            <p>نشر تطبيقاتك على الإنترنت بكفاءة</p>
          </div>
          <div className="l-card">
            <span className="l-icon"><Briefcase size={24} strokeWidth={2.5} /></span>
            <h3>Portfolio & Career</h3>
            <p>بناء محفظة احترافية والحصول على فرص عمل</p>
          </div>
        </div>
      </section>

      {/* WHO IS IT FOR */}
      <section>
        <div className="s-tag">Who Is It For</div>
        <h2 className="s-title">تم تصميمه لمن؟</h2>
        <p className="s-sub">الكورس مناسب لمختلف المستويات والخلفيات</p>
        <div className="aud-list">
          <div className="aud-item">
            <div className="aud-icon"><GraduationCap size={22} strokeWidth={2.5} /></div>
            <p><strong>طالب في تخصص الحاسبات أو الهندسة</strong> — يريد تعميق معارفه وفهم الممارسات الحديثة في سوق العمل</p>
          </div>
          <div className="aud-item">
            <div className="aud-icon"><Compass size={22} strokeWidth={2.5} /></div>
            <p><strong>مبتدئ في البرمجة</strong> — يريد أن يبدأ بشكل صحيح ومنظم من الصفر إلى المحترفية</p>
          </div>
          <div className="aud-item">
            <div className="aud-icon"><Code2 size={22} strokeWidth={2.5} /></div>
            <p><strong>مطور شاب</strong> — يريد فهم software engineering صح ودخول عالم الـ AI والتقنيات الحديثة</p>
          </div>
          <div className="aud-item">
            <div className="aud-icon"><Rocket size={22} strokeWidth={2.5} /></div>
            <p><strong>أي حد عايز يبني مشاريع</strong> — يشتغل freelance أو يحتاج مهارات عملية فوراً</p>
          </div>
        </div>
      </section>

      {/* SYLLABUS */}
      <section id="syllabus">
        <div className="s-tag">المنهج الدراسي</div>
        <h2 className="s-title">الـ Roadmap بالتفصيل</h2>
        <div className="syl-wrap">
          <div className="mod">
            <div className="mod-h" onClick={(e) => toggleMod(e.currentTarget)}>
              <h3>Module 01 — Programming Foundations</h3>
              <span className="mod-tag">8 دروس</span>
            </div>
            <div className="mod-body">
              <ul>
                <li>مقدمة في البرمجة وأساسيات Algorithms</li>
                <li>Data Structures الأساسية</li>
                <li>Problem Solving Techniques</li>
                <li>Git &amp; Version Control</li>
              </ul>
            </div>
          </div>
          <div className="mod">
            <div className="mod-h" onClick={(e) => toggleMod(e.currentTarget)}>
              <h3>Module 02 — Software Engineering Principles</h3>
              <span className="mod-tag">10 دروس</span>
            </div>
            <div className="mod-body">
              <ul>
                <li>Clean Code &amp; Best Practices</li>
                <li>Design Patterns (SOLID, MVC)</li>
                <li>Software Architecture</li>
                <li>Testing &amp; QA Fundamentals</li>
              </ul>
            </div>
          </div>
          <div className="mod">
            <div className="mod-h" onClick={(e) => toggleMod(e.currentTarget)}>
              <h3>Module 03 — Frontend with React</h3>
              <span className="mod-tag">12 درس</span>
            </div>
            <div className="mod-body">
              <ul>
                <li>React 18 &amp; Hooks</li>
                <li>Tailwind CSS &amp; UI Design</li>
                <li>State Management</li>
                <li>Building Real Projects</li>
              </ul>
            </div>
          </div>
          <div className="mod">
            <div className="mod-h" onClick={(e) => toggleMod(e.currentTarget)}>
              <h3>Module 04 — Backend &amp; Databases</h3>
              <span className="mod-tag">10 دروس</span>
            </div>
            <div className="mod-body">
              <ul>
                <li>Node.js &amp; Express</li>
                <li>REST API Design</li>
                <li>SQL &amp; NoSQL Databases</li>
                <li>Authentication &amp; Security</li>
              </ul>
            </div>
          </div>
          <div className="mod">
            <div className="mod-h" onClick={(e) => toggleMod(e.currentTarget)}>
              <h3>Module 05 — AI Integration &amp; Projects</h3>
              <span className="mod-tag">8 دروس</span>
            </div>
            <div className="mod-body">
              <ul>
                <li>AI APIs &amp; LLM Integration</li>
                <li>Building AI-Powered Apps</li>
                <li>Deployment &amp; DevOps</li>
                <li>Graduation Project</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer>
        <div className="f-logo"><img src="/zainstein-logo.png" alt="Zainstein" /></div>
        <p>2026 © Zainstein — Engineering Tomorrow... Today</p>
        <p>Designed by <strong style={{color:'rgba(255,255,255,.6)'}}>Ahmed Al Malah</strong></p>
        <p>
          <button
            type="button"
            onClick={() => setIsVerifyOpen(true)}
            className="admin-link-footer"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <Search size={14} style={{ verticalAlign: 'middle', marginLeft: '4px' }} />
            <span>التحقق من كود التسجيل</span>
          </button>
        </p>
      </footer>
      </main>

      {/* REGISTRATION MODAL */}
      <div
        className={`overlay ${isModalOpen ? 'open' : ''}`}
        id="overlay"
        onClick={handleOverlay}
      >
        <div className={`modal ${registrationSuccessData ? 'success-modal-expanded' : ''}`}>
          <button className="modal-close" onClick={closeModal} aria-label="إغلاق">
            <X size={18} strokeWidth={3} />
          </button>

          {!registrationSuccessData ? (
            /* FORM VIEW */
            <>
              <div className="modal-icon"><GraduationCap size={28} strokeWidth={2.5} /></div>
              <h2>سجّل في الكورس</h2>
              <p className="sub">املأ البيانات دي عشان نثبت تسجيلك وتأخذ قسيمة خصم 100% والورشة مجانًا.</p>
              
              <div className="fa" id="fa">
                {formError && (
                  <p className="form-error" role="alert" style={{ display: 'block', marginBottom: '14px' }}>
                    {formError}
                  </p>
                )}
                <div className="fg">
                  <label htmlFor="nm">الاسم بالكامل</label>
                  <input type="text" id="nm" autoComplete="name" placeholder="الاسم بالكامل" />
                </div>
                <div className="fg">
                  <label htmlFor="phone">رقم التليفون / واتساب</label>
                  <input type="tel" id="phone" autoComplete="tel" placeholder="+20 1XX XXX XXXX" />
                </div>
                <div className="fg">
                  <label htmlFor="em">البريد الإلكتروني</label>
                  <input type="email" id="em" autoComplete="email" placeholder="name@example.com" />
                </div>
                <div className="fg">
                  <label htmlFor="age">السن</label>
                  <input type="number" id="age" min="10" max="100" inputMode="numeric" placeholder="السن" />
                </div>
                <div className="fg">
                  <label htmlFor="governorate">المحافظة</label>
                  <input type="text" id="governorate" autoComplete="address-level1" placeholder="مثال: القاهرة" />
                </div>
                <div className="fg">
                  <label htmlFor="study-info">بتدرس إيه؟</label>
                  <input type="text" id="study-info" placeholder="المرحلة الدراسية أو التخصص" />
                </div>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="website">اترك هذا الحقل فارغًا</label>
                  <input type="text" id="website" tabIndex="-1" autoComplete="off" />
                </div>
                <button
                  type="button"
                  className="btn-submit"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                >
                  <Zap size={16} fill="currentColor" style={{ verticalAlign: 'middle', marginLeft: '6px' }} />
                  <span>{isSubmitting ? 'جارٍ تسجيل البيانات وحجز المقعد...' : 'سجّل الآن'}</span>
                </button>
              </div>
            </>
          ) : (
            /* SUCCESS VIEW (VIP STUDENT PASS CARD) */
            <RegistrationSuccessCard
              registrationData={registrationSuccessData}
              onClose={closeModal}
            />
          )}
        </div>
      </div>

      {/* VERIFY CODE MODAL */}
      <VerifyCodeModal
        isOpen={isVerifyOpen}
        onClose={() => setIsVerifyOpen(false)}
      />
    </>
  );
}
