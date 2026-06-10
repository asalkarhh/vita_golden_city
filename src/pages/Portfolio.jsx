import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Eye, Download } from 'lucide-react'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation'
import { portfolioItems } from '../data/portfolio'
import Button from '../components/ui/Button'
import { track } from '@vercel/analytics'

const filters = [
  { key: 'all', value: 'filter_all' },
  { key: 'restaurants', value: 'filter_restaurants' },
  { key: 'realestate', value: 'filter_realestate' },
  { key: 'events', value: 'filter_events' },
  { key: 'education', value: 'filter_education' },
  { key: 'retail', value: 'filter_retail' },
  { key: 'jewelry', value: 'filter_jewelry' },
]

function getReelEmbedUrl(reelUrl) {
  if (!reelUrl) return null;
  try {
    const url = new URL(reelUrl);
    const pathSegments = url.pathname.split('/').filter(Boolean);
    if (pathSegments[0] === 'reel' || pathSegments[0] === 'p') {
      const reelId = pathSegments[1];
      return `https://www.instagram.com/p/${reelId}/embed/?hidecaption=true`;
    }
    return null;
  } catch (error) {
    console.error("Invalid reel URL:", error);
    return null;
  }
}

export default function Portfolio() {
  const { t, i18n } = useTranslation()
  const isMr = i18n.language === 'mr'
  const [activeFilter, setActiveFilter] = useState('all')
  
  const [activeItem, setActiveItem] = useState(null)
  const [refreshKeys, setRefreshKeys] = useState({})
  const [loadingStates, setLoadingStates] = useState({})
  const { ref, isInView } = useScrollAnimation()

  useEffect(() => {
    const checkFocus = () => {
      const activeEl = document.activeElement;
      if (activeEl?.tagName === 'IFRAME') {
        const itemId = activeEl.getAttribute('data-item-id');
        if (itemId && itemId !== activeItem) {
          if (activeItem) {
            setRefreshKeys(prev => ({ ...prev, [activeItem]: (prev[activeItem] || 0) + 1 }));
            setLoadingStates(prev => ({ ...prev, [activeItem]: true }));
          }
          setActiveItem(itemId);
          track('Played Portfolio Video', { itemId });
        }
      }
    };

    const interval = setInterval(checkFocus, 500);
    window.addEventListener('blur', checkFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('blur', checkFocus);
    };
  }, [activeItem]);

  const handleIframeLoad = (id) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

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
        <meta name="description" content="Browse successful brand collaborations by Vita Golden City. See real results from local businesses, restaurants, and real estate in Sangli and Maharashtra." />
        <meta name="keywords" content="Vita Golden City Portfolio, Brand Collaborations, Influencer Marketing Case Studies, Instagram Results" />
        <meta property="og:title" content={t('portfolio.page_title')} />
        <meta property="og:description" content="Browse successful brand collaborations by Vita Golden City. See real results from local businesses in Sangli and Maharashtra." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitagoldencity.com/portfolio" />
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
              {filtered.map((item) => {
                const iframeKey = `${item.id}-${refreshKeys[item.id] || 0}`;
                const isLoading = loadingStates[item.id] !== false;
                
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeInUp}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative aspect-[9/16] bg-dark-soft border border-dark-border rounded-xl overflow-hidden group"
                  >
                    {item.videoUrl ? (
                      <>
                        {isLoading && (
                          <div className="absolute inset-0 flex items-center justify-center bg-dark-soft z-0">
                            <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
                          </div>
                        )}
                        <iframe
                          key={iframeKey}
                          data-item-id={item.id.toString()}
                          src={getReelEmbedUrl(item.videoUrl)}
                          onLoad={() => handleIframeLoad(item.id)}
                          className={`absolute top-[-55px] left-0 w-full h-[calc(100%+110px)] transition-opacity duration-500 z-10 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                          frameBorder="0"
                          scrolling="no"
                          allowTransparency="true"
                          allowFullScreen
                          loading="lazy"
                          title={`Instagram Reel for ${item.brand}`}
                        ></iframe>
                      </>
                    ) : (
                      <>
                        <img
                          src={item.thumbnail}
                          alt={item.brand}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => {
                            e.target.style.display = 'none'
                          }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent" />
                      </>
                    )}
                    
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-dark via-dark/90 to-transparent z-20 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <h3 className="text-white font-semibold text-sm drop-shadow-md">{item.brand}</h3>
                      <div className="flex items-center gap-1 mt-1 text-gold text-xs drop-shadow-md">
                        <Eye size={12} />
                        <span>{item.views} {t('portfolio.views')}</span>
                      </div>
                      <p className="text-gray-300 text-[10px] mt-2 line-clamp-3 drop-shadow-md">
                        {isMr ? item.caseStudy_mr : item.caseStudy_en}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
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
            <Button 
              href="/press-kit.pdf" 
              variant="outline" 
              size="md"
              onClick={() => track('Downloaded Media Kit')}
            >
              <Download size={18} />
              {t('portfolio.press_kit_button')}
            </Button>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
