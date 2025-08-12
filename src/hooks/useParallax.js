import { useEffect, useRef } from 'react'

export function useParallax(multiplier = 0.2) {
    const ref = useRef(null)

    useEffect(() => {
        const node = ref.current
        if (!node) return
        let rafId = 0
        const onScroll = () => {
            cancelAnimationFrame(rafId)
            rafId = requestAnimationFrame(() => {
                const y = window.scrollY * multiplier
                node.style.setProperty('--parallaxY', String(y))
            })
        }
        onScroll()
        window.addEventListener('scroll', onScroll, { passive: true })
        return () => {
            cancelAnimationFrame(rafId)
            window.removeEventListener('scroll', onScroll)
        }
    }, [multiplier])

    return { ref }
}


