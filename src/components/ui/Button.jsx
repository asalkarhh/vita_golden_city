import { Link } from 'react-router-dom'

const variants = {
  primary: 'bg-gold text-dark hover:bg-gold-light font-semibold',
  outline: 'border-2 border-gold text-gold hover:bg-gold hover:text-dark font-semibold',
  ghost: 'text-gold hover:bg-gold/10',
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  to,
  href,
  className = '',
  ...props
}) {
  const classes = `inline-flex items-center justify-center gap-2 rounded-lg transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`

  if (to) {
    return <Link to={to} className={classes} {...props}>{children}</Link>
  }

  if (href) {
    return <a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
  }

  return <button className={classes} {...props}>{children}</button>
}
