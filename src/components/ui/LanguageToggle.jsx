import { useTranslation } from 'react-i18next'
import { Globe } from 'lucide-react'

export default function LanguageToggle() {
  const { i18n } = useTranslation()

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'mr' ? 'en' : 'mr')
  }

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gold border border-gold/30 rounded-lg hover:bg-gold/10 transition-colors"
      aria-label="Toggle language"
    >
      <Globe size={14} />
      <span>{i18n.language === 'mr' ? 'EN' : 'मराठी'}</span>
    </button>
  )
}
