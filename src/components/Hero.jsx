import { motion } from 'framer-motion'
import { Zap } from 'lucide-react'

export default function Hero({ onSignUp }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: 'easeOut' },
    },
  }

  return (
    <section dir="rtl" className="relative min-h-screen flex items-center justify-center pt-20 pb-20 px-6 overflow-hidden">
      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <motion.div
          className="flex flex-col gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Badge */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full bg-[#0a061f] border border-[#f67d31]/30 hover:border-[#f67d31]/60 transition-all duration-300"
          >
            <span className="w-2 h-2 bg-[#f67d31] rounded-full animate-pulse"></span>
            <span className="text-xs font-semibold text-[#f67d31] font-cairo">قريباً — كن أول من يعلم</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-6xl font-bold font-mono leading-tight bg-gradient-to-r from-[#1a05a2] via-[#8f0177] to-[#f67d31] bg-clip-text text-transparent"
          >
            Foundations of<br />Software Engineering<br />& Artificial Intelligence
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg text-white/70 leading-relaxed max-w-lg font-cairo"
          >
            كورس متكامل يأخذك من الأساسيات إلى بناء مشاريع حقيقية باستخدام أحدث تقنيات الـ AI — مُصمَّم خصيصاً للطلاب والمطورين العرب.
          </motion.p>

          {/* Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex gap-4 pt-4 flex-wrap"
          >
            <button
              onClick={onSignUp}
              className="px-8 py-3 rounded-lg bg-gradient-to-r from-[#f67d31] to-[#de1a58] text-white font-bold hover:shadow-lg hover:shadow-[#f67d31]/50 transition-all duration-300 flex items-center gap-2 font-cairo"
            >
              <Zap size={18} />
              احجز مكانك الآن
            </button>
            <a
              href="#syllabus"
              className="px-8 py-3 rounded-lg border border-white/30 text-white font-bold hover:border-[#8f0177] hover:text-[#8f0177] transition-all duration-300 font-cairo"
            >
              تعرّف على المنهج
            </a>
          </motion.div>
        </motion.div>

        {/* Right Side - Course Card */}
        <motion.div
          variants={itemVariants}
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <div className="bg-[#0a061f] border border-[#1a05a2]/30 p-6 rounded-2xl overflow-hidden group hover:border-[#f67d31]/50 transition-all duration-300">
            {/* Gradient Background */}
            <div className="relative w-full h-64 bg-gradient-to-br from-[#1a05a2] via-[#8f0177] to-[#de1a58] rounded-xl overflow-hidden mb-6">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-white/40 text-6xl font-mono">⚙️</div>
              </div>
              
              {/* Circuit Grid Overlay */}
              <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none">
                <defs>
                  <pattern id="circuit" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
                    <rect x="0" y="0" width="40" height="40" fill="none" stroke="rgba(246,125,49,0.3)" strokeWidth="1"/>
                    <circle cx="5" cy="5" r="2" fill="rgba(246,125,49,0.5)"/>
                    <circle cx="35" cy="35" r="2" fill="rgba(246,125,49,0.5)"/>
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#circuit)"/>
              </svg>
            </div>

            {/* Badge */}
            <div className="inline-block px-3 py-1 bg-[#f67d31]/20 border border-[#f67d31]/50 rounded-full mb-4">
              <span className="text-xs font-bold text-[#f67d31] font-cairo">قيد الإنتاج</span>
            </div>

            {/* Content */}
            <h3 className="text-xl font-bold mb-2 font-mono">
              Zainstein Engineering
            </h3>
            <p className="text-sm text-white/60 font-cairo">
              Ahmed Salah — Zainstein
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
