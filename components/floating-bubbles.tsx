"use client"
import ProfileCard from "./profile-card"
import { ThemeToggle } from "./theme-toggle"
import AnimatedBackground from "./animated-background"

interface FloatingBubblesBackgroundProps {
  name: string;
  title1: string;
  title2: string;
}

export default function FloatingBubblesBackground({ name, title1, title2 }: FloatingBubblesBackgroundProps) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Theme toggle button */}
      <ThemeToggle />

      <div className="relative z-20 container mx-auto px-4 md:px-6 flex items-center justify-center min-h-screen py-10">
        <div className="w-full">
          <ProfileCard 
            name={name} 
            titles={[title1, title2]} 
            bio="14+ years of experience making PHP, Python, and databases dance. E-commerce platform architect at Arogga by day, data detective at Data Point by night."
            location="Dhaka, Bangladesh"
            email="shafayat@engineer.com" 
            phone="+880 01616332313" 
            whatsapp="8801616332313" 
            website="https://jqsafi.github.io"
          />
        </div>
      </div>
    </div>
  )
}
