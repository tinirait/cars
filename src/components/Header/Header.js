import styles from './Header.module.scss'
import logo from '../../images/logo.png'
import phoneIcon from '../../images/phone_icon.png'
import emailIcon from '../../images/email_icon.png'
import cn from 'classnames'

function Header() {
  return (
    <header className={styles.Header}>
      <div className={styles.inner}>
        <div className={styles.logo_wrapper}>
          <img src={logo} className={styles.logo} alt="Company logo" />
        </div>

        <nav className={styles.actions}>
          <div className={styles.contacts}>
            <a className={styles.contact} href="tel:1234567890" aria-label="Call us">
              <img className={styles.contact_icon} src={phoneIcon} alt="Phone" />
              123-456-7890
            </a>

            <a className={cn(styles.contact, styles.email)} href="mailto:company_email@gmail.com" aria-label="Email us">
              <img className={styles.contact_icon} src={emailIcon} alt="Email" />
              company_email@gmail.com
            </a>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
