# ⚙️ EmailJS Setup Guide

Follow these steps to configure EmailJS for the Zainstein landing page.

## Step 1: Create EmailJS Account

1. Visit [emailjs.com](https://www.emailjs.com/)
2. Sign up or log in
3. Go to the **Dashboard**

## Step 2: Get Your Service ID ✅

**Service ID**: `service_4jhjdud` (Already configured)

This is the Gmail service that will send emails.

## Step 3: Create Admin Notification Template

### Go to: Email Templates → Create New Template

**Template Settings:**
- **To Email**: `engmala7112004@gmail.com`
- **Subject**: `🎓 تسجيل جديد — Zainstein Course`

**Email Content:**
```
Name: {{from_name}}
Email: {{from_email}}
WhatsApp: {{whatsapp}}
```

**Save Template** and copy the **Template ID** (looks like: `template_xxxxxxxxxxxxx`)

### Paste Template ID here:
```
ADMIN_TEMPLATE_ID = "___________________"
```

## Step 4: Create Auto-Reply Template (User Confirmation)

### Go to: Email Templates → Create New Template

**Template Settings:**
- **To Email**: `{{from_email}}`
- **Subject**: `تم تسجيلك في كورس Zainstein 🎉`

**Email Content:**
```
تم التسجيل بنجاح، سنخبرك لتكون أول المعلمين عند توافر الكورس.

— فريق Zainstein
```

**Save Template** and copy the **Template ID**

### Paste Template ID here:
```
USER_TEMPLATE_ID = "___________________"
```

## Step 5: Get Your Public Key

1. Go to **Account** (click your profile icon)
2. Select **General**
3. Find **Public Key** section
4. Copy the entire public key (starts with `pk_`)

### Paste Public Key here:
```
PUBLIC_KEY = "___________________"
```

## Step 6: Update Modal Component

Open `src/components/Modal.jsx` and find these lines (around line 18-22):

```javascript
const PUBLIC_KEY = 'YOUR_PUBLIC_KEY'
const SERVICE_ID = 'service_4jhjdud'
const ADMIN_TEMPLATE_ID = 'YOUR_ADMIN_TEMPLATE_ID'
const USER_TEMPLATE_ID = 'YOUR_USER_TEMPLATE_ID'
const ADMIN_EMAIL = 'engmala7112004@gmail.com'
```

Replace the `YOUR_*` values with your credentials:

```javascript
const PUBLIC_KEY = 'pk_abc123...' // Your Public Key from Step 5
const SERVICE_ID = 'service_4jhjdud' // Already set
const ADMIN_TEMPLATE_ID = 'template_xxx...' // From Step 3
const USER_TEMPLATE_ID = 'template_yyy...' // From Step 4
const ADMIN_EMAIL = 'engmala7112004@gmail.com' // Already set
```

## Step 7: Test the Form

1. Run the development server:
   ```bash
   npm run dev
   ```

2. Click any **CTA button** (احجز مكانك الآن / حجز لحين التوفر)

3. Fill in the form:
   - **الاسم الكامل**: أحمد محمد
   - **البريد الإلكتروني**: your-email@example.com
   - **رقم الواتساب**: +20 123 456 7890

4. Submit the form

5. You should see:
   - ✅ Success animation on the modal
   - 📧 Email received at `engmala7112004@gmail.com`
   - 📧 Auto-reply email sent to the user's email

## ✨ Success Checklist

- [ ] EmailJS account created
- [ ] Service ID noted (`service_4jhjdud`)
- [ ] Admin notification template created and ID copied
- [ ] User reply template created and ID copied
- [ ] Public Key copied
- [ ] `Modal.jsx` updated with all three values
- [ ] Test form submission works
- [ ] Email received in admin inbox
- [ ] Auto-reply email received in user inbox

## 🚀 Optional: Use Environment Variables

For better security, create a `.env.local` file:

```env
VITE_PUBLIC_KEY=pk_abc123...
VITE_ADMIN_TEMPLATE_ID=template_xxx...
VITE_USER_TEMPLATE_ID=template_yyy...
```

Then update `Modal.jsx`:

```javascript
const PUBLIC_KEY = import.meta.env.VITE_PUBLIC_KEY
const ADMIN_TEMPLATE_ID = import.meta.env.VITE_ADMIN_TEMPLATE_ID
const USER_TEMPLATE_ID = import.meta.env.VITE_USER_TEMPLATE_ID
```

## 🔧 Troubleshooting

### "EmailJS Error: Invalid credentials"
- Check that `PUBLIC_KEY`, `SERVICE_ID`, and `TEMPLATE_ID` are correct
- Verify service is active in EmailJS dashboard

### "Email not sending"
- Ensure Gmail service is properly configured in EmailJS
- Grammar check template variables: `{{from_name}}`, `{{from_email}}`, `{{whatsapp}}`

### "CORS errors"
- Enable CORS for your domain in EmailJS Account settings

### Form shows "EmailJS غير مُعد" error
- You haven't updated the placeholder values in `Modal.jsx`
- Replace `YOUR_PUBLIC_KEY`, `YOUR_ADMIN_TEMPLATE_ID`, `YOUR_USER_TEMPLATE_ID`

## 📚 More Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS Dashboard](https://dashboard.emailjs.com/)
- [JavaScript SDK Guide](https://www.emailjs.com/docs/sdk/installation/)
