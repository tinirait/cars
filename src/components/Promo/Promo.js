import Calculator from '../Calculator'
import styles from './Promo.module.scss'
import promoPoster from '../../images/promo_background.jpg'

function Promo() {
  return (
    <div className={styles.Promo}>
      <div className={styles.background}>
        <video
          className={styles.background_video}
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster={promoPoster}
        >
          <source src="/promo_background.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-truck-driving-on-the-highway-6023/1080p.mp4" type="video/mp4" />
        </video>
      </div>

      <div className={styles.content}>
        <div className={styles.company_info}>
          <h1 className={styles.heading}>HORNS & HOOVES logistics</h1>

          <p className={styles.company_description}>
            — Your reliable partner in car transportation
          </p>


        </div>

        <div className={styles.calculator_wrapper} id="calculator" aria-label="Price calculator">
          <Calculator />
        </div>
      </div>
    </div>
  )
}

export default Promo
