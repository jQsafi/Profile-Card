"use client"

import { useTheme } from "@/components/theme-provider"

export default function AnimatedBubbles() {
  const { theme } = useTheme()
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden">
      <div 
        className={`absolute top-0 right-0 w-[500px] h-[500px] rounded-full blur-[128px] animate-blob animation-delay-2000
          ${theme === 'dark' ? 'bg-blue-500/20' : 'bg-blue-500/30'}`}
      />
      <div 
        className={`absolute bottom-0 left-0 w-[300px] h-[300px] rounded-full blur-[128px] animate-blob
          ${theme === 'dark' ? 'bg-purple-500/20' : 'bg-purple-500/30'}`}
      />
      <div 
        className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full blur-[128px] animate-blob animation-delay-4000
          ${theme === 'dark' ? 'bg-indigo-500/20' : 'bg-indigo-500/30'}`}
      />
      <div 
        className={`absolute top-0 left-1/4 w-[200px] h-[200px] rounded-full blur-[128px] animate-blob animation-delay-6000
          ${theme === 'dark' ? 'bg-pink-500/20' : 'bg-pink-500/30'}`}
      />
    </div>
  )
}
