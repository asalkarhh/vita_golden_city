import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import CountUp from 'react-countup'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../../hooks/useScrollAnimation'
import { Users, Eye, Briefcase, Film } from 'lucide-react'

const stats = [
  { key: 'followers', value: 200000, suffix: '+', display: '2,00,000+', icon: Users },
  { key: 'views', value: 50, suffix: 'M+', icon: Eye },
  { key: 'brands', value: 500, suffix: '+', icon: Briefcase },
  { key: 'reels', value: 1000, suffix: '+', icon: Film },
]

export default function StatsStrip() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="relative py-16 bg-dark-soft border-y border-dark-border">
      <div className="absolute inset-0 bg-gradient-to-r from-gold/5 via-transparent to-gold/5" />
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.key}
                variants={fadeInUp}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gold/10 text-gold mb-3">
                  <Icon size={22} />
                </div>
                <div className="text-3xl md:text-4xl font-heading font-bold text-gold">
                  {isInView ? (
                    stat.value >= 200000 ? (
                      <><CountUp end={2} duration={2} />,<CountUp end={0} duration={0.5} />0,<CountUp end={0} duration={0.5} />00+</>
                    ) : (
                      <CountUp end={stat.value} duration={2.5} suffix={stat.suffix} />
                    )
                  ) : (
                    '0'
                  )}
                </div>
                <div className="mt-1 text-sm text-gray-400">{t(`stats.${stat.key}`)}</div>
              </motion.div>
            )
          })}
        </div>
      </motion.div>
    </section>
  )
}
