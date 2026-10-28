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
  Check,
} from 'lucide-react';
import './index.css';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL?.replace(/\/+$/, '') || '';
const SUPABASE_KEY =
  import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ||
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  '';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'MuhO5R89GxlRH3KI_';
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_kos3ux3';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_9bxkspp';
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || 'engmala7112004@gmail.com';

export default function App() {
  // NAV SCROLL
  React.useEffect(() => {
    const handleScroll = () => {
      document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // MODAL FUNCTIONS
  function openModal() {
    document.getElementById('fa')?.classList.remove('hide');
    document.getElementById('succ')?.classList.remove('show');
    document.getElementById('form-error')?.replaceChildren();
    document.getElementById('success-note')?.replaceChildren();
    const submitButton = document.querySelector('.btn-submit');
    if (submitButton) {
      submitButton.disabled = false;
      submitButton.textContent = 'سجّل الآن';
    }
    document.getElementById('overlay').classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    document.getElementById('overlay').classList.remove('open');
    document.body.style.overflow = '';
  }

  function handleOverlay(e) {
    if (e.target === document.getElementById('overlay')) closeModal();
  }

  // EMAILJS SUBMIT
  async function handleSubmit() {
    const nm = document.getElementById('nm').value.trim();
    const em = document.getElementById('em').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const age = Number(document.getElementById('age').value);
    const governorate = document.getElementById('governorate').value.trim();
    const studyInfo = document.getElementById('study-info').value.trim();
    const website = document.getElementById('website').value.trim();
    const errorBox = document.getElementById('form-error');
    const submitButton = document.querySelector('.btn-submit');
    const setError = (message) => {
      errorBox.textContent = message;
    };

    if (website) return;
    if (!nm || !em || !phone || !age || !governorate || !studyInfo) {
      setError('من فضلك أكمل كل البيانات المطلوبة.');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) {
      setError('اكتب بريدًا إلكترونيًا صحيحًا.');
      return;
    }
    if (!Number.isInteger(age) || age < 10 || age > 100) {
      setError('اكتب سنًا صحيحًا بين 10 و100.');
      return;
    }
    if (!SUPABASE_URL || !SUPABASE_KEY) {
      setError('التسجيل غير متاح حاليًا. لم يتم إعداد قاعدة البيانات بعد.');
      return;
    }

    submitButton.textContent = 'جارٍ تسجيل البيانات...';
    submitButton.disabled = true;
    errorBox.textContent = '';

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/course_registrations`, {
        method: 'POST',
        headers: {
          apikey: SUPABASE_KEY,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          name: nm,
          email: em,
          phone,
          age,
          governorate,
          study_info: studyInfo,
        }),
      });

      if (!response.ok) {
        throw new Error(`Supabase request failed (${response.status})`);
      }

      let notificationFailed = false;
      try {
        if (!window.emailjs) throw new Error('EmailJS is unavailable');
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        await window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: nm,
          from_email: em,
          phone,
          whatsapp: phone,
          age,
          governorate,
          study_info: studyInfo,
          to_email: ADMIN_EMAIL,
        });
      } catch (emailError) {
        console.error('Registration email notification failed:', emailError);
        notificationFailed = true;
      }

      document.getElementById('success-note').textContent = notificationFailed
        ? 'تم حفظ التسجيل، لكن تعذّر إرسال إشعار البريد. ستجد البيانات في لوحة قاعدة البيانات.'
        : 'تم استلام بياناتك بنجاح. سنتواصل معك قريبًا.';
      document.getElementById('fa').classList.add('hide');
      document.getElementById('succ').classList.add('show');
    } catch (err) {
      console.error(err);
      setError('تعذّر حفظ التسجيل. تأكد من البيانات وحاول مرة أخرى.');
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'سجّل الآن';
    }
  }

  // ACCORDION
  function toggleMod(h) {
    const b = h.nextElementSibling;
    b.classList.toggle('open');
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
        </ul>
        <button className="btn-nav" onClick={openModal}>التسجيل مفتوح</button>
      </nav>

      {/* HERO */}
      <main>
      <section className="hero" id="about">
        <div className="hero-text">
          <div className="badge">التسجيل مفتوح الآن</div>
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

      {/* PROMO VIDEO PLACEHOLDER */}
      <section className="promo-section" id="promo">
        <div className="s-tag">Course Preview</div>
        <h2 className="s-title">شوف فكرة الكورس</h2>
        <p className="s-sub">الفيديو التعريفي للكورس هيتضاف هنا قريبًا.</p>
        <div className="promo-placeholder" role="img" aria-label="مساحة الفيديو التعريفي للكورس، الفيديو قيد التجهيز">
          <span className="promo-play" aria-hidden="true"><Play size={28} strokeWidth={2.5} fill="currentColor" /></span>
          <span className="promo-label">الفيديو الدعائي قيد التجهيز</span>
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
      </footer>
      </main>

      {/* MODAL */}
      <div className="overlay" id="overlay" onClick={handleOverlay}>
        <div className="modal">
          <button className="modal-close" onClick={closeModal} aria-label="إغلاق"><X size={18} strokeWidth={3} /></button>
          <div className="modal-icon"><GraduationCap size={28} strokeWidth={2.5} /></div>
          <h2>سجّل في الكورس</h2>
          <p className="sub">املأ البيانات دي عشان نثبت تسجيلك ونتواصل معاك بالتفاصيل.</p>
          <div className="fa" id="fa">
            <p className="form-error" id="form-error" role="alert"></p>
            <div className="fg"><label htmlFor="nm">الاسم بالكامل</label><input type="text" id="nm" autoComplete="name" placeholder="الاسم بالكامل" /></div>
            <div className="fg"><label htmlFor="phone">رقم التليفون / واتساب</label><input type="tel" id="phone" autoComplete="tel" placeholder="+20 1XX XXX XXXX" /></div>
            <div className="fg"><label htmlFor="em">البريد الإلكتروني</label><input type="email" id="em" autoComplete="email" placeholder="name@example.com" /></div>
            <div className="fg"><label htmlFor="age">السن</label><input type="number" id="age" min="10" max="100" inputMode="numeric" placeholder="السن" /></div>
            <div className="fg"><label htmlFor="governorate">المحافظة</label><input type="text" id="governorate" autoComplete="address-level1" placeholder="مثال: القاهرة" /></div>
            <div className="fg"><label htmlFor="study-info">بتدرس إيه؟</label><input type="text" id="study-info" placeholder="المرحلة الدراسية أو التخصص" /></div>
            <div className="honeypot" aria-hidden="true"><label htmlFor="website">اترك هذا الحقل فارغًا</label><input type="text" id="website" tabIndex="-1" autoComplete="off" /></div>
            <button className="btn-submit" onClick={handleSubmit}>سجّل الآن</button>
          </div>
          <div className="success" id="succ">
            <div className="s-icon"><Check size={38} strokeWidth={3.5} /></div>
            <h3>تم استلام تسجيلك بنجاح!</h3>
            <p id="success-note">تم استلام بياناتك بنجاح. سنتواصل معك قريبًا.</p>
          </div>
        </div>
      </div>
    </>
  );
}
