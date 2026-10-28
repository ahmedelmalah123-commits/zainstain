import { motion } from 'framer-motion'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <motion.footer
      className="relative border-t border-white/10 bg-gradient-to-b from-transparent to-primary/5"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-right">
          {/* Left - Logo */}
          <div className="md:text-right">
            <img
              src="/logo.png"
              alt="Zainstein"
              className="h-12 w-auto object-contain mx-auto md:mx-0"
            />
          </div>

          {/* Center - Copyright */}
          <div className="md:col-span-1">
            <p className="text-sm text-white/60 font-sans">
              © {currentYear} Zainstein — Engineering Tomorrow... Today
            </p>
          </div>

          {/* Right - Designer */}
          <div className="md:text-left">
            <p className="text-sm text-white/60 font-sans">
              Designed by Ahmed Al Malah
            </p>
          </div>
        </div>

        {/* Bottom Border Glow */}
        <div className="mt-8 pt-8 border-t border-orange/20">
          <motion.div
            className="h-1 bg-gradient-to-r from-transparent via-orange to-transparent rounded-full"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 3, repeat: Infinity }}
          ></motion.div>
        </div>
      </div>
    </motion.footer>
  )
}
