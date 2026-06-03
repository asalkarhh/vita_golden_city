import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { Instagram, Mail, MapPin } from 'lucide-react'
import { INSTAGRAM_URL, WHATSAPP_URL, EMAIL } from '../../utils/constants'

const quickLinks = [
  { path: '/', key: 'home' },
  { path: '/about', key: 'about' },
  { path: '/services', key: 'services' },
  { path: '/portfolio', key: 'portfolio' },
  { path: '/collab', key: 'collab' },
  { path: '/faq', key: 'faq' },
  { path: '/contact', key: 'contact' },
]

export default function Footer() {
  const { t } = useTranslation()
  const year = new Date().getFullYear()

  return (
    <footer className="bg-dark-soft border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div>
            <Link to="/" className="inline-block">
              <span className="text-3xl font-heading font-bold gold-gradient-text">
                VGC
              </span>
            </Link>
            <p className="mt-4 text-gray-400 text-sm leading-relaxed max-w-xs">
              {t('footer.tagline')}
            </p>
            <div className="flex gap-4 mt-6">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-dark transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-dark transition-colors"
                aria-label="WhatsApp"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={`mailto:${EMAIL}`}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 text-gold hover:bg-gold hover:text-dark transition-colors"
                aria-label="Email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-gold font-heading font-semibold text-lg mb-4">
              {t('footer.quick_links')}
            </h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-gold transition-colors text-sm"
                  >
                    {t(`nav.${link.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gold font-heading font-semibold text-lg mb-4">
              {t('footer.connect')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Mail size={16} className="text-gold mt-0.5 shrink-0" />
                <a href={`mailto:${EMAIL}`} className="hover:text-gold transition-colors">
                  {EMAIL}
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <Instagram size={16} className="text-gold mt-0.5 shrink-0" />
                <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors">
                  @vita_golden_city_official
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-gray-400">
                <MapPin size={16} className="text-gold mt-0.5 shrink-0" />
                <span>Vita, Sangli, Maharashtra, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div id="copyright-section" className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4 relative">
          <p className="text-gray-500 text-sm text-center sm:text-left">
            &copy; {year} Vita Golden City Official. {t('footer.rights')}
          </p>
          <p className="text-gray-500 text-sm">
            {t('footer.credit')}{' '}
            <a
              href="https://asalkartechworks.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold hover:text-gold-light transition-colors"
            >
              {t('footer.credit_name')}
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
