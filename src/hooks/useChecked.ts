import { useCallback, useEffect, useState } from 'react'

type CheckedMap = Record<string, boolean>

export function useChecked(storageKey: string) {
  const [checked, setChecked] = useState<CheckedMap>(() => {
    try {
      const raw = localStorage.getItem(storageKey)
      return raw ? (JSON.parse(raw) as CheckedMap) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(checked))
    } catch {
      // storage unavailable: progress simply won't persist
    }
  }, [storageKey, checked])

  const toggle = useCallback((id: string) => {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }, [])

  const reset = useCallback(() => setChecked({}), [])

  return { checked, toggle, reset }
}
