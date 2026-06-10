import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Heart, Users, Award, Shield } from 'lucide-react'
import { useScrollAnimation, fadeInUp, staggerContainer } from '../hooks/useScrollAnimation'

const timeline = [
  { year: '2020', title_en: 'The Beginning', title_mr: 'सुरुवात', desc_en: 'Started sharing stories about Vita on Instagram', desc_mr: 'इंस्टाग्रामवर विटाबद्दल कहाण्या शेअर करायला सुरुवात केली' },
  { year: '2021', title_en: '10K Followers', title_mr: '१०K फॉलोअर्स', desc_en: 'Crossed 10,000 followers, started first brand collaborations', desc_mr: '१०,००० फॉलोअर्स पार केले, पहिले ब्रँड कोलॅबोरेशन्स सुरू केले' },
  { year: '2022', title_en: '50K Milestone', title_mr: '५०K टप्पा', desc_en: 'Reached 50K followers, featured in local media', desc_mr: '५०K फॉलोअर्सपर्यंत पोहोचलो, स्थानिक मीडियामध्ये वैशिष्ट्य' },
  { year: '2023', title_en: '1 Lakh Family', title_mr: '१ लाख कुटुंब', desc_en: 'Crossed 1 lakh followers, 200+ brand promotions completed', desc_mr: '१ लाख फॉलोअर्स पार केले, २००+ ब्रँड प्रमोशन्स पूर्ण' },
  { year: '2024', title_en: 'Full-Time Creator', title_mr: 'पूर्णवेळ क्रिएटर', desc_en: 'Became a full-time content creator', desc_mr: 'पूर्णवेळ कंटेंट क्रिएटर बनलो' },
  { year: '2025', title_en: 'Premium Packages', title_mr: 'प्रीमियम पॅकेजेस', desc_en: 'Launched premium packages, expanded local reach', desc_mr: 'प्रीमियम पॅकेजेस लॉन्च केले, स्थानिक पोहोच वाढवली' },
  { year: '2026', title_en: '2 Lakh+ Strong', title_mr: '२ लाख+ मजबूत', desc_en: 'Crossed 2 lakh followers, 500+ brands promoted, trusted name in local marketing', desc_mr: '२ लाख+ फॉलोअर्स पार केले, ५००+ ब्रँड्स प्रमोट, स्थानिक मार्केटिंगमधील विश्वसनीय नाव' },
]

const values = [
  { key: 'value_1', icon: Heart },
  { key: 'value_2', icon: Users },
  { key: 'value_3', icon: Award },
  { key: 'value_4', icon: Shield },
]

export default function About() {
  const { t, i18n } = useTranslation()
  const isMr = i18n.language === 'mr'
  const { ref: storyRef, isInView: storyInView } = useScrollAnimation()
  const { ref: timelineRef, isInView: timelineInView } = useScrollAnimation()
  const { ref: valuesRef, isInView: valuesInView } = useScrollAnimation()

  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": t('about.page_title'),
    "description": "Learn about Vaibhav Tamkhade and the journey of Vita Golden City Official. The most trusted Marathi content creator and social media influencer in Sangli District.",
    "mainEntity": {
      "@type": "Person",
      "name": "Vaibhav Tamkhade",
      "jobTitle": "Content Creator",
      "description": "Founder of Vita Golden City Official, a leading social media influencer from Vita, Sangli.",
      "url": "https://www.vitagoldencity.com/about",
      "sameAs": [
        "https://www.instagram.com/vita_golden_city_official/",
        "https://www.youtube.com/@vita_golden_city_official"
      ]
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>{t('about.page_title')}</title>
        <meta name="description" content="Learn about Vaibhav Tamkhade and the journey of Vita Golden City Official. The most trusted Marathi content creator and social media influencer in Sangli District." />
        <meta name="keywords" content="Vaibhav Tamkhade, Vita Golden City Owner, Influencer from Vita, Local Influencer Sangli, Marathi Content Creator" />
        <meta property="og:title" content={t('about.page_title')} />
        <meta property="og:description" content="Learn about Vaibhav Tamkhade and the journey of Vita Golden City Official. The most trusted Marathi content creator in Sangli District." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitagoldencity.com/about" />
        <script type="application/ld+json">
          {JSON.stringify(aboutSchema)}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="pt-36 pb-20 bg-dark relative">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold gold-gradient-text"
          >
            {t('about.hero_tagline')}
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-20 bg-dark-soft">
        <motion.div
          ref={storyRef}
          initial={{ opacity: 0, y: 40 }}
          animate={storyInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl md:text-4xl font-heading font-bold gold-gradient-text mb-8">
            {t('about.story_title')}
          </h2>
          <div className="space-y-6 text-gray-300 text-base md:text-lg leading-relaxed">
            <p>{t('about.story_p1')}</p>
            <p>{t('about.story_p2')}</p>
            <p>{t('about.story_p3')}</p>
          </div>
        </motion.div>
      </section>

      {/* Journey Timeline */}
      <section className="py-20 bg-dark">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            ref={timelineRef}
            initial={{ opacity: 0, y: 30 }}
            animate={timelineInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-heading font-bold gold-gradient-text text-center mb-14"
          >
            {t('about.journey_title')}
          </motion.h2>

          <div className="relative">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gold/20 md:-translate-x-px" />
            <div className="space-y-12">
            {timeline.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.year}
                  initial={{ opacity: 0, y: 30 }}
                  animate={timelineInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative flex items-start ${
                    isEven ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 w-3 h-3 bg-gold rounded-full -translate-x-1.5 mt-2 ring-4 ring-dark" />
                  <div className={`pl-12 md:w-1/2 ${
                    isEven ? 'md:pl-12 md:pr-0 md:text-left' : 'md:pr-12 md:pl-0 md:text-right'
                  }`}>
                    <span className="text-gold font-heading font-bold text-xl">{item.year}</span>
                    <h3 className="text-white font-semibold text-lg mt-1">
                      {isMr ? item.title_mr : item.title_en}
                    </h3>
                    <p className="text-gray-400 text-sm mt-2">
                      {isMr ? item.desc_mr : item.desc_en}
                    </p>
                  </div>
                </motion.div>
              );
            })}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-dark-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            ref={valuesRef}
            initial={{ opacity: 0, y: 30 }}
            animate={valuesInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-4xl font-heading font-bold gold-gradient-text text-center mb-14"
          >
            {t('about.values_title')}
          </motion.h2>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={valuesInView ? 'visible' : 'hidden'}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((val) => {
              const Icon = val.icon
              return (
                <motion.div
                  key={val.key}
                  variants={fadeInUp}
                  className="card-dark p-6 text-center hover:border-gold/40 transition-all duration-300"
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gold/10 text-gold mb-4">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-white mb-2">
                    {t(`about.${val.key}_title`)}
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {t(`about.${val.key}_desc`)}
                  </p>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Awards & Recognition */}
      <section className="py-20 bg-dark">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold gold-gradient-text mb-8">
            {t('about.awards_title')}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-dark p-6 flex items-center justify-center h-32">
                <span className="text-gray-500 text-sm">Media Feature {i}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
