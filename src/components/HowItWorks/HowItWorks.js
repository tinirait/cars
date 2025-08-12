import styles from './HowItWorks.module.scss'
import { useReveal } from '../../hooks/useReveal'

function HowItWorks() {
    const steps = [
        { n: '01', title: 'Get a quote', text: 'Enter route and vehicle details to see your instant price.' },
        { n: '02', title: 'Book & confirm', text: 'Choose trailer type, date and confirm the order online.' },
        { n: '03', title: 'Pickup & transport', text: 'We assign a vetted carrier and manage the shipment end‑to‑end.' },
        { n: '04', title: 'Delivery & payment', text: 'Inspect your car on delivery, pay securely and rate your experience.' }
    ]

    const { ref, isVisible } = useReveal()

    return (
        <section ref={ref} className={styles.HowItWorks} aria-label="How it works">
            <div className={styles.inner + ' ' + (isVisible ? styles.revealed : styles.hidden)}>
                <h2 className={styles.heading}>How it works</h2>

                <ol className={styles.steps}>
                    {steps.map((s) => (
                        <li key={s.n} className={styles.step}>
                            <span className={styles.badge}>{s.n}</span>
                            <div className={styles.body}>
                                <h3 className={styles.title}>{s.title}</h3>
                                <p className={styles.text}>{s.text}</p>
                            </div>
                        </li>
                    ))}
                </ol>
            </div>
        </section>
    )
}

export default HowItWorks


