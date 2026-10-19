import { useEffect, useRef } from 'react'

const clamp = (value, min = 0, max = 1) => Math.max(min, Math.min(max, value))
export default function useDepthScroll(ref, onFrame, disabled = false) {
  const callback = useRef(onFrame)
  useEffect(() => { callback.current = onFrame }, [onFrame])
  useEffect(() => {
    const node = ref.current
    if (!node || disabled) return
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    let frame = 0
    let visible = true
    const update = () => {
      frame = 0
      const rect = node.getBoundingClientRect()
      const viewport = window.innerHeight
      callback.current({
        rect,
        viewport,
        reduced: reduced.matches,
        compact: window.innerWidth < 760,
        progress: clamp((viewport * .85 - rect.top) / (rect.height + viewport * .45)),
        offset: clamp((viewport * .5 - rect.top - rect.height * .5) / (viewport * .5 + rect.height * .5), -1, 1),
      })
    }
    const request = () => { if (visible && !frame) frame = requestAnimationFrame(update) }
    const preferenceChanged = () => { cancelAnimationFrame(frame); update() }
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) request()
    }, { rootMargin: '150px' })
    observer.observe(node)
    update()
    window.addEventListener('scroll', request, { passive: true })
    window.addEventListener('resize', request)
    reduced.addEventListener('change', preferenceChanged)
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', request)
      window.removeEventListener('resize', request)
      reduced.removeEventListener('change', preferenceChanged)
    }
  }, [ref, disabled])
}
