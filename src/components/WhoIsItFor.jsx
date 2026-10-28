import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'

export default function WhoIsItFor() {
  const targetUsers = [
    {
      title: 'طالب في تخصص الحاسبات أو الهندسة',
      description: 'تأسيس قوي في هندسة البرمجيات وأحدث التقنيات',
    },
    {
      title: 'مبتدئ في البرمجة وعايز يبدأ صح',
      description: 'كل شيء من الصفر مع أفضل الممارسات',
    },
    {
      title: 'مطور عايز يفهم software engineering صح ويدخل عالم AI',
      description: 'رفع المستوى وتطبيق الـ AI في مشاريعك',
    },
    {
      title: 'أي حد عايز يبني مشاريع ويشتغل freelancer',
      description: 'Portfolio حقيقي وجاهز للعمل الحر',
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
    hidden: { opacity: 0, x: 20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section dir="rtl" className="relative py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-[#f67d31] font-mono text-sm tracking-widest font-cairo">[ لمن ]</span>
          <h2 className="text-4xl md:text-5xl font-bold font-mono mt-2 bg-gradient-to-r from-[#1a05a2] via-[#8f0177] to-[#f67d31] bg-clip-text text-transparent">
            هذا الكورس لك؟
          </h2>
        </motion.div>

        {/* Cards Grid */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {targetUsers.map((user, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="bg-[#0a061f] border-l-4 border-[#8f0177] border-t border-r border-b border-t-[#1a05a2]/30 border-r-[#1a05a2]/30 border-b-[#1a05a2]/30 p-8 rounded-xl hover:border-l-[#f67d31] transition-all duration-300 group hover:shadow-lg hover:shadow-[#8f0177]/20"
            >
              <div className="flex gap-4">
                <CheckCircle className="text-[#8f0177] flex-shrink-0 mt-1" size={24} />
                <div className="flex-1">
                  <h3 className="text-lg font-bold mb-2 font-cairo">
                    {user.title}
                  </h3>
                  <p className="text-white/60 text-sm font-cairo">
                    {user.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
