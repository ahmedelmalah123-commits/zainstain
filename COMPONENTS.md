# 📚 Component Documentation

Complete reference for all components in the Zainstein landing page.

## Navbar Component

**Location:** `src/components/Navbar.jsx`

### Features
- Fixed navigation at top
- Logo with orange gradient
- 3 navigation links (عن الكورس, المنهج, المميزات)
- CTA button "سجّل اهتمامك"
- Glass effect background on scroll
- Smooth anchor links

### Customization
```javascript
// Change navigation links
const navLinks = [
  { label: 'عن الكورس', href: '#features' },    // Change label or href
  { label: 'المنهج', href: '#syllabus' },
  { label: 'المميزات', href: '#about' },
]

// Change button text
<motion.button onClick={onSignUp}>
  سجّل اهتمامك    {/* Change text here */}
</motion.button>
```

### Props
- `onSignUp` - Callback function when CTA button clicked

---

## Hero Component

**Location:** `src/components/Hero.jsx`

### Features
- Badge with pulsing animated dot
- Main headline with gradient text
- Arabic subtitle
- Two CTA buttons (Primary + Secondary)
- Course card with glassmorphism
- Circuit pattern SVG overlay
- Animated course thumbnail icon (⚙️)

### Customization
```javascript
// Change main headline
<h1 className="text-5xl md:text-6xl font-bold font-mono gradient-text">
  Foundations of Software Engineering & AI  {/* Edit here */}
</h1>

// Change Arabic subtitle
<p className="text-lg text-white/70">
  كورس متكامل يأخذك من الأساسيات إلى بناء مشاريع حقيقية {/* Edit here */}
</p>

// Change badge text
<span className="text-xs opacity-orange">
  قريباً — كن أول من يعلم  {/* Edit here */}
</span>

// Change course card name
<h3 className="text-xl font-bold">
  Zainstein Engineering  {/* Edit here */}
</h3>

// Change instructor name
<p className="text-sm">
  Ahmed Salah — Zainstein  {/* Edit here */}
</p>
```

### Props
- `onSignUp` - Callback when either CTA button is clicked

### Animations
- Container stagger animation (0.2s delay between items)
- Individual item slide-up on mount
- Course card scale animation on mount
- Hover glow effects on buttons

---

## StatsBar Component

**Location:** `src/components/StatsBar.jsx`

### Features
- 4 statistics cards in a row
- Numbers in Space Mono font with orange gradient
- Glass morphism design
- Scroll-triggered animation

### Customization
```javascript
const stats = [
  { label: '     درس', value: '+40' },      // Change label/value pairs
  { label: 'مشاريع', value: '8' },
  { label: 'وصول', value: '∞' },
  { label: 'باللغة العربية', value: 'AR' },
]
```

### Responsive
- 2 columns on mobile
- 4 columns on desktop

---

## WhatYouLearn Component

**Location:** `src/components/WhatYouLearn.jsx`

### Features
- 6 feature cards in 3×2 grid (responsive)
- Each card has icon + title + description
- Lucide React icons
- Hover effects with glow
- Section header with decorative brackets

### Customization
```javascript
const features = [
  {
    icon: Code2,  // Change to any Lucide icon (Brain, Palette, etc.)
    title: 'أساسيات هندسة البرمجيات',  // Change title
    description: 'Software Design Patterns, Clean Code',  // Change description
  },
  // ... more items
]
```

### Available Icons (from Lucide)
- `Code2` - Code/programming
- `Brain` - AI/intelligence
- `Palette` - Design/frontend
- `Server` - Backend/infrastructure
- `Zap` - Performance/deployment
- `Users` - Community/career

### Responsive
- 1 column on mobile
- 2 columns on tablet
- 3 columns on desktop

---

## WhoIsItFor Component

**Location:** `src/components/WhoIsItFor.jsx`

### Features
- 4 target audience cards
- Magenta left border (4px)
- CheckCircle icon per card
- Hover glow effect
- Left-aligned layout

### Customization
```javascript
const targetUsers = [
  {
    title: 'طالب في تخصص الحاسبات أو الهندسة',  // Change title
    description: 'تأسيس قوي في هندسة البرمجيات',  // Change description
  },
  // ... more items
]
```

### Properties
- Left border color: Magenta (`--magenta: #8f0177`)
- Icon: CheckCircle (fixed)

---

## Syllabus Component

**Location:** `src/components/Syllabus.jsx`

### Features
- Accordion-style 5 modules
- Click to expand/collapse
- Smooth open/close animation
- Shows lesson count per module
- 3-4 lesson titles per module
- Chevron icon rotates on expand

### Customization
```javascript
const modules = [
  {
    title: 'Module 1 — Programming Foundations',  // Change title
    lessons: 8,  // Change lesson count
    content: [  // Change lessons
      'المتغيرات والأنواع البيانية',
      'الدوال والـ Scope',
      'البرمجة الكائنية التوجه OOP',
      'التعامل مع الأخطاء',
    ],
  },
  // ... more modules
]
```

### State Management
```javascript
const [expandedModule, setExpandedModule] = useState(0)  // Start with first module open
// Change 0 to -1 to start with all closed
```

---

## Footer Component

**Location:** `src/components/Footer.jsx`

### Features
- 3-column layout (logo, copyright, designer)
- Animated top border with pulsing glow
- Responsive grid
- Current year auto-generated

