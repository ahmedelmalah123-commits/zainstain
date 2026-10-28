import React from 'react';
import './index.css';

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
    const wa = document.getElementById('wa').value.trim();
    if (!nm || !em || !wa) {
      alert('من فضلك اكمل جميع الحقول');
      return;
    }

    const btn = document.querySelector('.btn-submit');
    btn.textContent = 'جاري الإرسال...';
    btn.disabled = true;

    try {
      window.emailjs.init("MuhO5R89GxlRH3KI_");
      await window.emailjs.send("service_kos3ux3", "template_9bxkspp", {
        from_name: nm,
        from_email: em,
        whatsapp: wa,
        to_email: "engmala7112004@gmail.com"
      });
      document.getElementById('fa').classList.add('hide');
      document.getElementById('succ').classList.add('show');
    } catch (err) {
      console.error(err);
      btn.textContent = 'حدث خطأ، حاول مرة أخرى';
      btn.disabled = false;
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
        <div className="nav-logo"><img src="/logo-full.svg" alt="Zainstein" /></div>
        <ul className="nav-links">
          <li><a href="#about">عن الكورس</a></li>
          <li><a href="#syllabus">المنهج</a></li>
          <li><a href="#features">المميزات</a></li>
        </ul>
        <button className="btn-nav" onClick={openModal}>سجّل اهتمامك</button>
      </nav>

      {/* HERO */}
      <main>
      <section className="hero" id="about">
        <div className="hero-text">
          <div className="badge">قريباً — كن أول من يعلم</div>
          <h1><span className="g">Foundations of<br />Software Engineering</span><br />& Artificial Intelligence</h1>
          <p className="hero-sub">كورس متكامل يأخذك من الأساسيات إلى بناء مشاريع حقيقية باستخدام أحدث تقنيات الـ AI — مُصمَّم خصيصاً للطلاب والمطورين العرب.</p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={openModal}>⚡ احجز مكانك الآن</button>
            <button className="btn-ghost" onClick={() => document.getElementById('syllabus').scrollIntoView({behavior:'smooth'})}>تعرّف على المنهج</button>
          </div>
        </div>
        <div className="hero-card">
          <img src="/hero-bg.png" alt="Zainstein logo" />
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

      {/* WHAT YOU LEARN */}
      <section id="features">
        <div className="s-tag">What You Learn</div>
        <h2 className="s-title">المهارات التي ستكتسبها</h2>
        <p className="s-sub">من أساسيات البرمجة إلى بناء تطبيقات متقدمة مع الذكاء الاصطناعي</p>
        <div className="learn-grid">
          <div className="l-card">
            <span className="l-icon">🏗️</span>
            <h3>أساسيات هندسة البرمجيات</h3>
            <p>تعلم المبادئ الأساسية والممارسات الحديثة</p>
          </div>
          <div className="l-card">
            <span className="l-icon">🤖</span>
            <h3>تطبيقات الذكاء الاصطناعي</h3>
            <p>دمج الذكاء الاصطناعي في مشاريعك الحقيقية</p>
          </div>
          <div className="l-card">
            <span className="l-icon">🎨</span>
            <h3>Frontend Development</h3>
            <p>React و Tailwind CSS وتصميم واجهات احترافية</p>
          </div>
          <div className="l-card">
            <span className="l-icon">⚙️</span>
            <h3>Backend & APIs</h3>
            <p>بناء سيرفرات آمنة وواجهات برمجية قوية</p>
          </div>
          <div className="l-card">
            <span className="l-icon">🚀</span>
            <h3>Deployment & DevOps</h3>
            <p>نشر تطبيقاتك على الإنترنت بكفاءة</p>
          </div>
          <div className="l-card">
            <span className="l-icon">💼</span>
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
            <span style={{fontSize:'1.5rem'}}>🎓</span>
            <p><strong>طالب في تخصص الحاسبات أو الهندسة</strong> — يريد تعميق معارفه وفهم الممارسات الحديثة في سوق العمل</p>
          </div>
          <div className="aud-item">
            <span style={{fontSize:'1.5rem'}}>👶</span>
            <p><strong>مبتدئ في البرمجة</strong> — يريد أن يبدأ بشكل صحيح ومنظم من الصفر إلى المحترفية</p>
          </div>
          <div className="aud-item">
            <span style={{fontSize:'1.5rem'}}>👨‍💻</span>
            <p><strong>مطور شاب</strong> — يريد فهم software engineering صح ودخول عالم الـ AI والتقنيات الحديثة</p>
          </div>
          <div className="aud-item">
            <span style={{fontSize:'1.5rem'}}>🚀</span>
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
        <div className="f-logo"><img src="/logo-full.svg" alt="Zainstein" /></div>
        <p>2026 © Zainstein — Engineering Tomorrow... Today</p>
        <p>Designed by <strong style={{color:'rgba(255,255,255,.6)'}}>Ahmed Al Malah</strong></p>
      </footer>
      </main>

      {/* MODAL */}
      <div className="overlay" id="overlay" onClick={handleOverlay}>
        <div className="modal">
          <button className="modal-close" onClick={closeModal}>✕</button>
          <div className="modal-icon">🎓</div>
          <h2>احجز مكانك</h2>
          <p className="sub">سنُعلمك فور توافر الكورس وتكون أول المسجلين</p>
          <div className="fa" id="fa">
            <div className="fg"><label>// الاسم الكامل</label><input type="text" id="nm" placeholder="Ahmed Al Malah" /></div>
            <div className="fg"><label>// البريد الإلكتروني</label><input type="email" id="em" placeholder="ahmed@example.com" /></div>
            <div className="fg"><label>// رقم الواتساب</label><input type="tel" id="wa" placeholder="+20 1XX XXX XXXX" /></div>
            <button className="btn-submit" onClick={handleSubmit}>سجّل اهتمامي الآن 🚀</button>
          </div>
          <div className="success" id="succ">
            <div className="s-icon">✓</div>
            <h3>تم التسجيل! 🎉</h3>
            <p>تم التسجيل بنجاح، سنخبرك لتكون أول المعلمين عند توافر الكورس.<br /><br />ترقّب إشعارًا على بريدك الإلكتروني وواتساب.</p>
          </div>
        </div>
      </div>
    </>
  );
}
