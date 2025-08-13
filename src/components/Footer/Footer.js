import styles from './Footer.module.scss'
import AnimatedIcon from '../AnimatedIcon'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.Footer}>
      {/* Оригинальный footer */}
      <div className={styles.background}>
        <div className={styles.background_image}></div>
      </div>

      {/* Новый контент под оригинальным footer */}
      <div className={styles.footer_extended}>
        <div className={styles.footer_sections}>
          {/* Company Info */}
          <div className={styles.footer_section}>
            <div className={styles.company_info}>
              <h3 className={styles.company_name}>HORNS & HOOVES</h3>
              <p className={styles.company_tagline}>Your reliable partner in car transportation</p>
              <div className={styles.company_features}>
                <div className={styles.feature}>
                  <AnimatedIcon icon="🚛" size="small" color="primary" animation="pulse" />
                  <span>Nationwide Coverage</span>
                </div>
                <div className={styles.feature}>
                  <AnimatedIcon icon="⚡" size="small" color="secondary" animation="float" />
                  <span>Fast & Secure</span>
                </div>
                <div className={styles.feature}>
                  <AnimatedIcon icon="💰" size="small" color="accent" animation="bounce" />
                  <span>Best Prices</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className={styles.footer_section}>
            <h4 className={styles.section_title}>Quick Links</h4>
            <ul className={styles.quick_links}>
              <li><a href="#calculator">Get Quote</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#about">About Us</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          {/* Services */}
          <div className={styles.footer_section}>
            <h4 className={styles.section_title}>Services</h4>
            <ul className={styles.services_list}>
              <li>Open Car Transport</li>
              <li>Enclosed Car Transport</li>
              <li>Exotic Car Transport</li>
              <li>Classic Car Transport</li>
              <li>Motorcycle Transport</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className={styles.footer_section}>
            <h4 className={styles.section_title}>Contact Info</h4>
            <div className={styles.contact_info}>
              <div className={styles.contact_item}>
                <AnimatedIcon icon="📞" size="small" color="primary" animation="pulse" />
                <span>123-456-7890</span>
              </div>
              <div className={styles.contact_item}>
                <AnimatedIcon icon="✉️" size="small" color="secondary" animation="float" />
                <span>info@hornsandhooves.com</span>
              </div>
              <div className={styles.contact_item}>
                <AnimatedIcon icon="📍" size="small" color="accent" animation="bounce" />
                <span>Nationwide Service</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className={styles.bottom_bar}>
          <div className={styles.copyright}>
            <p>© {currentYear} HORNS & HOOVES logistics. All rights reserved.</p>
          </div>
          <div className={styles.social_links}>
            <a href="#" className={styles.social_link} aria-label="Facebook">
              <AnimatedIcon icon="📘" size="small" color="primary" animation="float" />
            </a>
            <a href="#" className={styles.social_link} aria-label="Twitter">
              <AnimatedIcon icon="🐦" size="small" color="secondary" animation="bounce" />
            </a>
            <a href="#" className={styles.social_link} aria-label="Instagram">
              <AnimatedIcon icon="📷" size="small" color="accent" animation="pulse" />
            </a>
            <a href="#" className={styles.social_link} aria-label="LinkedIn">
              <AnimatedIcon icon="💼" size="small" color="success" animation="rotate" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
