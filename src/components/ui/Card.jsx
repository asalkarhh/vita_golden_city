import { motion } from 'framer-motion'
import { fadeInUp } from '../../hooks/useScrollAnimation'

export default function Card({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      variants={fadeInUp}
      className={`card-dark p-6 ${hover ? 'hover:border-gold/40 hover:gold-glow transition-all duration-300' : ''} ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
