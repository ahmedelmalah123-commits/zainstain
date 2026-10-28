import { motion } from 'framer-motion'

export default function StatsBar() {
  const stats = [
    { label: 'درس', value: '+40' },
    { label: 'مشاريع', value: '8' },
    { label: 'وصول', value: '∞' },
    { label: 'باللغة العربية', value: 'AR' },
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

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <motion.section
      className="relative py-12 px-6"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-100px' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`glass p-6 rounded-xl text-center ${
                index !== stats.length - 1 ? 'md:border-l border-white/10' : ''
              }`}
            >
              <div className="font-mono text-3xl md:text-4xl font-bold gradient-orange mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-white/60 font-sans">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}
