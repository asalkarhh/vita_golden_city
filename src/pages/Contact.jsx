import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Mail, MessageCircle, Instagram, MapPin, Clock, Send } from 'lucide-react'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation'
import { contactFormSchema } from '../utils/validation'
import { WHATSAPP_URL, INSTAGRAM_URL, EMAIL, WEB3FORMS_URL } from '../utils/constants'
import FormField from '../components/form/FormField'

const contactInfo = [
  { key: 'email', icon: Mail, href: `mailto:${EMAIL}`, valueKey: 'email_value' },
  { key: 'whatsapp', icon: MessageCircle, href: WHATSAPP_URL, valueKey: 'whatsapp_value', external: true },
  { key: 'instagram', icon: Instagram, href: INSTAGRAM_URL, valueKey: 'instagram_value', external: true },
  { key: 'location', icon: MapPin, valueKey: 'location_value' },
  { key: 'hours', icon: Clock, valueKey: 'hours_value' },
]

export default function Contact() {
  const { t } = useTranslation()
  const { ref, isInView } = useScrollAnimation()
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { botcheck: '' },
  })

  const onSubmit = async (data) => {
    const accessKey = import.meta.env.VITE_WEB3FORMS_KEY
    if (!accessKey || accessKey === 'YOUR_ACCESS_KEY') {
      setSubmitted(true)
      reset()
      return
    }

    const response = await fetch(WEB3FORMS_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: `Contact Form: Message from ${data.name}`,
        from_name: data.name,
        message: data.message,
        botcheck: data.botcheck,
      }),
    })

    const result = await response.json()
    if (result.success) {
      setSubmitted(true)
      reset()
    }
  }

  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('contact.page_title'),
    "description": "Contact Vaibhav Tamkhade at Vita Golden City Official. Reach out via email, WhatsApp, or visit us in Vita, Sangli, Maharashtra.",
    "mainEntity": {
        "@type": "Organization",
        "name": "Vita Golden City Official",
        "email": EMAIL,
        "telephone": "+918605159015",
        "address": {
            "@type": "PostalAddress",
            "streetAddress": "Vita",
            "addressLocality": "Sangli",
            "addressRegion": "MH",
            "addressCountry": "IN"
        }
    }
  };

  const inputClass = 'w-full px-4 py-3 bg-dark border border-dark-border rounded-lg text-white placeholder-gray-500 focus:border-gold focus:ring-1 focus:ring-gold/50 outline-none transition-colors text-sm'

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{t('contact.page_title')}</title>
        <meta name="description" content="Contact Vaibhav Tamkhade at Vita Golden City Official. Reach out via email, WhatsApp, or visit us in Vita, Sangli, Maharashtra." />
        <meta name="keywords" content="Contact Vita Golden City, Vaibhav Tamkhade Email, Influencer WhatsApp Number Sangli" />
        <meta property="og:title" content={t('contact.page_title')} />
        <meta property="og:description" content="Contact Vaibhav Tamkhade at Vita Golden City Official. Reach out via email, WhatsApp, or visit us in Vita, Sangli, Maharashtra." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitagoldencity.com/contact" />
        <script type="application/ld+json">
          {JSON.stringify(contactSchema)}
        </script>
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
            {t('contact.hero_title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-4 text-gray-400 text-lg"
          >
            {t('contact.hero_subtitle')}
          </motion.p>
        </div>
      </section>

      <section className="py-20 bg-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              ref={ref}
              variants={staggerContainer}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
            >
              <div className="space-y-6">
                {contactInfo.map((item) => {
                  const Icon = item.icon
                  const content = (
                    <motion.div
                      key={item.key}
                      variants={fadeInUp}
                      className="flex items-start gap-4 card-dark p-5 hover:border-gold/40 transition-all duration-300"
                    >
                      <div className="w-11 h-11 flex items-center justify-center rounded-lg bg-gold/10 text-gold shrink-0">
                        <Icon size={20} />
                      </div>
                      <div>
                        <h3 className="text-gold text-sm font-semibold">
                          {t(`contact.${item.key}_label`)}
                        </h3>
                        <p className="text-gray-300 text-sm mt-0.5">
                          {t(`contact.${item.valueKey}`)}
                        </p>
                      </div>
                    </motion.div>
                  )

                  if (item.href) {
                    return (
                      <a
                        key={item.key}
                        href={item.href}
                        target={item.external ? '_blank' : undefined}
                        rel={item.external ? 'noopener noreferrer' : undefined}
                        className="block"
                      >
                        {content}
                      </a>
                    )
                  }
                  return <div key={item.key}>{content}</div>
                })}
              </div>

              {/* Google Maps */}
              <motion.div variants={fadeInUp} className="mt-6">
                <div className="card-dark overflow-hidden h-64">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d30700.0!2d74.53!3d17.27!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc1818cafb75c3f%3A0x5660a1a12f92c80d!2sVita%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1700000000000"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Vita, Maharashtra on Google Maps"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <div className="card-dark p-6 md:p-8">
                <h3 className="text-xl font-heading font-bold gold-gradient-text mb-6">
                  {t('contact.form_title')}
                </h3>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-8"
                  >
                    <div className="w-16 h-16 flex items-center justify-center rounded-full bg-gold/10 text-gold mx-auto mb-4">
                      <Mail size={28} />
                    </div>
                    <p className="text-gray-300">{t('contact.form_success')}</p>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <input type="hidden" {...register('botcheck')} />

                    <FormField label={t('contact.form_name')} error={errors.name?.message}>
                      <input
                        {...register('name')}
                        placeholder={t('contact.form_name_placeholder')}
                        className={inputClass}
                      />
                    </FormField>

                    <FormField label={t('contact.form_message')} error={errors.message?.message}>
                      <textarea
                        {...register('message')}
                        placeholder={t('contact.form_message_placeholder')}
                        rows={5}
                        className={`${inputClass} resize-none`}
                      />
                    </FormField>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gold text-dark font-semibold rounded-lg hover:bg-gold-light transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-dark/30 border-t-dark rounded-full animate-spin" />
                          {t('contact.form_sending')}
                        </>
                      ) : (
                        <>
                          <Send size={16} />
                          {t('contact.form_submit')}
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
