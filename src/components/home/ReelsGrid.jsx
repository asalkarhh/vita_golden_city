import { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../../hooks/useScrollAnimation'
import { featuredReels } from '../../data/featuredReels'

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

export default function ReelsGrid() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()

  const [activeReel, setActiveReel] = useState(null)
  const [refreshKeys, setRefreshKeys] = useState({})
  const [loadingStates, setLoadingStates] = useState({})

  useEffect(() => {
    const checkFocus = () => {
      const activeEl = document.activeElement;
      if (activeEl?.tagName === 'IFRAME') {
        const reelId = activeEl.getAttribute('data-reel-id');
        if (reelId && reelId !== activeReel) {
          if (activeReel) {
            // Refresh the previously active iframe so it stops playing
            setRefreshKeys(prev => ({ ...prev, [activeReel]: (prev[activeReel] || 0) + 1 }));
            setLoadingStates(prev => ({ ...prev, [activeReel]: true }));
          }
          setActiveReel(reelId);
        }
      }
    };

    const interval = setInterval(checkFocus, 500);
    window.addEventListener('blur', checkFocus);
    return () => {
      clearInterval(interval);
      window.removeEventListener('blur', checkFocus);
    };
  }, [activeReel]);

  const handleIframeLoad = (id) => {
    setLoadingStates(prev => ({ ...prev, [id]: false }));
  };

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
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6"
        >
          {featuredReels.map((reel) => {
            const iframeKey = `${reel.id}-${refreshKeys[reel.id] || 0}`;
            const isLoading = loadingStates[reel.id] !== false;
            
            return (
              <motion.div
                key={reel.id}
                variants={fadeInUp}
                className="relative aspect-[9/16] bg-dark-soft border border-dark-border rounded-xl overflow-hidden group"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-dark-soft z-0">
                    <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin"></div>
                  </div>
                )}
                <iframe
                  key={iframeKey}
                  data-reel-id={reel.id.toString()}
                  src={getReelEmbedUrl(reel.url)}
                  onLoad={() => handleIframeLoad(reel.id)}
                  className={`absolute top-[-55px] left-0 w-full h-[calc(100%+110px)] transition-opacity duration-500 z-10 ${isLoading ? 'opacity-0' : 'opacity-100'}`}
                  frameBorder="0"
                  scrolling="no"
                  allowTransparency="true"
                  allowFullScreen
                  loading="lazy"
                  title={`Instagram Reel ${reel.id}`}
                ></iframe>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  )
}