### Customization
```javascript
// Change copyright text
<p className="text-sm">
  © {currentYear} Zainstein — Engineering Tomorrow... Today  {/* Edit here */}
</p>

// Change designer credit
<p className="text-sm">
  Designed by Ahmed Al Malah  {/* Edit here */}
</p>

// Change logo
<h3 className="text-2xl font-bold gradient-orange">
  ZAINSTEIN  {/* Edit here */}
</h3>
```

### Animations
- Initial fade-in on scroll
- Pulsing border animation (opacity 0.5 → 1 → 0.5)

---

## Modal Component

**Location:** `src/components/Modal.jsx`

### Features
- Overlay with backdrop blur
- Centered modal window
- Form with 3 fields (الاسم, البريد, الواتساب)
- Real-time validation
- Error messages with AlertCircle icon
- Success state with CheckCircle animation
- EmailJS integration
- Auto-close after success (4 seconds)
- ESC key to close (optional - can be added)

### Form Fields
```javascript
// Field 1: Name (full name)
<input type="text" name="name" placeholder="أحمد محمد" />

// Field 2: Email
<input type="email" name="email" placeholder="your@email.com" />

// Field 3: WhatsApp
<input type="tel" name="whatsapp" placeholder="+20 100 000 0000" />
```

### Validation Rules
- All fields required
- Email must be valid format
- WhatsApp just needs non-empty string

### EmailJS Setup
```javascript
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'  // Replace with your public key
const SERVICE_ID = 'service_4jhjdud'  // Already configured
const ADMIN_TEMPLATE_ID = 'YOUR_ADMIN_TEMPLATE_ID'  // Create in EmailJS
const USER_TEMPLATE_ID = 'YOUR_USER_TEMPLATE_ID'  // Create in EmailJS
const ADMIN_EMAIL = 'engmala7112004@gmail.com'  // Already set
```

### Form States
1. **Default** - Empty form, ready for input
2. **Loading** - Button shows "جارِ التسجيل..."
3. **Error** - Shows error message with AlertCircle
4. **Success** - Shows CheckCircle with confirmation message, auto-closes

### Props
- `isOpen` (boolean) - Controls visibility
- `onClose` (function) - Called when modal should close

### User Interactions
- Click overlay to close (optional modal config)
- Click X button to close
- Form validation on submit
- Auto-close on success

---

## App Component

**Location:** `src/App.jsx`

### Structure
```jsx
<div>
  {/* Background Effects */}
  <div className="circuit-bg"></div>        {/* Animated grid */}
  <div className="scanlines"></div>         {/* Scan lines overlay */}
  <div className="noise"></div>             {/* Noise texture */}

  {/* Navigation */}
  <Navbar onSignUp={() => setShowModal(true)} />

  {/* Main Content */}
  <Hero onSignUp={() => setShowModal(true)} />
  <StatsBar />
  <WhatYouLearn />
  <WhoIsItFor />
  <Syllabus />

  {/* Footer */}
  <Footer />

  {/* Modal */}
  <Modal isOpen={showModal} onClose={() => setShowModal(false)} />
</div>
```

### State Management
- `showModal` - Boolean controlling Modal visibility
- `setShowModal` - Function to toggle modal

---

## Global Styles

**Location:** `src/index.css`

### Reusable Classes

```css
.glass              {/* Glass morphism base style */}
.glass-sm           {/* Smaller glass blur (10px) */}
.neon-orange        {/* Orange glow effect */}
.neon-orange-border {/* Orange border with glow */}
.neon-magenta       {/* Magenta glow */}
.gradient-text      {/* White→Rose→Orange gradient */}
.gradient-orange    {/* Orange gradient text */}
.hover-glow         {/* Hover with glow + lift */}
.pulse-border       {/* Pulsing neon border animation */}
.btn-primary        {/* Primary button style */}
.btn-secondary      {/* Secondary button style */}
```

### Background Effects
```css
.circuit-bg         {/* Animated grid lines */}
.scanlines          {/* Subtle scan effect */}
.noise              {/* Noise texture overlay */}
```

### Animation Examples
```jsx
// Use in any component
<div className="hover-glow">Content here</div>
<div className="pulse-border">Pulsing element</div>
<button className="btn-primary">Click me</button>
```

---

## Tailwind Configuration

**Location:** `tailwind.config.js`

### Custom Colors
```javascript
colors: {
  primary: '#1a05a2',      // Deep Blue
  magenta: '#8f0177',      // Accent
  rose: '#de1a58',         // Secondary
  orange: '#f67d31',       // CTA
  dark: '#04020f',         // Background
  surface: '#0a061f',      // Cards
}
```

### Custom Fonts
```javascript
fontFamily: {
  mono: ['Space Mono', 'monospace'],  // Headers
  sans: ['Cairo', 'sans-serif'],      // Body text
}
```

### Custom Keyframes
```javascript
keyframes: {
  'pulse-border': { /* ... */ },      // Pulsing border
  'glow': { /* ... */ },              // Text glow
}
```

---

## Tips for Customization

### Change Section IDs
Used for anchor navigation:
```html
<!-- Update href in Navbar AND id here to match -->
<section id="features">
<section id="syllabus">
```

### Add More Cards
Copy and paste card structure, increment index:
```javascript
// In any component with cards array
const items = [
  { title: 'Item 1', ... },
  { title: 'Item 2', ... },
  // Add more items here
]
```

### Change Animations
Modify Framer Motion duration:
```jsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.6 }}  {/* Change this value */}
>
```

### Blend Modes & Effects
Add to any element:
```css
mix-blend-mode: screen;           /* Or multiply, lighten, etc. */
filter: brightness(1.1);          /* Or hue-rotate, saturate */
```

---

**All components are fully customizable and documented. Edit freely to match your needs!**
