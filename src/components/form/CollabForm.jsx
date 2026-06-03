import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslation } from 'react-i18next'
import { Send } from 'lucide-react'
import { collabFormSchema } from '../../utils/validation'
import { WEB3FORMS_URL, WHATSAPP_NUMBER } from '../../utils/constants'
import FormField from './FormField'
import SuccessModal from './SuccessModal'

const inputClass = 'w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-colors text-sm'
const selectClass = 'w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-colors text-sm appearance-none'

export default function CollabForm() {
  const { t } = useTranslation()
  const [showSuccess, setShowSuccess] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(collabFormSchema),
    defaultValues: {
      whatsappSame: true,
      botcheck: '',
    },
  })

  const onSubmit = async (data) => {
    // Generate WhatsApp Message
    const waText = `*New Collab Request*
*Business Name:* ${data.businessName}
*Phone:* ${data.phone}
*WhatsApp Same:* ${data.whatsappSame ? 'Yes' : 'No'}
*Email:* ${data.email || 'Not provided'}
*City:* ${data.city || 'Not provided'}
*Business Type:* ${data.businessType || 'Not provided'}
*Service:* ${data.service || 'Not provided'}
*Budget:* ${data.budget || 'Not provided'}
*Brief:* ${data.brief || 'Not provided'}`;

    // Open WhatsApp immediately to avoid browser popup blockers
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(waText)}`;
    window.open(waUrl, '_blank');

    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY') {
      setShowSuccess(true)
      setShowConfetti(true)
      reset()
      setTimeout(() => setShowConfetti(false), 5000)
      return
    }

    const formData = {
      access_key: accessKey,
      subject: `New Collab Request from ${data.businessName}`,
      from_name: data.businessName,
      business_name: data.businessName,
      phone: data.phone,
      whatsapp_same: data.whatsappSame ? 'Yes' : 'No',
      email: data.email || 'Not provided',
      city: data.city,
      business_type: data.businessType,
      service: data.service,
      budget: data.budget,
      brief: data.brief,
      botcheck: data.botcheck,
    }

    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(formData),
    })

    const result = await response.json()
    if (result.success) {
      setShowSuccess(true)
      setShowConfetti(true)
      reset()
      setTimeout(() => setShowConfetti(false), 5000)
    }
  }

  const businessTypes = ['restaurant', 'retail', 'jewelry', 'realestate', 'education', 'event', 'healthcare', 'beauty', 'other']
  const serviceOptions = ['story', 'reel', 'combo', 'event', 'ambassador', 'not_sure']
  const budgetOptions = ['under_2k', '2k_5k', '5k_15k', '15k_50k', 'above_50k']

  return (
    <>
      {showConfetti && (
        <div className="fixed inset-0 z-[80] pointer-events-none">
          <ConfettiEffect />
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <input type="hidden" {...register('botcheck')} />

        <FormField label={t('collab.form.business_label')} error={errors.businessName?.message}>
          <input
            {...register('businessName')}
            placeholder={t('collab.form.business_placeholder')}
            className={inputClass}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label={t('collab.form.phone_label')} error={errors.phone?.message}>
            <input
              {...register('phone')}
              type="tel"
              placeholder={t('collab.form.phone_placeholder')}
              className={inputClass}
              maxLength={10}
            />
          </FormField>

          <FormField label={t('collab.form.email_label')} error={errors.email?.message}>
            <input
              {...register('email')}
              type="email"
              placeholder={t('collab.form.email_placeholder')}
              className={inputClass}
            />
          </FormField>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            {...register('whatsappSame')}
            id="whatsappSame"
            className="w-4 h-4 rounded border-dark-border bg-dark text-gold focus:ring-gold/50 accent-gold"
          />
          <label htmlFor="whatsappSame" className="text-sm text-gray-300">
            {t('collab.form.whatsapp_same')}
          </label>
        </div>

        <FormField label={t('collab.form.city_label')} error={errors.city?.message}>
          <input
            {...register('city')}
            placeholder={t('collab.form.city_placeholder')}
            className={inputClass}
          />
        </FormField>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <FormField label={t('collab.form.business_type_label')} error={errors.businessType?.message}>
            <select {...register('businessType')} className={selectClass} defaultValue="">
              <option value="" disabled>{t('collab.form.business_type_placeholder')}</option>
              {businessTypes.map((type) => (
                <option key={type} value={type}>{t(`collab.business_types.${type}`)}</option>
              ))}
            </select>
          </FormField>

          <FormField label={t('collab.form.service_label')} error={errors.service?.message}>
            <select {...register('service')} className={selectClass} defaultValue="">
              <option value="" disabled>{t('collab.form.service_placeholder')}</option>
              {serviceOptions.map((svc) => (
                <option key={svc} value={svc}>{t(`collab.service_options.${svc}`)}</option>
              ))}
            </select>
          </FormField>
        </div>

        <FormField label={t('collab.form.budget_label')} error={errors.budget?.message}>
          <select {...register('budget')} className={selectClass} defaultValue="">
            <option value="" disabled>{t('collab.form.budget_placeholder')}</option>
            {budgetOptions.map((opt) => (
              <option key={opt} value={opt}>{t(`collab.budget_options.${opt}`)}</option>
            ))}
          </select>
        </FormField>

        <FormField label={t('collab.form.brief_label')} error={errors.brief?.message}>
          <textarea
            {...register('brief')}
            placeholder={t('collab.form.brief_placeholder')}
            rows={4}
            className={`${inputClass} resize-none`}
            maxLength={500}
          />
        </FormField>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-base"
        >
          {isSubmitting ? (
            <>
              <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
              {t('collab.form.submitting')}
            </>
          ) : (
            <>
              <Send size={18} />
              {t('collab.form.submit')}
            </>
          )}
        </button>
      </form>

      <SuccessModal isOpen={showSuccess} onClose={() => setShowSuccess(false)} />
    </>
  )
}

function ConfettiEffect() {
  const particles = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: Math.random() * 2,
    duration: 2 + Math.random() * 3,
    size: 6 + Math.random() * 8,
    color: ['#D4AF37', '#B8860B', '#F7E7CE', '#E8C547', '#FFD700'][Math.floor(Math.random() * 5)],
  }))

  return (
    <>
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute animate-bounce"
          style={{
            left: p.left,
            top: '-10px',
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            borderRadius: Math.random() > 0.5 ? '50%' : '2px',
            animation: `confettiFall ${p.duration}s ease-in ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(720deg); opacity: 0; }
        }
      `}</style>
    </>
  )
}
