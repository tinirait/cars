import { useState, useEffect, useRef } from 'react'
import styles from './RouteMap.module.scss'
import AnimatedIcon from '../AnimatedIcon'
import cn from 'classnames'

const RouteMap = ({ 
  fromCity = '', 
  toCity = '', 
  className = '' 
}) => {
  const [isVisible, setIsVisible] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const mapRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 }
    )

    if (mapRef.current) {
      observer.observe(mapRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (isVisible && fromCity && toCity) {
      setIsAnimating(true)
      setTimeout(() => setIsAnimating(false), 2000)
    }
  }, [isVisible, fromCity, toCity])

  const cities = [
    { name: 'New York', x: 20, y: 30, icon: '🏙️' },
    { name: 'Los Angeles', x: 15, y: 70, icon: '🌴' },
    { name: 'Chicago', x: 35, y: 35, icon: '🏗️' },
    { name: 'Houston', x: 30, y: 75, icon: '🛢️' },
    { name: 'Phoenix', x: 20, y: 65, icon: '🌵' },
    { name: 'Philadelphia', x: 25, y: 32, icon: '🔔' },
    { name: 'San Antonio', x: 25, y: 78, icon: '🌮' },
    { name: 'San Diego', x: 12, y: 72, icon: '🌊' },
    { name: 'Dallas', x: 28, y: 70, icon: '🤠' },
    { name: 'San Jose', x: 10, y: 68, icon: '💻' }
  ]

  const getCityPosition = (cityName) => {
    return cities.find(city => 
      city.name.toLowerCase().includes(cityName.toLowerCase())
    )
  }

  const fromCityData = getCityPosition(fromCity)
  const toCityData = getCityPosition(toCity)

  return (
    <div 
      ref={mapRef}
      className={cn(styles.RouteMap, className, {
        [styles.visible]: isVisible,
        [styles.animating]: isAnimating
      })}
    >
      <div className={styles.map_container}>
        <div className={styles.map_background}>
          {/* Decorative grid lines */}
          <div className={styles.grid_lines}>
            {Array.from({ length: 10 }, (_, i) => (
              <div key={i} className={styles.grid_line} />
            ))}
          </div>
          
          {/* Cities */}
          {cities.map((city, index) => (
            <div
              key={city.name}
              className={cn(styles.city, {
                [styles.active]: (fromCityData && city.name === fromCityData.name) ||
                                (toCityData && city.name === toCityData.name)
              })}
              style={{
                left: `${city.x}%`,
                top: `${city.y}%`,
                animationDelay: `${index * 0.1}s`
              }}
            >
              <AnimatedIcon
                icon={city.icon}
                size="small"
                color={city.name === fromCityData?.name ? 'primary' : 
                       city.name === toCityData?.name ? 'secondary' : 'accent'}
                animation={city.name === fromCityData?.name ? 'pulse' : 
                          city.name === toCityData?.name ? 'bounce' : 'float'}
              />
              <span className={styles.city_name}>{city.name}</span>
            </div>
          ))}

          {/* Route line */}
          {fromCityData && toCityData && (
            <div className={styles.route_line}>
              <svg
                className={styles.route_svg}
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
              >
                <path
                  d={`M ${fromCityData.x} ${fromCityData.y} Q 50 50 ${toCityData.x} ${toCityData.y}`}
                  stroke="url(#routeGradient)"
                  strokeWidth="2"
                  fill="none"
                  className={styles.route_path}
                />
                <defs>
                  <linearGradient id="routeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--accent)" />
                    <stop offset="50%" stopColor="var(--accent-4)" />
                    <stop offset="100%" stopColor="var(--accent-2)" />
                  </linearGradient>
                </defs>
              </svg>
              
              {/* Moving dot along the route */}
              <div className={styles.route_dot} />
            </div>
          )}
        </div>

        {/* Route info */}
        {fromCityData && toCityData && (
          <div className={styles.route_info}>
            <div className={styles.route_cities}>
              <div className={styles.route_city}>
                <AnimatedIcon icon="📍" size="small" color="primary" animation="pulse" />
                <span>{fromCityData.name}</span>
              </div>
              <div className={styles.route_arrow}>→</div>
              <div className={styles.route_city}>
                <AnimatedIcon icon="🎯" size="small" color="secondary" animation="bounce" />
                <span>{toCityData.name}</span>
              </div>
            </div>
            <div className={styles.route_stats}>
              <div className={styles.route_stat}>
                <span className={styles.stat_label}>Distance:</span>
                <span className={styles.stat_value}>~1,200 miles</span>
              </div>
              <div className={styles.route_stat}>
                <span className={styles.stat_label}>Duration:</span>
                <span className={styles.stat_value}>2-3 days</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default RouteMap
