export function useReducedMotion() {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export function getMotionProps(reduced, motionProps, staticProps = {}) {
  if (reduced) return staticProps
  return motionProps
}
