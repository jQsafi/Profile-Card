"use client"
import { Moon, Sun } from "lucide-react"

import { useTheme } from "@/components/theme-provider"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="fixed top-4 right-4 z-50 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white dark:text-slate-900 dark:bg-slate-900/10 hover:bg-white/20 dark:hover:bg-slate-900/20 transition-colors"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <Moon size={20} /> : <Sun size={20} />}
    </button>
  )
}
