import { useEffect, useRef, useState } from 'react'

export function useReveal(options) {
    const ref = useRef(null)
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const node = ref.current
        if (!node || isVisible) return

        const observer = new IntersectionObserver(
            (entries) => {
                const entry = entries[0]
                if (entry.isIntersecting) {
                    setIsVisible(true)
                    observer.disconnect()
                }
            },
            { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.15, ...(options || {}) }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [isVisible, options])

    return { ref, isVisible }
}


