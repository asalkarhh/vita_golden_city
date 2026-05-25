import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import Button from '../ui/Button'

export default function FinalCTA() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="absolute inset-0 gold-gradient-bg opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-dark" />

      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7 }}
        className="relative max-w-4xl mx-auto px-4 text-center"
      >
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading font-bold gold-gradient-text mb-6">
          {t('final_cta.title')}
        </h2>
        <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">
          {t('final_cta.subtitle')}
        </p>
        <Button to="/collab" size="lg" className="text-lg">
          {t('final_cta.button')}
          <ArrowRight size={22} />
        </Button>
      </motion.div>
    </section>
  )
}
