import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function Navbar({ onSignUp }) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'عن الكورس', href: '#features' },
    { label: 'المنهج', href: '#syllabus' },
    { label: 'المميزات', href: '#about' },
  ]

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'glass border-b border-orange/30'
          : 'bg-transparent'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <img
            src="/logo.png"
            alt="Zainstein"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Center Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm text-white/70 hover:text-orange transition-colors duration-300 font-sans"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Right Button */}
        <motion.button
          onClick={onSignUp}
          className="btn-primary text-sm whitespace-nowrap"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          سجّل اهتمامك
        </motion.button>
      </div>
    </motion.nav>
  )
}
