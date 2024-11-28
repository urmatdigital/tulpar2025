'use client'

import { useTheme } from '@/hooks/useTheme'
import { useEffect } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    // Apply initial theme
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    root.classList.add(theme)
  }, [])

  return <>{children}</>
}
