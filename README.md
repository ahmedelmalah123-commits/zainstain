# 🚀 Zainstein - Foundations of Software Engineering & AI

A production-ready landing page for an online course with a dark tech/cyber aesthetic, built with React, Vite, Tailwind CSS, and Framer Motion.

## 🎨 Design Features

- **Dark Cyber Aesthetic**: Deep blues, magentas, and neon orange accents
- **Glassmorphism Cards**: Frosted glass effect with backdrop blur
- **Animated Background**: Circuit grid lines, gradient mesh blobs, and scanline overlays
- **Neon Effects**: Glowing borders and text shadows
- **Smooth Animations**: Framer Motion for interactive elements
- **RTL Support**: Full Arabic language support with right-to-left layout
- **Responsive Design**: Mobile-first approach with Tailwind CSS

## 📋 Tech Stack

- **React 18** - UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **Lucide React** - Icon library
- **EmailJS** - Email service integration

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 📧 EmailJS Setup

To enable the registration form, you need to configure EmailJS:

### 1. Create EmailJS Account
- Go to [EmailJS](https://www.emailjs.com/)
- Sign up and log in to your account

### 2. Create Email Service
- In the Dashboard, go to **Email Services**
- Add a new service (Gmail recommended)
- Note your **Service ID**: `service_4jhjdud`

### 3. Create Admin Notification Template
In **Email Templates**, create a new template with:

```
Subject: 🎓 تسجيل جديد — Zainstein Course

Content:
Name: {{from_name}}
Email: {{from_email}}
WhatsApp: {{whatsapp}}

To Email: engmala7112004@gmail.com
```

Save and note your **Template ID** (e.g., `template_xxxxx`)

### 4. Create Auto-Reply Template
Create another template for user confirmation:

```
Subject: تم تسجيلك في كورس Zainstein 🎉

Content:
تم التسجيل بنجاح، سنخبرك لتكون أول المعلمين عند توافر الكورس.

— فريق Zainstein

To Email: {{from_email}}
```

Save and note this **Template ID**

### 5. Get Your Public Key
- Go to **Account Settings** → **General**
- Copy your **Public Key**

### 6. Update Modal Component
Edit `src/components/Modal.jsx` and replace:

```javascript
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Your EmailJS public key
const ADMIN_TEMPLATE_ID = 'YOUR_ADMIN_TEMPLATE_ID' // Admin notification template
const USER_TEMPLATE_ID = 'YOUR_USER_TEMPLATE_ID' // Auto-reply template
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.jsx          # Navigation bar with logo and CTA button
│   ├── Hero.jsx            # Main hero section
│   ├── StatsBar.jsx        # Statistics display
│   ├── WhatYouLearn.jsx    # Feature cards (6 items)
│   ├── WhoIsItFor.jsx      # Target audience cards (4 items)
│   ├── Syllabus.jsx        # Accordion curriculum (5 modules)
│   ├── Footer.jsx          # Footer with copyright
│   └── Modal.jsx           # Registration modal with form
├── App.jsx                 # Main app component
├── main.jsx                # React entry point
└── index.css               # Global styles with animations

├── index.html              # HTML entry point
├── package.json            # Dependencies
├── tailwind.config.js      # Tailwind configuration with custom colors
├── postcss.config.js       # PostCSS configuration
└── vite.config.js          # Vite configuration
```

## 🎯 Page Sections

1. **Navbar** - Fixed navigation with smooth scroll on scroll-down
2. **Hero** - Main hero section with course card and CTA buttons
3. **Stats Bar** - Quick stats about the course
4. **What You Learn** - 6 feature cards in a grid
5. **Who Is It For** - 4 target audience cards with left borders
6. **Syllabus** - Accordion-style 5 modules with expandable lessons
7. **Footer** - Copyright and designer credit
8. **Modal** - Registration form with EmailJS integration

## 🎨 Color Palette

```css
Primary:    #1a05a2 (Deep Blue)
Magenta:    #8f0177 (Accent)
Rose:       #de1a58 (Secondary)
Orange:     #f67d31 (CTA, Highlights)
Dark:       #04020f (Background)
Surface:    #0a061f (Cards)
```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: `md` (768px), `lg` (1024px)
- All components are fully responsive

## ♿ Accessibility

- Semantic HTML
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support via Framer Motion

## 📝 Environment Variables

Create a `.env` file if needed:

```env
VITE_PUBLIC_KEY=your_emailjs_public_key
VITE_SERVICE_ID=your_emailjs_service_id
VITE_ADMIN_TEMPLATE_ID=your_admin_template_id
VITE_USER_TEMPLATE_ID=your_user_template_id
```

Then update `Modal.jsx` to use environment variables:

```javascript
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
const SERVICE_ID = import.meta.env.VITE_SERVICE_ID
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_ADMIN_TEMPLATE_ID
const USER_TEMPLATE_ID = import.meta.env.VITE_USER_TEMPLATE_ID
```

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Netlify
```bash
npm install -g netlify-cli
netlify deploy --prod --dir=dist
```

### GitHub Pages
```bash
npm run build
# Push dist folder to gh-pages branch
```

## 📜 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Ahmed Salah** - Zainstein

---

### ⚡ Quick Tips

1. All animations use Framer Motion with `viewport` triggers for scroll animations
2. Tailwind colors are customized in `tailwind.config.js`
3. RTL layout is set in `index.html` with `dir="rtl"`
4. EmailJS is initialized on component mount in `Modal.jsx`
5. Glass effect is a reusable class defined in `index.css`

### 🐛 Troubleshooting

**Form not sending emails?**
- Verify EmailJS Public Key, Service ID, and Template IDs are correct
- Check browser console for EmailJS errors
- Ensure CORS is enabled for your domain

**Animations not playing?**
- Check if Framer Motion is installed: `npm install framer-motion`
- Verify viewport props in components

**Styles not applying?**
- Rebuild with: `npm run build`
- Clear Tailwind cache: Delete `.next` folder if exists
- Ensure Tailwind CSS is imported in `index.css`
