import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { CheckCircle } from 'lucide-react'
import Modal from '../ui/Modal'
import Button from '../ui/Button'

export default function SuccessModal({ isOpen, onClose }) {
  const { t } = useTranslation()

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="text-center py-4">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <CheckCircle size={64} className="text-gold mx-auto mb-6" />
        </motion.div>
        <h3 className="text-2xl font-heading font-bold gold-gradient-text mb-3">
          {t('collab.success.title')}
        </h3>
        <p className="text-gray-400 mb-8">
          {t('collab.success.message')}
        </p>
        <Button onClick={onClose} size="md">
          {t('collab.success.close')}
        </Button>
      </div>
    </Modal>
  )
}
