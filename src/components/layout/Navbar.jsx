import { useState, useEffect } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Menu, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import LanguageToggle from '../ui/LanguageToggle'

const navLinks = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/services', key: 'services' },
  { path: '/portfolio', key: 'portfolio' },
  { path: '/collab', key: 'collab' },
  { path: '/faq', key: 'faq' },
  { path: '/contact', key: 'contact' },
]

export default function Navbar() {
  const { t } = useTranslation()
  const location = useLocation()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  const closeMenu = () => setIsMobileOpen(false)

  useEffect(() => {
    // Fix: Prevent horizontal scrolling (side-by-side) on mobile across all pages
    document.documentElement.classList.add('overflow-x-hidden')
    document.body.classList.add('overflow-x-hidden', 'w-full')

    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const isHome = location.pathname === '/'
  const navBg = isScrolled || !isHome || isMobileOpen
    ? 'bg-dark/95 backdrop-blur-md border-b border-dark-border'
    : 'bg-transparent'

  // Helper functions for NavLink highlighting
  const getDesktopLinkClasses = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium rounded-lg transition-colors ${
      isActive
        ? 'text-gold bg-gold/10'
        : 'text-gray-300 hover:text-gold hover:bg-gold/5'
    }`

  const getMobileLinkClasses = ({ isActive }) =>
    `block px-4 py-3 text-base font-medium rounded-lg transition-colors ${
      isActive
        ? 'text-gold bg-gold/10'
        : 'text-gray-300 hover:text-gold hover:bg-gold/5'
    }`

  return (
    <nav className={`fixed top-0 left-0 right-0 z-[90] transition-all duration-300 ${navBg}`}
      style={{ top: '40px' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <span className="text-2xl md:text-3xl font-heading font-bold gold-gradient-text">
              VGC
            </span>
            <span className="hidden sm:block text-sm text-gold/70 font-body">
              Vita Golden City
            </span>
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                end={link.path === '/'}
                className={getDesktopLinkClasses}
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
            <LanguageToggle />
            <Link
              to="/collab"
              className="ml-3 px-5 py-2 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-colors text-sm"
            >
              {t('hero.cta_primary')}
            </Link>
          </div>

          {/* Mobile Right side (Language Toggle) */}
          <div className="flex items-center gap-3 lg:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileOpen(!isMobileOpen)}
              className="p-2 text-gold"
              aria-label="Toggle menu"
            >
              {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 lg:hidden bg-dark/95 backdrop-blur-md border-b border-dark-border shadow-2xl"
          >
            <div className="px-4 py-6 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  end={link.path === '/'}
                  onClick={closeMenu}
                  className={getMobileLinkClasses}
                >
                  {t(`nav.${link.key}`)}
                </NavLink>
              ))}
              <Link
                to="/collab"
                onClick={closeMenu}
                className="block mt-4 px-4 py-3 bg-gold text-dark font-semibold rounded-lg text-center"
              >
                {t('hero.cta_primary')}
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
