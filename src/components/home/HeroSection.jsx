import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight, Play, Facebook, Youtube } from 'lucide-react'
import Button from '../ui/Button'
import { YOUTUBE_URL } from '../../utils/constants'

export default function HeroSection() {
  const { t } = useTranslation()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-dark">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-gold/3 rounded-full blur-[80px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gold/10 border border-gold/20 rounded-full text-gold text-sm mb-6"
            >
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse" />
              <span>@vita_golden_city_official</span>
            </motion.div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold leading-tight">
              <span className="gold-gradient-text">{t('hero.headline')}</span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-6 text-lg md:text-xl text-gray-400 max-w-lg"
            >
              {t('hero.subheadline')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="mt-8 flex flex-wrap gap-4"
            >
              <Button to="/collab" size="lg">
                {t('hero.cta_primary')}
                <ArrowRight size={20} />
              </Button>
              <Button to="/portfolio" variant="outline" size="lg">
                <Play size={18} />
                {t('hero.cta_secondary')}
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8, ease: 'easeOut' }}
            className="relative flex flex-col items-center lg:items-end w-full"
          >
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-96 md:h-96">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gold/20 to-gold-deep/10 blur-2xl" />
              <div className="absolute inset-4 rounded-full bg-gradient-to-br from-gold/30 to-transparent border-2 border-gold/20 overflow-hidden">
                <img
                  src="/logo.png"
                  alt="Vita Golden City Official"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none'
                    e.target.parentElement.classList.add('flex', 'items-center', 'justify-center', 'bg-dark-soft')
                    const span = document.createElement('span')
                    span.className = 'text-6xl font-heading font-bold gold-gradient-text'
                    span.textContent = 'VGC'
                    e.target.parentElement.appendChild(span)
                  }}
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-4 py-2 bg-dark-soft border border-gold/30 rounded-xl">
                <span className="text-gold font-bold text-lg">2L+</span>
                <span className="text-gray-400 text-sm ml-1">followers</span>
              </div>
            </div>

            {/* Social Media Counters */}
            <div className="flex w-72 items-center justify-center gap-8 sm:w-80 md:w-96 mt-10 mb-4">
              {/* Facebook */}
              <a href="https://www.facebook.com/share/1NeuBK1w6P/" target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-blue-600/10 text-blue-500 border border-blue-500/20 flex items-center justify-center mb-2 group-hover:bg-blue-600/20 transition-colors">
                  <Facebook size={24} />
                </div>
                <span className="text-white font-heading font-bold text-xl">1K+</span>
                <span className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">Followers</span>
              </a>
              
              {/* Vertical Divider */}
              <div className="w-px h-12 bg-gold/20" />

              {/* YouTube */}
              <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center group">
                <div className="w-12 h-12 rounded-full bg-red-600/10 text-red-500 border border-red-500/20 flex items-center justify-center mb-2 group-hover:bg-red-600/20 transition-colors">
                  <Youtube size={24} />
                </div>
                <span className="text-white font-heading font-bold text-xl">800+</span>
                <span className="text-gray-400 text-[10px] uppercase tracking-wider mt-1">Subscribers</span>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
