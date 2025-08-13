import { useState } from 'react'
import styles from './AnimatedIcon.module.scss'

const AnimatedIcon = ({ 
  icon, 
  size = 'medium', 
  color = 'primary', 
  animation = 'pulse',
  className = '',
  onClick = null 
}) => {
  const [isHovered, setIsHovered] = useState(false)

  const handleClick = () => {
    if (onClick) {
      onClick()
    }
  }

  return (
    <div 
      className={`
        ${styles.icon} 
        ${styles[size]} 
        ${styles[color]} 
        ${styles[animation]}
        ${isHovered ? styles.hovered : ''}
        ${className}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role={onClick ? 'button' : 'img'}
      tabIndex={onClick ? 0 : undefined}
    >
      <span className={styles.icon_content}>{icon}</span>
      <div className={styles.glow}></div>
    </div>
  )
}

export default AnimatedIcon
