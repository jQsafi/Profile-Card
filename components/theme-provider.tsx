"use client"

import { createContext, useContext, useEffect, useState } from "react"

type Theme = "light" | "dark"

type ThemeProviderProps = {
  children: React.ReactNode
  defaultTheme?: Theme
  storageKey?: string
}

const ThemeProviderContext = createContext<{
  theme: Theme
  setTheme: (theme: Theme) => void
} | null>(null)

export function ThemeProvider({
  children,
  defaultTheme = "light",
  storageKey = "theme-preference",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme)

  useEffect(() => {
    try {
      const root = window.document.documentElement
      const savedTheme = localStorage.getItem(storageKey) as Theme | null
      const colorScheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
      
      const initialTheme = savedTheme ?? colorScheme
      root.classList.remove("light", "dark")
      root.classList.add(initialTheme)
      setTheme(initialTheme)
    } catch (e) {
      console.error("Error initializing theme:", e)
    }
  }, [])

  useEffect(() => {
    try {
      const root = window.document.documentElement
      root.classList.remove("light", "dark")
      root.classList.add(theme)
      localStorage.setItem(storageKey, theme)
    } catch (e) {
      console.error("Error setting theme:", e)
    }
  }, [theme, storageKey])

  return (
    <ThemeProviderContext.Provider value={{ theme, setTheme }} {...props}>
      {children}
    </ThemeProviderContext.Provider>
  )
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext)
  if (!context) throw new Error("useTheme must be used within a ThemeProvider")
  return context
}
