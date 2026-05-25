import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { MapPin, Languages, Clock, BarChart3 } from 'lucide-react'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../../hooks/useScrollAnimation'

const features = [
  { key: 'reach', icon: MapPin },
  { key: 'content', icon: Languages },
  { key: 'turnaround', icon: Clock },
  { key: 'results', icon: BarChart3 },
]

export default function WhyWorkWithMe() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-20 bg-dark-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gold-gradient-text">
            {t('why_work.title')}
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            {t('why_work.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={feature.key}
                variants={fadeInUp}
                className="card-dark p-6 text-center hover:border-gold/40 hover:gold-glow transition-all duration-300 group"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 text-gold mb-5 group-hover:bg-gold group-hover:text-dark transition-colors">
                  <Icon size={26} />
                </div>
                <h3 className="text-lg font-heading font-semibold text-white mb-2">
                  {t(`why_work.${feature.key}_title`)}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {t(`why_work.${feature.key}_desc`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
