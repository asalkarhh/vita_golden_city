import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import HeroSection from '../components/home/HeroSection'
import StatsStrip from '../components/home/StatsStrip'
import ReelsGrid from '../components/home/ReelsGrid'
import BrandLogosMarquee from '../components/home/BrandLogosMarquee'
import TestimonialsCarousel from '../components/home/TestimonialsCarousel'
import WhyWorkWithMe from '../components/home/WhyWorkWithMe'
import FinalCTA from '../components/home/FinalCTA'

export default function Home() {
  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "name": "Vaibhav Tamkhade",
        "url": "https://www.vitagoldencity.com",
        "jobTitle": "Content Creator & Social Media Influencer",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Vita",
          "addressRegion": "Maharashtra",
          "addressCountry": "IN"
        },
        "sameAs": [
          "https://www.instagram.com/vita_golden_city_official/",
          "https://www.youtube.com/@vita_golden_city_official"
        ]
      },
      {
        "@type": "Organization",
        "name": "Vita Golden City Official",
        "founder": {
          "@type": "Person",
          "name": "Vaibhav Tamkhade"
        },
        "url": "https://www.vitagoldencity.com",
        "logo": "https://www.vitagoldencity.com/logo.png",
        "contactPoint": {
          "@type": "ContactPoint",
          "email": "13tamkhadevaibhavtkma@gmail.com",
          "contactType": "Brand Collaborations"
        }
      }
    ]
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Vita Golden City Official | Best Content Creator in Sangli</title>
        <meta name="description" content="Join Vaibhav Tamkhade at Vita Golden City Official. The top Marathi content creator & Instagram influencer in Vita, Sangli. Connect for brand collaborations!" />
        <meta name="keywords" content="Vita Golden City, Vaibhav Tamkhade, Content Creator in Vita, Instagram Influencer in Sangli, Marathi Content Creator, Digital Creator in Maharashtra, Local Influencer" />
        
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.vitagoldencity.com/" />
        <meta property="og:title" content="Vita Golden City Official | Best Content Creator in Sangli" />
        <meta property="og:description" content="Join Vaibhav Tamkhade at Vita Golden City Official. The top Marathi content creator & Instagram influencer in Vita, Sangli." />
        <meta property="og:image" content="https://www.vitagoldencity.com/logo.png" />
        <meta property="og:locale" content="mr_IN" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Vita Golden City Official | Content Creator" />
        <meta name="twitter:description" content="Top Marathi content creator & Instagram influencer in Vita, Sangli. Connect for collabs!" />
        <meta name="twitter:image" content="https://www.vitagoldencity.com/logo.png" />

        <script type="application/ld+json">{JSON.stringify(schemaData)}</script>
      </Helmet>
      <HeroSection />
      <StatsStrip />
      <ReelsGrid />
      <BrandLogosMarquee />
      <TestimonialsCarousel />
      <WhyWorkWithMe />
      <FinalCTA />
    </motion.div>
  )
}
