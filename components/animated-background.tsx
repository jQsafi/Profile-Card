"use client"

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  opacity: number
  color: string
  pulseSpeed: number
  pulseDirection: number
  currentSize: number
  originalSize: number
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [particles, setParticles] = useState<Particle[]>([])
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const animationRef = useRef<number>(0)
  const frameCount = useRef(0)

  // Initialize particles
  useEffect(() => {
    const isDark = typeof window !== 'undefined' && document.documentElement.classList.contains("dark")
    setIsDarkMode(isDark)
    
    const handleResize = () => {
      if (canvasRef.current) {
        const width = window.innerWidth
        const height = window.innerHeight
        canvasRef.current.width = width
        canvasRef.current.height = height
        setDimensions({ width, height })

        // Create particles based on screen size - more particles for larger screens
        const particleCount = Math.min(Math.floor((width * height) / 8000), 150)
        const newParticles: Particle[] = []

        for (let i = 0; i < particleCount; i++) {
          newParticles.push(createParticle(width, height))
        }

        setParticles(newParticles)
      }
    }

    // Create a single particle with more varied properties
    const createParticle = (width: number, height: number): Particle => {
      const isDark = isDarkMode
      setIsDarkMode(isDark)

      // Size with more variation - mix of small and large particles
      const size =
        Math.random() < 0.8
          ? Math.random() * 3 + 0.5 // 80% small particles (0.5-3.5)
          : Math.random() * 6 + 4 // 20% larger particles (4-10)

      // Slower, more varied speeds
      const speedFactor = 0.15
      const speedX = (Math.random() * 2 - 1) * speedFactor
      const speedY = (Math.random() * 2 - 1) * speedFactor

      // Different color schemes for light and dark modes with more saturation variation
      let color
      if (isDark) {
        // Dark mode: purples, blues, and pinks with occasional bright accent
        const isAccent = Math.random() < 0.1 // 10% chance of accent color
        const hue = isAccent
          ? Math.floor(Math.random() * 60) + 40 // yellows and oranges for accent
          : Math.random() > 0.5
            ? Math.floor(Math.random() * 60) + 220 // blues and purples
            : Math.floor(Math.random() * 30) + 300 // pinks

        const saturation = Math.floor(Math.random() * 30) + 70 // 70-100%
        const lightness = Math.floor(Math.random() * 20) + 60 // 60-80%
        const opacity = Math.random() * 0.3 + 0.1 // 0.1-0.4

        color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`
      } else {
        // Light mode: light blues, purples, and teals with occasional dark accent
        const isAccent = Math.random() < 0.1 // 10% chance of accent color
        const hue = isAccent
          ? Math.floor(Math.random() * 60) + 180 // deeper teals for accent
          : Math.random() > 0.5
            ? Math.floor(Math.random() * 60) + 180 // teals and light blues
            : Math.floor(Math.random() * 40) + 240 // light purples

        const saturation = Math.floor(Math.random() * 40) + 60 // 60-100%
        const lightness = Math.floor(Math.random() * 20) + 70 // 70-90%
        const opacity = Math.random() * 0.3 + 0.1 // 0.1-0.4

        color = `hsla(${hue}, ${saturation}%, ${lightness}%, ${opacity})`
      }

      // Add pulsing effect
      const pulseSpeed = Math.random() * 0.03 + 0.01 // How fast it pulses
      const pulseDirection = 1 // Start by growing

      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size,
        originalSize: size,
        currentSize: size,
        speedX,
        speedY,
        opacity: Math.random() * 0.5 + 0.1,
        color,
        pulseSpeed,
        pulseDirection,
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    // Watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (
          mutation.type === "attributes" &&
          mutation.attributeName === "class" &&
          mutation.target === document.documentElement
        ) {
          const isDark = document.documentElement.classList.contains("dark")
          if (isDark !== isDarkMode) {
            setIsDarkMode(isDark)
            // Update particle colors when theme changes
            setParticles((prev) =>
              prev.map((particle) => ({
                ...particle,
                color: createParticle(dimensions.width, dimensions.height).color,
              })),
            )
          }
        }
      })
    })

    observer.observe(document.documentElement, { attributes: true })

    return () => {
      window.removeEventListener("resize", handleResize)
      observer.disconnect()
    }
  }, [])

  // Enhanced mouse interaction
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = () => setIsHovering(true)
    const handleMouseLeave = () => setIsHovering(false)

    window.addEventListener("mousemove", handleMouseMove)
    if (canvasRef.current) {
      canvasRef.current.addEventListener("mouseenter", handleMouseEnter)
      canvasRef.current.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (canvasRef.current) {
        canvasRef.current.removeEventListener("mouseenter", handleMouseEnter)
        canvasRef.current.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  // Animation loop with improved particle behavior
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const animate = () => {
      ctx.clearRect(0, 0, dimensions.width, dimensions.height)
      frameCount.current++

      // Draw and update particles
      const updatedParticles = particles.map((particle) => {
        // Update position with slight randomness for more natural movement
        const randomFactor = Math.random() * 0.1 - 0.05
        particle.x += particle.speedX + randomFactor
        particle.y += particle.speedY + randomFactor

        // Bounce off edges with slight speed change for variety
        if (particle.x < 0 || particle.x > dimensions.width) {
          particle.speedX *= -1
          particle.speedX += Math.random() * 0.02 - 0.01 // Add slight randomness
        }
        if (particle.y < 0 || particle.y > dimensions.height) {
          particle.speedY *= -1
          particle.speedY += Math.random() * 0.02 - 0.01 // Add slight randomness
        }

        // Enhanced mouse interaction - stronger effect and slight attraction for some particles
        if (isHovering) {
          const dx = mousePosition.x - particle.x
          const dy = mousePosition.y - particle.y
          const distance = Math.sqrt(dx * dx + dy * dy)
          const maxDistance = 200 // Increased interaction radius

          if (distance < maxDistance) {
            const force = (maxDistance - distance) / maxDistance

            // Some particles are attracted, others repelled
            const isAttracted = particle.size > 3 // Larger particles are attracted
            const forceFactor = isAttracted ? 0.01 : -0.03

            particle.speedX += (dx / distance) * force * forceFactor
            particle.speedY += (dy / distance) * force * forceFactor

            // Particles grow slightly when interacted with
            if (!isAttracted) {
              particle.currentSize = particle.originalSize * (1 + force * 0.5)
            }
          } else {
            // Gradually return to original size
            particle.currentSize = particle.originalSize
          }
        } else {
          // Pulsing effect when not interacting with mouse
          if (frameCount.current % 2 === 0) {
            // Only update every other frame for performance
            if (particle.pulseDirection === 1) {
              particle.currentSize += particle.pulseSpeed
              if (particle.currentSize > particle.originalSize * 1.3) {
                particle.pulseDirection = -1
              }
            } else {
              particle.currentSize -= particle.pulseSpeed
              if (particle.currentSize < particle.originalSize * 0.7) {
                particle.pulseDirection = 1
              }
            }
          }
        }

        // Speed limit with variation based on particle size
        const maxSpeed = 0.8 + (particle.size > 3 ? 0.3 : 0) // Larger particles can move slightly faster
        const currentSpeed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY)
        if (currentSpeed > maxSpeed) {
          particle.speedX = (particle.speedX / currentSpeed) * maxSpeed
          particle.speedY = (particle.speedY / currentSpeed) * maxSpeed
        }

        // Draw particle with current size (affected by pulsing or mouse interaction)
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.currentSize, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.fill()

        // Enhanced connections - more connections for larger particles
        const connectionRadius = particle.size > 3 ? 180 : 120

        particles.forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < connectionRadius && distance > 0) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)

        const isDark = isDarkMode
            // Opacity based on distance and particle sizes
            const opacityFactor = (particle.size + otherParticle.size) / 10
            const opacity = 0.05 * (1 - distance / connectionRadius) * opacityFactor

            // Different connection colors based on theme and particle types
            let strokeColor
            if (isDark) {
              if (particle.size > 3 && otherParticle.size > 3) {
                // Connection between two large particles
                strokeColor = `rgba(255, 215, 255, ${opacity * 1.5})`
              } else {
                // Regular connections
                strokeColor = `rgba(255, 255, 255, ${opacity})`
              }
            } else {
              if (particle.size > 3 && otherParticle.size > 3) {
                // Connection between two large particles
                strokeColor = `rgba(100, 100, 255, ${opacity * 1.5})`
              } else {
                // Regular connections
                strokeColor = `rgba(100, 100, 255, ${opacity})`
              }
            }

            ctx.strokeStyle = strokeColor
            ctx.lineWidth = Math.min(particle.size, otherParticle.size) * 0.2
            ctx.stroke()
          }
        })

        return particle
      })

      setParticles(updatedParticles)
      animationRef.current = requestAnimationFrame(animate)
    }

    animationRef.current = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animationRef.current)
    }
  }, [dimensions, particles, mousePosition, isHovering])

  // Gradient animation
  const gradientVariants = {
    light: {
      background: [
        "linear-gradient(135deg, rgba(224, 231, 255, 0.7) 0%, rgba(236, 225, 255, 0.7) 100%)",
        "linear-gradient(225deg, rgba(224, 231, 255, 0.7) 0%, rgba(236, 225, 255, 0.7) 100%)",
        "linear-gradient(315deg, rgba(224, 231, 255, 0.7) 0%, rgba(236, 225, 255, 0.7) 100%)",
        "linear-gradient(45deg, rgba(224, 231, 255, 0.7) 0%, rgba(236, 225, 255, 0.7) 100%)",
      ],
    },
    dark: {
      background: [
        "linear-gradient(135deg, rgba(49, 46, 129, 0.7) 0%, rgba(76, 29, 149, 0.7) 100%)",
        "linear-gradient(225deg, rgba(49, 46, 129, 0.7) 0%, rgba(76, 29, 149, 0.7) 100%)",
        "linear-gradient(315deg, rgba(49, 46, 129, 0.7) 0%, rgba(76, 29, 149, 0.7) 100%)",
        "linear-gradient(45deg, rgba(49, 46, 129, 0.7) 0%, rgba(76, 29, 149, 0.7) 100%)",
      ],
    },
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 z-0"
        animate={isDarkMode ? "dark" : "light"}
        variants={gradientVariants}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
      />

      {/* Accent blobs */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-300/50 dark:bg-pink-500/50 rounded-full filter blur-3xl opacity-30 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-300/50 dark:bg-red-500/50 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-indigo-400/50 dark:bg-pink-600/50 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      <div className="absolute top-0 right-0 w-48 h-48 bg-purple-400/50 dark:bg-red-600/50 rounded-full filter blur-3xl opacity-30 animate-blob animation-delay-6000"></div>

      {/* Interactive particle canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-10" style={{ pointerEvents: "none" }} />
    </div>
  )
}
