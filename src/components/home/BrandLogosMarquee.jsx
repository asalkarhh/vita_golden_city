import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { brands } from '../../data/brands'

export default function BrandLogosMarquee() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()
  const doubled = [...brands, ...brands]

  return (
    <section className="py-16 bg-dark-soft border-y border-dark-border overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-2xl md:text-3xl font-heading font-bold gold-gradient-text">
            {t('brand_logos.title')}
          </h2>
          <p className="mt-2 text-gray-400 text-sm">
            {t('brand_logos.subtitle')}
          </p>
        </motion.div>
      </div>

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-dark-soft to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-dark-soft to-transparent z-10" />
        <div className="flex animate-marquee">
          {doubled.map((brand, i) => (
            <div
              key={`${brand.id}-${i}`}
              className="shrink-0 mx-8 flex items-center justify-center w-32 h-16 bg-dark/50 border border-dark-border rounded-lg px-4"
            >
              <img
                src={brand.logo}
                alt={brand.name}
                className="max-w-full max-h-full object-contain opacity-60 hover:opacity-100 transition-opacity grayscale hover:grayscale-0"
                onError={(e) => {
                  e.target.style.display = 'none'
                  const span = document.createElement('span')
                  span.className = 'text-xs text-gray-500 text-center'
                  span.textContent = brand.name
                  e.target.parentElement.appendChild(span)
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
