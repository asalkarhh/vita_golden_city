import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../../hooks/useScrollAnimation'
import { Play } from 'lucide-react'

const reelPlaceholders = [
  { id: 1, url: '[REEL_URL_1]', title: 'Brand Promotion 1' },
  { id: 2, url: '[REEL_URL_2]', title: 'Brand Promotion 2' },
  { id: 3, url: '[REEL_URL_3]', title: 'Brand Promotion 3' },
  { id: 4, url: '[REEL_URL_4]', title: 'Brand Promotion 4' },
  { id: 5, url: '[REEL_URL_5]', title: 'Brand Promotion 5' },
  { id: 6, url: '[REEL_URL_6]', title: 'Brand Promotion 6' },
]

export default function ReelsGrid() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="py-20 bg-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gold-gradient-text">
            {t('featured_reels.title')}
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            {t('featured_reels.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6"
        >
          {reelPlaceholders.map((reel) => (
            <motion.div
              key={reel.id}
              variants={fadeInUp}
              className="relative aspect-[9/16] bg-dark-soft border border-dark-border rounded-xl overflow-hidden group cursor-pointer"
            >
              <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-500 group-hover:text-gold transition-colors">
                <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gold/10 group-hover:bg-gold/20 transition-colors mb-3">
                  <Play size={28} className="ml-1" />
                </div>
                <span className="text-xs text-center px-4">
                  {reel.title}
                </span>
                <span className="text-[10px] mt-1 text-gray-600">
                  Replace with Instagram embed
                </span>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
