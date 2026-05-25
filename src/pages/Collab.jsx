import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { ClipboardCheck, Phone, Film, Rocket } from 'lucide-react'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation'
import CollabForm from '../components/form/CollabForm'

const timelineSteps = [
  { key: 'step1', icon: ClipboardCheck },
  { key: 'step2', icon: Phone },
  { key: 'step3', icon: Film },
  { key: 'step4', icon: Rocket },
]

export default function Collab() {
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
        <title>{t('collab.page_title')}</title>
        <meta name="description" content="Book a collaboration with Vita Golden City. Fill out our form and we'll reach out within 24 hours." />
      </Helmet>

      <section className="pt-36 pb-10 bg-dark relative">
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
            {t('collab.hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-400 text-lg"
          >
            {t('collab.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-16 bg-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:col-span-3"
            >
              <div className="card-dark p-6 md:p-8">
                <CollabForm />
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              ref={ref}
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="lg:col-span-2"
            >
              <div className="card-dark p-6 md:p-8 sticky top-28">
                <h3 className="text-xl font-heading font-bold gold-gradient-text mb-8">
                  {t('collab.timeline.title')}
                </h3>

                <div className="space-y-8">
                  {timelineSteps.map((step, index) => {
                    const Icon = step.icon
                    return (
                      <div key={step.key} className="flex gap-4">
                        <div className="flex flex-col items-center">
                          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 text-gold border border-gold/20">
                            <Icon size={18} />
                          </div>
                          {index < timelineSteps.length - 1 && (
                            <div className="w-px h-full bg-gold/20 mt-2" />
                          )}
                        </div>
                        <div className="pb-2">
                          <h4 className="text-white font-semibold text-sm">
                            {t(`collab.timeline.${step.key}_title`)}
                          </h4>
                          <p className="text-gray-400 text-xs mt-1 leading-relaxed">
                            {t(`collab.timeline.${step.key}_desc`)}
                          </p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
