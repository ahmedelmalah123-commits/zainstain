import { motion } from 'framer-motion'
import { Code2, Brain, Palette, Server, Zap, Users } from 'lucide-react'

export default function WhatYouLearn() {
  const features = [
    {
      icon: Code2,
      title: 'أساسيات هندسة البرمجيات',
      description: 'Software Design Patterns, Clean Code',
    },
    {
      icon: Brain,
      title: 'تطبيقات الذكاء الاصطناعي',
      description: 'AI APIs & libraries integration',
    },
    {
      icon: Palette,
      title: 'Frontend Development',
      description: 'React, Tailwind CSS, UX',
    },
    {
      icon: Server,
      title: 'Backend & APIs',
      description: 'Node.js, REST, Databases',
    },
    {
      icon: Zap,
      title: 'Deployment & DevOps',
      description: 'Vercel, GitHub Actions, CI/CD',
    },
    {
      icon: Users,
      title: 'Portfolio & Career',
      description: 'CV, GitHub profile, freelancing',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section dir="rtl" id="features" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#f67d31] font-mono text-sm tracking-widest font-cairo">::</span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mt-2 bg-gradient-to-r from-[#1a05a2] via-[#8f0177] to-[#f67d31] bg-clip-text text-transparent">
            ماذا ستتعلمه
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="bg-[#0a061f] border border-[#1a05a2]/30 p-8 rounded-2xl hover:border-[#f67d31]/50 transition-all duration-300 group hover:shadow-lg hover:shadow-[#f67d31]/20"
              >
                <div className="mb-4 inline-block p-3 bg-gradient-to-br from-[#f67d31] to-[#de1a58] rounded-lg">
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-bold mb-2 font-cairo">
                  {feature.title}
                </h3>
                <p className="text-white/60 text-sm leading-relaxed font-cairo">
                  {feature.description}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
