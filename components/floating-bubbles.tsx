"use client"
import ProfileCard from "./profile-card"
import { ThemeToggle } from "./theme-toggle"
import AnimatedBackground from "./animated-background"

export default function FloatingBubblesBackground() {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Theme toggle button */}
      <ThemeToggle />

      <div className="relative z-20 container mx-auto px-4 md:px-6 flex items-center justify-center min-h-screen py-10">
        <div className="w-full">
          <ProfileCard />
        </div>
      </div>
    </div>
  )
}
