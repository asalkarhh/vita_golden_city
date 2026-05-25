import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Check, Star, ArrowRight } from 'lucide-react'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation'
import { services } from '../data/services'
import Button from '../components/ui/Button'

export default function Services() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{t('services.page_title')}</title>
        <meta name="description" content="Explore our promotion packages — Story Shoutouts, Reel Promotions, Event Coverage, and Brand Ambassador plans." />
      </Helmet>

      <section className="pt-36 pb-20 bg-dark relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-heading font-bold gold-gradient-text"
          >
            {t('services.hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-400 text-lg"
          >
            {t('services.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {services.map((service) => {
              const features = t(`services.${service.id}.features`, { returnObjects: true })
              const isCustom = t(`services.${service.id}.price`) === 'Custom' || t(`services.${service.id}.price`) === 'कस्टम'

              return (
                <motion.div
                  key={service.id}
                  variants={fadeInUp}
                  className={`relative card-dark p-6 md:p-8 flex flex-col ${
                    service.popular ? 'border-gold/50 gold-glow ring-1 ring-gold/20' : ''
                  }`}
                >
                  {service.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-gold text-dark text-xs font-bold rounded-full flex items-center gap-1">
                      <Star size={12} fill="currentColor" />
                      {t('services.popular')}
                    </div>
                  )}

                  <h3 className="text-xl font-heading font-bold text-white mt-2">
                    {t(`services.${service.id}.name`)}
                  </h3>

                  <div className="mt-4">
                    <span className="text-xs text-gray-500 uppercase tracking-wider">
                      {t(`services.${service.id}.price_label`)}
                    </span>
                    <div className="text-3xl font-heading font-bold text-gold mt-1">
                      {t(`services.${service.id}.price`)}
                    </div>
                  </div>

                  <ul className="mt-6 space-y-3 flex-1">
                    {Array.isArray(features) && features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                        <Check size={16} className="text-gold shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    to="/collab"
                    variant={service.popular ? 'primary' : 'outline'}
                    size="md"
                    className="w-full mt-8"
                  >
                    {isCustom ? t('services.custom_quote') : t('services.get_this')}
                    <ArrowRight size={16} />
                  </Button>
                </motion.div>
              )
            })}
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="mt-10 text-center text-gray-500 text-sm max-w-2xl mx-auto"
          >
            {t('services.pricing_note')}
          </motion.p>
        </div>
      </section>
    </motion.div>
  )
}
