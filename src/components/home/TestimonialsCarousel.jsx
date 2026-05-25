import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { useCallback } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { useScrollAnimation } from '../../hooks/useScrollAnimation'
import { testimonials } from '../../data/testimonials'

export default function TestimonialsCarousel() {
  const { t, i18n } = useTranslation()
  const { ref, isInView } = useScrollAnimation()
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: 'center' },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

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
            {t('testimonials.title')}
          </h2>
          <p className="mt-3 text-gray-400 max-w-2xl mx-auto">
            {t('testimonials.subtitle')}
          </p>
        </motion.div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {testimonials.map((item) => (
                <div
                  key={item.id}
                  className="flex-[0_0_100%] min-w-0 sm:flex-[0_0_80%] md:flex-[0_0_50%] px-3"
                >
                  <div className="card-dark p-6 md:p-8 h-full flex flex-col">
                    <Quote size={32} className="text-gold/30 mb-4" />
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed flex-1">
                      "{i18n.language === 'mr' ? item.quote_mr : item.quote_en}"
                    </p>
                    <div className="mt-6 flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/20 overflow-hidden flex items-center justify-center">
                        <img
                          src={item.photo}
                          alt={item.name}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            e.target.style.display = 'none'
                            const span = document.createElement('span')
                            span.className = 'text-gold font-bold text-lg'
                            span.textContent = item.name.charAt(0) === '[' ? '?' : item.name.charAt(0)
                            e.target.parentElement.appendChild(span)
                          }}
                        />
                      </div>
                      <div>
                        <p className="text-white font-medium text-sm">{item.name}</p>
                        <p className="text-gold/70 text-xs">{item.business}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-3 mt-8">
            <button
              onClick={scrollPrev}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={scrollNext}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-colors"
              aria-label="Next"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
