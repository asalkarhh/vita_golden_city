import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation'
import { faqItems } from '../data/faq'
import Accordion from '../components/ui/Accordion'
import Button from '../components/ui/Button'
import { ArrowRight } from 'lucide-react'

export default function FAQ() {
  const { t } = useTranslation()
  const [openId, setOpenId] = useState(null)
  const { ref, isInView } = useScrollAnimation()
// updated git visibility
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{t('faq.page_title')}</title>
        <meta name="description" content="Frequently asked questions about collaborating with Vita Golden City Official." />
        <meta name="keywords" content="vita, golden city, vita golden city, vita city of gold, collaboration" />
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

            {t('faq.hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-400 text-lg"
          >
            {t('faq.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-dark-soft">
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="space-y-4">
            {faqItems.map((item) => (
              <motion.div key={item.id} variants={fadeInUp}>
                <Accordion
                  question={t(`faq.${item.key}`)}
                  answer={t(`faq.${item.answerKey}`)}
                  isOpen={openId === item.id}
                  onToggle={() => setOpenId(openId === item.id ? null : item.id)}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            variants={fadeInUp}
            className="mt-16 text-center card-dark p-8"
          >
            <h3 className="text-xl font-heading font-bold text-white mb-3">
              {t('final_cta.title')}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {t('final_cta.subtitle')}
            </p>
            <Button to="/collab" size="md">
              {t('final_cta.button')}
              <ArrowRight size={18} />
            </Button>
          </motion.div>
        </motion.div>
      </section>
    </motion.div>
  )
}
