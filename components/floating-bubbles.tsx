"use client"
import ProfileCard from "./profile-card"
import { ThemeToggle } from "./theme-toggle"
import AnimatedBackground from "./animated-background"
import { useState } from "react"

interface FloatingBubblesBackgroundProps {
  name: string;
  title1: string;
  title2: string;
}

function Bubble({ x, y, size, delay }: { x: string; y: string; size: number; delay: number }) {
  return (
    <div
      className="absolute rounded-full bg-indigo-400 dark:bg-pink-500 opacity-50 animate-bubble"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        animationDelay: `${delay}s`,
      }}
    />
  )
}

export default function FloatingBubblesBackground({ name, title1, title2 }: FloatingBubblesBackgroundProps) {
  const [bubbles] = useState([
    { x: "10%", y: "20%", size: 60, delay: 0 },
    { x: "80%", y: "30%", size: 40, delay: 2 },
    { x: "50%", y: "70%", size: 50, delay: 4 },
    { x: "30%", y: "50%", size: 30, delay: 1 },
    { x: "70%", y: "80%", size: 70, delay: 3 },
  ])

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-slate-900 transition-colors duration-300">
      {/* Animated background */}
      <AnimatedBackground />

      {/* Theme toggle button */}
      <ThemeToggle />

      {/* Additional decorative bubbles */}
      {bubbles.map((bubble, index) => (
        <Bubble key={index} x={bubble.x} y={bubble.y} size={bubble.size} delay={bubble.delay} />
      ))}

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
