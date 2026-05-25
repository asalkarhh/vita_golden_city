import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { MONTHS_EN, MONTHS_MR } from '../../utils/constants'

export default function BookingBadge() {
  const { t, i18n } = useTranslation()
  const currentMonth = new Date().getMonth()
  const monthName = i18n.language === 'mr' ? MONTHS_MR[currentMonth] : MONTHS_EN[currentMonth]

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] bg-gradient-to-r from-gold-deep via-gold to-gold-light text-dark">
      <Link
        to="/collab"
        className="block max-w-7xl mx-auto px-4 py-2 text-center text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        {t('booking_badge', { month: monthName })}
      </Link>
    </div>
  )
}
