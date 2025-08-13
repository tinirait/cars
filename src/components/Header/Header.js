import { useState, useEffect } from 'react'
import styles from './Header.module.scss'
import logo from '../../images/logo.png'
import AnimatedIcon from '../AnimatedIcon'
import cn from 'classnames'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className={cn(styles.Header, { [styles.scrolled]: isScrolled })}>
      <div className={styles.inner}>
        <div className={cn(styles.logo_wrapper, 'hover-lift')}>
          <img src={logo} className={styles.logo} alt="HORNS & HOOVES logistics" />
        </div>

        <nav className={styles.actions}>
          <div className={styles.contacts}>
            <a 
              className={cn(styles.contact, 'hover-glow')} 
              href="tel:1234567890" 
              aria-label="Call us"
            >
              <AnimatedIcon 
                icon="📞" 
                size="small" 
                color="primary" 
                animation="pulse"
                className={styles.contact_icon}
              />
              <span className={styles.contact_text}>123-456-7890</span>
            </a>

            <a 
              className={cn(styles.contact, styles.email, 'hover-glow')} 
              href="mailto:info@hornsandhooves.com" 
              aria-label="Email us"
            >
              <AnimatedIcon 
                icon="✉️" 
                size="small" 
                color="secondary" 
                animation="float"
                className={styles.contact_icon}
              />
              <span className={styles.contact_text}>info@hornsandhooves.com</span>
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
