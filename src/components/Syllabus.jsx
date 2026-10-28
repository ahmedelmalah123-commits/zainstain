import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export default function Syllabus() {
  const [expandedModule, setExpandedModule] = useState(0)

  const modules = [
    {
      title: 'Module 1 — Programming Foundations',
      lessons: 8,
      content: [
        'المتغيرات والأنواع البيانية',
        'الدوال والـ Scope',
        'البرمجة الكائنية التوجه OOP',
        'التعامل مع الأخطاء والـ Debugging',
      ],
    },
    {
      title: 'Module 2 — Software Engineering Principles',
      lessons: 10,
      content: [
        'SOLID Principles',
        'Design Patterns',
        'Clean Code',
        'الـ Refactoring والـ Testing',
      ],
    },
    {
      title: 'Module 3 — Frontend with React',
      lessons: 12,
      content: [
        'React Hooks والـ State Management',
        'Component Design',
        'Styling مع Tailwind CSS',
        'Performance Optimization',
      ],
    },
    {
      title: 'Module 4 — Backend & Databases',
      lessons: 10,
      content: [
        'Node.js و Express',
        'REST API Design',
        'SQL & NoSQL Databases',
        'Authentication & Security',
      ],
    },
    {
      title: 'Module 5 — AI Integration & Projects',
      lessons: 8,
      content: [
        'AI APIs & LLM Integration',
        'Building AI-Powered Applications',
        'Deployment & DevOps',
        'Graduation Project',
      ],
    },
  ]

  const conclusionPoints = [
    'خريج الكورس سيكون لديه مهارات متقدمة في هندسة البرمجيات',
    'قادر على بناء تطبيقات متكاملة مع الذكاء الاصطناعي',
    'Portfolio مشاريع حقيقية وجاهزة للعمل',
    'فهم عميق للأفضليات والممارسات الحديثة',
    'جاهز للعمل كـ Full-Stack Developer أو AI Engineer',
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
    <section dir="rtl" id="syllabus" className="relative py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#f67d31] font-mono text-sm tracking-widest font-cairo">// المنهج الدراسي</span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mt-2 bg-gradient-to-r from-[#1a05a2] via-[#8f0177] to-[#f67d31] bg-clip-text text-transparent">
            Curriculum
          </h2>
          <p className="text-white/60 mt-4 font-cairo">
            5 وحدات تعليمية شاملة تغطي كل شيء تحتاجه
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          className="space-y-4 mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {modules.map((module, index) => (
            <motion.div key={index} variants={cardVariants}>
              <button
                onClick={() => setExpandedModule(expandedModule === index ? -1 : index)}
                className="w-full bg-[#0a061f] border border-[#1a05a2]/30 p-6 rounded-xl text-right hover:border-[#f67d31]/50 transition-all duration-300 flex items-center justify-between group"
              >
                <div className="flex-1 text-right">
                  <h3 className="text-lg font-bold font-mono mb-1">
                    {module.title}
                  </h3>
                  <p className="text-sm text-white/60 font-cairo">
                    {module.lessons} درس
                  </p>
                </div>
                <motion.div
                  animate={{ rotate: expandedModule === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="ml-4 flex-shrink-0"
                >
                  <ChevronDown size={24} className="text-[#f67d31]" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedModule === index && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden mt-2"
                  >
                    <div className="bg-[#0a061f]/50 border border-t-0 border-[#1a05a2]/30 p-6 rounded-b-xl">
                      <ul className="space-y-3 text-right">
                        {module.content.map((lesson, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="flex items-center gap-3 text-white/80 font-cairo"
                          >
                            <span className="w-2 h-2 bg-[#f67d31] rounded-full flex-shrink-0"></span>
                            {lesson}
                          </motion.li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {/* Conclusion Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-[#1a05a2]/20 to-[#8f0177]/20 border border-[#f67d31]/30 rounded-2xl p-8"
        >
          <h3 className="text-2xl font-bold mb-6 font-cairo bg-gradient-to-r from-[#f67d31] to-[#de1a58] bg-clip-text text-transparent">
            ماذا ستحصل في النهاية؟
          </h3>
          <ul className="space-y-4">
            {conclusionPoints.map((point, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-4 text-white/80 font-cairo"
              >
                <span className="w-3 h-3 bg-[#f67d31] rounded-full flex-shrink-0 mt-2"></span>
                <span>{point}</span>
              </motion.li>
            ))}
          </ul>

          <div className="mt-8 pt-6 border-t border-white/10">
            <p className="text-white/70 text-center italic font-cairo">
              "الخلاصة: كورس شامل يأخذك من البداية إلى الاحترافية في عالم البرمجة والذكاء الاصطناعي"
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
