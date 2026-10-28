# 📌 Quick Reference Card

## Start Development
```bash
cd d:\projects\ZAINCOURSE2\zainstein-landing
npm run dev
```
→ Opens at `http://localhost:5173`

## Components Overview

| Component | Purpose | File |
|-----------|---------|------|
| Navbar | Navigation bar | `Navbar.jsx` |
| Hero | Main headline + course card | `Hero.jsx` |
| StatsBar | 4 statistics | `StatsBar.jsx` |
| WhatYouLearn | 6 feature cards | `WhatYouLearn.jsx` |
| WhoIsItFor | 4 audience cards | `WhoIsItFor.jsx` |
| Syllabus | 5 modules accordion | `Syllabus.jsx` |
| Footer | Footer | `Footer.jsx` |
| Modal | Registration form | `Modal.jsx` |

## Colors (Tailwind)
```css
primary: #1a05a2    (Deep Blue)
magenta: #8f0177    (Accent)
rose: #de1a58       (Secondary)
orange: #f67d31     (CTA Highlight)
dark: #04020f       (Background)
surface: #0a061f    (Card BG)
```

## CSS Classes (Global)
- `.glass` - Glass morphism effect
- `.neon-orange` - Orange glow
- `.gradient-text` - Gradient text
- `.btn-primary` - Primary button
- `.hover-glow` - Glow on hover
- `.pulse-border` - Pulsing border

## Form Fields (Modal)

```jsx
name      // Full name (required)
email     // Email (required, must be valid)
whatsapp  // WhatsApp number (required)
```

## EmailJS Setup

1. Create account: https://www.emailjs.com/
2. Service ID: `service_4jhjdud` ✓ (already set)
3. Create template 1: Admin notification
4. Create template 2: User auto-reply
5. Get: Public Key
6. Update in `Modal.jsx`:
   ```javascript
   PUBLIC_KEY = "..."
   ADMIN_TEMPLATE_ID = "..."
   USER_TEMPLATE_ID = "..."
   ```

## File Locations

```
d:\projects\ZAINCOURSE2\zainstein-landing\
├── src/
│   ├── App.jsx
│   ├── main.jsx
│   ├── index.css
│   └── components/
│       ├── Navbar.jsx
│       ├── Hero.jsx
│       ├── StatsBar.jsx
│       ├── WhatYouLearn.jsx
│       ├── WhoIsItFor.jsx
│       ├── Syllabus.jsx
│       ├── Footer.jsx
│       └── Modal.jsx
├── tailwind.config.js
├── vite.config.js
└── index.html
```

## Build & Deploy

```bash
npm run build        # Create dist/ for production
npm run preview      # Preview the build locally
```

Then deploy `dist/` folder to:
- Vercel (recommended)
- Netlify
- GitHub Pages
- Any static host

## Documentation Files

- `QUICKSTART.md` - 5-minute intro
- `EMAILJS_SETUP.md` - Form configuration
- `COMPONENTS.md` - Full component guide
- `README.md` - Complete reference
- `PROJECT_COMPLETE.md` - Project summary

## Customization Quick Tips

### Change colors everywhere:
Edit `tailwind.config.js` colors object

### Change text content:
Search for the text in components and replace

### Change animations:
Modify `transition` props in Framer Motion

### Add more cards:
Copy card structure and add to data array

### Add new section:
Copy any component as template, add to App.jsx

## Debug Checklist

- [ ] Dev server running? `npm run dev`
- [ ] All components rendering? Check browser
- [ ] EmailJS not working? Check credentials in Modal.jsx
- [ ] Styles broken? Rebuild: `npm run build`
- [ ] Form validation failing? Check console for errors

## Key Dependencies

| Package | Used For |
|---------|----------|
| react | UI components |
| framer-motion | Animations |
| tailwindcss | Styling |
| lucide-react | Icons |
| @emailjs/browser | Email service |

All already installed!

## Keyboard Shortcuts

- `npm run dev` - Start development
- `npm run build` - Build for production
- `npm run preview` - Test production build
- `Ctrl+C` - Stop dev server

## Form Submit Flow

1. User fills form
2. Client-side validation
3. EmailJS.send() called
4. Admin email sent to: engmala7112004@gmail.com
5. Auto-reply sent to: user's email
6. Success modal shown
7. Auto-close after 4 seconds

## Performance Notes

✅ Optimized:
- Code splitting by Vite
- Lazy animation renders by Framer
- Efficient Tailwind classes
- Hardware-accelerated CSS
- No unused packages

## Responsive Breakpoints

- Mobile: Default (< 768px)
- Tablet: `md:` (768px+)
- Desktop: `lg:` (1024px+)

All components responsive!

## Support

📖 Read docs first: `QUICKSTART.md`
🔍 Check specific guide: `EMAILJS_SETUP.md`
📚 Reference: `COMPONENTS.md`
❓ Full help: `README.md`

---

**TL;DR:** 
1. `npm run dev` to see it
2. Follow `EMAILJS_SETUP.md` for forms
3. `npm run build` to deploy
4. Done! 🚀
