import { useMemo } from 'react'
import { useReveal } from '../../hooks/useReveal'
import styles from './WhyUs.module.scss'

function WhyUs() {
    const features = useMemo(() => ([
        {
            title: 'Transparent pricing',
            description: 'Instant quotes without hidden fees and fair market rates.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 12h8M8 9h8M8 15h5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: 'Insured deliveries',
            description: 'Every shipment covered. Peace of mind from pickup to drop-off.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 3l8 3v6c0 4.42-2.84 8.84-8 10-5.16-1.16-8-5.58-8-10V6l8-3z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8.5 12.5l2.5 2.5 4.5-4.5" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            )
        },
        {
            title: 'On‑time SLA',
            description: '98% orders arrive on time thanks to our trusted carrier network.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" />
                </svg>
            )
        },
        {
            title: 'Human support',
            description: 'Real people 7 days a week to help at any step of the route.',
            icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
                    <path d="M12 12a4 4 0 100-8 4 4 0 000 8z" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M4 20c1.6-3 4.6-5 8-5s6.4 2 8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
            )
        }
    ]), [])

    const { ref, isVisible } = useReveal()

    return (
        <section ref={ref} className={styles.WhyUs} aria-label="Why choose us">
            <div className={styles.inner + ' ' + (isVisible ? styles.revealed : styles.hidden)}>
                <h2 className={styles.heading}>Why choose us</h2>
                <p className={styles.subheading}>Premium logistics experience that converts quotes into loyal customers</p>

                <ul className={styles.cards}>
                    {features.map((f, idx) => (
                        <li key={idx} className={styles.card}>
                            <div className={styles.icon}>{f.icon}</div>
                            <h3 className={styles.title}>{f.title}</h3>
                            <p className={styles.description}>{f.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    )
}

export default WhyUs


