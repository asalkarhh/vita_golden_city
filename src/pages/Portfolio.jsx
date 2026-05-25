import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Play, Eye, Download, X } from 'lucide-react'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation'
import { portfolioItems } from '../data/portfolio'
import Button from '../components/ui/Button'
import Modal from '../components/ui/Modal'

const filters = [
  { key: 'all', value: 'filter_all' },
  { key: 'restaurants', value: 'filter_restaurants' },
  { key: 'realestate', value: 'filter_realestate' },
  { key: 'events', value: 'filter_events' },
  { key: 'education', value: 'filter_education' },
  { key: 'retail', value: 'filter_retail' },
  { key: 'jewelry', value: 'filter_jewelry' },
]

export default function Portfolio() {
  const { t, i18n } = useTranslation()
  const isMr = i18n.language === 'mr'
  const [activeFilter, setActiveFilter] = useState('all')
  const [selectedItem, setSelectedItem] = useState(null)
  const { ref, isInView } = useScrollAnimation()

  const filtered = activeFilter === 'all'
    ? portfolioItems
    : portfolioItems.filter((item) => item.category === activeFilter)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{t('portfolio.page_title')}</title>
        <meta name="description" content="Browse our portfolio of successful brand collaborations. Real results from real businesses." />
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
            {t('portfolio.hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-400 text-lg"
          >
            {t('portfolio.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`px-4 py-2 text-sm rounded-lg transition-colors ${
                  activeFilter === filter.key
                    ? 'bg-gold text-dark font-semibold'
                    : 'bg-dark border border-dark-border text-gray-400 hover:text-gold hover:border-gold/30'
                }`}
              >
                {t(`portfolio.${filter.value}`)}
              </button>
            ))}
          </div>

          <motion.div
            ref={ref}
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((item) => (
                <motion.div
                  key={item.id}
                  variants={fadeInUp}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedItem(item)}
                >
                  <div className="relative aspect-[9/16] bg-dark border border-dark-border rounded-xl overflow-hidden">
                    <img
                      src={item.thumbnail}
                      alt={item.brand}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        e.target.style.display = 'none'
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-14 h-14 flex items-center justify-center rounded-full bg-gold/90 text-dark">
                        <Play size={24} className="ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <h3 className="text-white font-semibold text-sm">{item.brand}</h3>
                      <div className="flex items-center gap-1 mt-1 text-gold text-xs">
                        <Eye size={12} />
                        <span>{item.views} {t('portfolio.views')}</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* Press Kit CTA */}
          <div className="mt-20 text-center card-dark p-8 md:p-12 max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-bold gold-gradient-text mb-3">
              {t('portfolio.press_kit_title')}
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              {t('portfolio.press_kit_subtitle')}
            </p>
            <Button href="/press-kit.pdf" variant="outline" size="md">
              <Download size={18} />
              {t('portfolio.press_kit_button')}
            </Button>
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      <Modal isOpen={!!selectedItem} onClose={() => setSelectedItem(null)}>
        {selectedItem && (
          <div>
            <div className="aspect-video bg-dark rounded-lg mb-6 flex items-center justify-center border border-dark-border">
              <div className="text-center text-gray-500">
                <Play size={40} className="mx-auto mb-2 text-gold" />
                <p className="text-xs">Reel embed placeholder</p>
              </div>
            </div>
            <h3 className="text-xl font-heading font-bold text-white mb-2">
              {selectedItem.brand}
            </h3>
            <div className="flex items-center gap-2 text-gold text-sm mb-4">
              <Eye size={14} />
              <span>{selectedItem.views} {t('portfolio.views')}</span>
            </div>
            <h4 className="text-gold font-semibold text-sm mb-2">{t('portfolio.case_study')}</h4>
            <p className="text-gray-300 text-sm leading-relaxed">
              {isMr ? selectedItem.caseStudy_mr : selectedItem.caseStudy_en}
            </p>
          </div>
        )}
      </Modal>
    </motion.div>
  )
}
