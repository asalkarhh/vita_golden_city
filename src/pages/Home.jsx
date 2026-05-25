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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Helmet>
        <title>Vita Golden City Official | विटा गोल्डन सिटी</title>
        <meta name="description" content="Vita's #1 Content Creator & Brand Promoter. 2L+ followers, 50M+ views. Promote your business with authentic Marathi content." />
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
