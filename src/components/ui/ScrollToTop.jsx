import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)
  const [bottomPos, setBottomPos] = useState(24) // 24px is equivalent to bottom-6 in Tailwind

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 400)

      // Keep fixed at bottom on mobile screens (less than 768px - Tailwind 'md' breakpoint)
      if (window.innerWidth < 768) {
        setBottomPos(24)
        return
      }

      const copyrightSection = document.getElementById('copyright-section')
      if (copyrightSection) {
        const rect = copyrightSection.getBoundingClientRect()
        const viewportHeight = window.innerHeight
        
        if (rect.top < viewportHeight) {
          setBottomPos(viewportHeight - rect.top + 24)
        } else {
          setBottomPos(24)
        }
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleScroll, { passive: true })
    handleScroll() // Call on mount to set initial position

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', handleScroll)
    }
  }, [])

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          style={{ bottom: `${bottomPos}px` }}
          className="fixed left-6 z-50 w-12 h-12 flex items-center justify-center rounded-full bg-dark-soft border border-gold/30 text-gold hover:bg-gold hover:text-dark transition-colors shadow-lg"
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
