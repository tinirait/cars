import { useState, useEffect } from 'react'
import Calculator from '../Calculator'
import styles from './Promo.module.scss'
import promoPoster from '../../images/promo_background.jpg'
import cn from 'classnames'

function Promo() {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleVideoLoad = () => {
    setIsVideoLoaded(true)
  }

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
          onLoadedData={handleVideoLoad}
        >
          <source src="/promo_background.mp4" type="video/mp4" />
          <source src="https://cdn.coverr.co/videos/coverr-truck-driving-on-the-highway-6023/1080p.mp4" type="video/mp4" />
        </video>

        {/* Fallback background for when video is not loaded */}
        {!isVideoLoaded && (
          <div
            className={styles.background_fallback}
            style={{ backgroundImage: `url(${promoPoster})` }}
          />
        )}
      </div>

      <div className={styles.content}>
        <div className={cn(styles.company_info, { [styles.visible]: isVisible })}>
          <h1 className={styles.heading}>
            <span className={styles.heading_main}>CAR HAVEN TRANSPORT</span>
            <span className={styles.heading_sub}>logistics</span>
          </h1>

          <p className={styles.company_description}>
            Your reliable partner in car transportation across the United States
          </p>

          <div className={styles.features}>
            <div className={styles.feature}>
              <span className={styles.feature_icon}>🚛</span>
              <span>Nationwide Coverage</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.feature_icon}>⚡</span>
              <span>Fast & Secure</span>
            </div>
            <div className={styles.feature}>
              <span className={styles.feature_icon}>💰</span>
              <span>Best Prices</span>
            </div>
          </div>
        </div>

        <div className={cn(styles.calculator_wrapper, 'hover-lift')} id="calculator" aria-label="Price calculator">
          <Calculator />
        </div>
      </div>
    </div>
  )
}

export default Promo
