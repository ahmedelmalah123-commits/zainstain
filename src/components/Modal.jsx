import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle, AlertCircle } from 'lucide-react'
import emailjs from '@emailjs/browser'

export default function Modal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    whatsapp: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  // Initialize EmailJS (Replace with your actual values)
  // https://dashboard.emailjs.com/admin/account
  const PUBLIC_KEY = 'YOUR_PUBLIC_KEY' // Replace this with your EmailJS public key
  const SERVICE_ID = 'service_4jhjdud'
  const ADMIN_TEMPLATE_ID = 'YOUR_ADMIN_TEMPLATE_ID' // Replace with your admin template ID
  const USER_TEMPLATE_ID = 'YOUR_USER_TEMPLATE_ID' // Replace with your user reply template ID
  const ADMIN_EMAIL = 'engmala7112004@gmail.com'

  // Initialize EmailJS once
  if (PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
    emailjs.init(PUBLIC_KEY)
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setError('الاسم الكامل مطلوب')
      return false
    }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('بريد إلكتروني صحيح مطلوب')
      return false
    }
    if (!formData.whatsapp.trim()) {
      setError('رقم الواتساب مطلوب')
      return false
    }
    return true
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    // Check if EmailJS is properly configured
    if (PUBLIC_KEY === 'YOUR_PUBLIC_KEY' || ADMIN_TEMPLATE_ID === 'YOUR_ADMIN_TEMPLATE_ID') {
      setError('⚠️ EmailJS غير مُعد. يرجى تعيين المتغيرات في Modal.jsx')
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Send email to admin
      await emailjs.send(
        SERVICE_ID,
        ADMIN_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          whatsapp: formData.whatsapp,
          to_email: ADMIN_EMAIL,
        }
      )

      // Send auto-reply to user
      await emailjs.send(
        SERVICE_ID,
        USER_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          whatsapp: formData.whatsapp,
          to_email: formData.email,
        }
      )

      setSuccess(true)
      setFormData({ name: '', email: '', whatsapp: '' })
      
      // Auto close after 4 seconds
      setTimeout(() => {
        onClose()
        setSuccess(false)
      }, 4000)
    } catch (error) {
      console.error('EmailJS Error:', error)
      setError('حدث خطأ أثناء التسجيل. يرجى المحاولة لاحقاً.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="glass rounded-2xl p-8 max-w-md w-full relative"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 left-6 text-white/60 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <AnimatePresence>
              {!success ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="text-right"
                >
                  {/* Icon */}
                  <motion.div
                    className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-orange to-rose mb-6"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    <span className="text-2xl">🎓</span>
                  </motion.div>

                  {/* Title */}
                  <h2 className="text-2xl font-bold mb-2 font-mono">احجز مكانك</h2>
                  <p className="text-white/60 text-sm mb-6">
                    سنُعلمك فور توافر الكورس وتكون أول المسجلين
                  </p>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-4 p-3 bg-rose/20 border border-rose/50 rounded-lg flex gap-2 items-start"
                    >
                      <AlertCircle size={18} className="text-rose flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-rose text-right">{error}</span>
                    </motion.div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name Field */}
                    <div>
                      <label className="block text-sm text-white/70 mb-2">الاسم الكامل</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="أحمد محمد"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-orange focus:bg-white/10 transition-all"
                      />
                    </div>

                    {/* Email Field */}
                    <div>
                      <label className="block text-sm text-white/70 mb-2">البريد الإلكتروني</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your@email.com"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-orange focus:bg-white/10 transition-all"
                      />
                    </div>

                    {/* WhatsApp Field */}
                    <div>
                      <label className="block text-sm text-white/70 mb-2">رقم الواتساب</label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={formData.whatsapp}
                        onChange={handleChange}
                        placeholder="+20 100 000 0000"
                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/30 focus:border-orange focus:bg-white/10 transition-all"
                      />
                    </div>

                    {/* Submit Button */}
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="w-full btn-primary py-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                      whileHover={!isLoading ? { scale: 1.02 } : {}}
                      whileTap={!isLoading ? { scale: 0.98 } : {}}
                    >
                      {isLoading ? 'جارِ التسجيل...' : 'احجز الآن'}
                    </motion.button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-center py-6"
                >
                  {/* Success Icon */}
                  <motion.div
                    animate={{ scale: [0.8, 1.1, 1] }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    className="flex justify-center mb-4"
                  >
                    <CheckCircle size={64} className="text-green-500" />
                  </motion.div>

                  <h3 className="text-2xl font-bold mb-2 font-mono">تم بنجاح!</h3>
                  <p className="text-white/80 mb-2">
                    تم التسجيل بنجاح
                  </p>
                  <p className="text-white/60 text-sm">
                    سنخبرك لتكون أول المعلمين عند توافر الكورس
                  </p>

                  {/* Loading Bar */}
                  <motion.div
                    className="mt-6 h-1 bg-gradient-to-r from-transparent via-green-500 to-transparent rounded-full"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
