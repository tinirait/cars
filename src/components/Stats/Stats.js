import { useEffect, useRef } from 'react'
import styles from './Stats.module.scss'
import { useReveal } from '../../hooks/useReveal'

function useCountUp(target, duration = 1200) {
    const ref = useRef(null)
    useEffect(() => {
        const node = ref.current
        if (!node) return
        let start
        const from = 0
        const to = Number(target)
        const step = (t) => {
            if (!start) start = t
            const p = Math.min((t - start) / duration, 1)
            const eased = 1 - Math.pow(1 - p, 3)
            node.textContent = Math.floor(from + (to - from) * eased).toLocaleString()
            if (p < 1) requestAnimationFrame(step)
        }
        requestAnimationFrame(step)
    }, [target, duration])
    return ref
}

function Stats() {
    const { ref, isVisible } = useReveal()
    const carsRef = useCountUp(12500)
    const ratingRef = useCountUp(4.9 * 10)
    const slaRef = useCountUp(98)



    return (
        <section ref={ref} className={styles.Stats} aria-label="Quick stats">
            <div className={styles.inner + ' ' + (isVisible ? styles.revealed : styles.hidden)}>
                <div className={styles.item}>
                    <div className={styles.value}><span ref={carsRef} />+</div>
                    <div className={styles.label}>Cars transported</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.value}><span ref={ratingRef} />/10</div>
                    <div className={styles.label}>Avg. rating</div>
                </div>
                <div className={styles.item}>
                    <div className={styles.value}><span ref={slaRef} />%</div>
                    <div className={styles.label}>On‑time SLA</div>
                </div>
            </div>
        </section>
    )
}

export default Stats


