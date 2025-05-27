"use client"

import React, { useState, useRef, useEffect } from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Github, Linkedin, Facebook, Youtube, Mail, Phone, Copy, Check, Users } from "lucide-react"
import { SiGravatar, SiWechat } from "react-icons/si"
import { FaWordpress, FaWhatsapp, FaFacebookMessenger } from "react-icons/fa"
import { TbBrandFiverr } from "react-icons/tb"

import { toast } from "@/components/ui/use-toast"

interface ProfileCardProps {
  name: string
  titles: string[]
  bio?: string
  location?: string
  email?: string
  phone?: string
  whatsapp?: string
  website?: string
  fiverr?: string
}

interface ContactOptionProps {
  icon: React.ReactNode
  label: string
  value: string
  color: string
  lightColor: string
  link?: string
}

function ContactOption({ icon, label, value, color, lightColor, link }: ContactOptionProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value)
    setCopied(true)
    toast({
      title: "Copied to clipboard",
      description: `${label}: ${value}`,
    })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleClick = (e: React.MouseEvent) => {
    if (link) {
      e.stopPropagation()
      window.open(link, "_blank")
    } else {
      copyToClipboard()
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`flex items-center gap-2 p-3 rounded-lg ${color} dark:${color} ${lightColor} text-white dark:text-white w-full text-left transition-all hover:brightness-110 cursor-pointer`}
    >
      <span className="p-1.5 bg-white/20 rounded-md">{icon}</span>
      <div className="flex-1">
        <div className="text-xs opacity-80">{label}</div>
        <div className="text-sm font-medium truncate max-w-[180px]">{value}</div>
      </div>
      {link ? (
        <span className="ml-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </span>
      ) : (
        <span className="ml-2">{copied ? <Check size={16} className="text-green-300" /> : <Copy size={16} />}</span>
      )}
    </div>
  )
}

interface SocialOptionProps {
  href: string
  icon: React.ReactNode
  label: string
  username: string
  color: string
  lightColor: string
}

function SocialOption({ href, icon, label, username, color, lightColor }: SocialOptionProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex items-center gap-2 p-3 rounded-lg ${color} dark:${color} ${lightColor} text-white dark:text-white w-full text-left transition-all hover:brightness-110`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <span className="p-1.5 bg-white/20 rounded-md">{icon}</span>
      <div className="flex-1">
        <div className="text-xs opacity-80">{label}</div>
        <div className="text-sm font-medium truncate max-w-[180px]">@{username}</div>
      </div>
      <span className="ml-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M7 17L17 7" />
          <path d="M7 7h10v10" />
        </svg>
      </span>
    </motion.a>
  )
}

export default function ProfileCard({
  name = "Shafayat Hossain",
  titles = ["Backend ninja", "Data whisperer", "IoT tinkerer"],
  bio = "14+ years of experience making PHP, Python, and databases dance. E-commerce platform architect at Arogga by day, data detective at Data Point by night.",
  location = "Dhaka, Bangladesh",
  email = "shafayat@engineer.com",
  phone = "+880 01616332313",
  whatsapp = "8801616332313",
  website = "https://jqsafi.github.io",
  fiverr = "https://fiverr.com/jqsafi",
}: ProfileCardProps) {
  const [activeTab, setActiveTab] = useState<"contact" | "social">("contact")
  const [contentHeight, setContentHeight] = useState<number>(0)
  const contactContentRef = useRef<HTMLDivElement>(null)
  const socialContentRef = useRef<HTMLDivElement>(null)

  // Calculate and set the maximum content height
  useEffect(() => {
    const calculateMaxHeight = () => {
      const contactHeight = contactContentRef.current?.scrollHeight || 0
      const socialHeight = socialContentRef.current?.scrollHeight || 0
      const maxHeight = Math.max(contactHeight, socialHeight)
      setContentHeight(maxHeight)
    }

    calculateMaxHeight()
    // Recalculate on window resize
    window.addEventListener("resize", calculateMaxHeight)
    return () => window.removeEventListener("resize", calculateMaxHeight)
  }, [])

  // Format WhatsApp number for link
  const whatsappLink = `https://wa.me/${whatsapp.replace(/\D/g, "")}`
  const formattedWhatsapp = whatsapp.startsWith("+") ? whatsapp : `+${whatsapp}`

  // Social media data for easy management
  const socialLinks = [
    {
      href: "https://github.com/jQsafi",
      icon: <Github size={18} />,
      color: "bg-gray-800",
      lightColor: "bg-gray-700",
      label: "GitHub",
      username: "jQsafi",
    },
    {
      href: "https://www.linkedin.com/in/jqsafi",
      icon: <Linkedin size={18} />,
      color: "bg-blue-700",
      lightColor: "bg-blue-600",
      label: "LinkedIn",
      username: "jqsafi",
    },
    {
      href: "https://www.facebook.com/jqsafi",
      icon: <Facebook size={18} />,
      color: "bg-blue-600",
      lightColor: "bg-blue-500",
      label: "Facebook",
      username: "jqsafi",
    },
    {
      href: "https://www.youtube.com/channel/UC2atVEJPWAb5Tcvs1H0NbVQ",
      icon: <Youtube size={18} />,
      color: "bg-red-600",
      lightColor: "bg-red-500",
      label: "YouTube",
      username: "jqsafi",
    },
    {
      href: "https://gravatar.com/jqsafi13",
      icon: <SiGravatar size={18} />,
      color: "bg-teal-600",
      lightColor: "bg-teal-500",
      label: "Gravatar",
      username: "jqsafi13",
    },
    {
      href: "https://jqsafi.wordpress.com",
      icon: <FaWordpress size={18} />,
      color: "bg-purple-600",
      lightColor: "bg-purple-500",
      label: "WordPress",
      username: "jqsafi",
    },
  ]

  // Contact options data
  const contactOptions = [
    {
      icon: <Mail size={16} />,
      label: "Email",
      value: email,
      color: "bg-blue-600",
      lightColor: "bg-blue-500",
    },
    {
      icon: <Phone size={16} />,
      label: "Phone",
      value: phone,
      color: "bg-green-600",
      lightColor: "bg-green-500",
    },
    {
      icon: <FaWhatsapp size={16} />,
      label: "WhatsApp",
      value: formattedWhatsapp,
      color: "bg-emerald-600",
      lightColor: "bg-emerald-500",
      link: whatsappLink,
    },
    {
      icon: <SiWechat size={16} />,
      label: "WeChat",
      value: "jqsafi",
      color: "bg-green-500",
      lightColor: "bg-green-400",
    },
    {
      icon: <FaFacebookMessenger size={16} />,
      label: "Messenger",
      value: "jqsafi",
      color: "bg-blue-500",
      lightColor: "bg-blue-400",
      link: "https://m.me/jqsafi",
    },
    {
      icon: <TbBrandFiverr size={16} />,
      label: "Fiverr",
      value: "jqsafi",
      color: "bg-emerald-500",
      lightColor: "bg-emerald-400",
      link: "https://www.fiverr.com/jqsafi",
    },
  ]

  return (
    <div className="relative w-[90%] sm:w-[60%] lg:w-[80%] mx-auto mt-16 sm:mt-20 flex flex-col items-center">
      {/* Avatar positioned half outside the card */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg absolute -top-14 sm:-top-16 lg:-top-18 z-10"
      >
        <img src="/images/profile.jpeg" alt={name} className="w-full h-full object-cover" />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="w-full bg-white dark:bg-slate-800/80 backdrop-blur-md rounded-2xl p-6 pt-16 sm:pt-20 shadow-xl border border-gray-200 dark:border-gray-700/30"
      >
        {/* Single column layout */}
        <div className="flex flex-col items-center text-center">
          {/* Name */}
          <motion.h2
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="text-2xl font-semibold text-gray-900 dark:text-white mb-2"
          >
            {name}
          </motion.h2>

          {/* Location */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.05 }}
            className="text-gray-600 dark:text-gray-400 text-sm mb-3"
          >
            {location}
          </motion.p>

          {/* Titles - Single Line Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
            className="inline-flex items-center bg-gradient-to-r from-indigo-600/70 via-teal-600/70 to-orange-600/70 dark:from-indigo-900/70 dark:via-teal-900/70 dark:to-orange-900/70 rounded-full px-1 py-1 mb-4 flex-wrap justify-center"
          >
            {titles.map((title, index) => (
              <React.Fragment key={index}>
                <span className="px-3 py-1 text-sm text-white whitespace-nowrap">{title}</span>
                {index < titles.length - 1 && <div className="w-1 h-1 bg-white/50 rounded-full mx-1"></div>}
              </React.Fragment>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="text-gray-700 dark:text-gray-300 text-sm max-w-2xl mb-6"
          >
            {bio}
          </motion.p>

          {/* Integrated Contact & Social Options */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className="w-full max-w-3xl mx-auto mb-6"
          >
            {/* Tabs */}
            <div className="flex mb-3 bg-gray-100 dark:bg-slate-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab("contact")}
                className={`flex items-center justify-center gap-1.5 flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "contact"
                    ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white"
                }`}
              >
                <Phone size={16} />
                Contact Information
              </button>
              <button
                onClick={() => setActiveTab("social")}
                className={`flex items-center justify-center gap-1.5 flex-1 py-2 text-sm font-medium rounded-md transition-colors ${
                  activeTab === "social"
                    ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-white shadow-sm"
                    : "text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-white"
                }`}
              >
                <Users size={16} />
                Social Profiles
              </button>
            </div>

            {/* Content container with fixed height */}
            <div className="relative" style={{ height: contentHeight > 0 ? `${contentHeight}px` : "auto" }}>
              {/* Contact tab content */}
              <div
                ref={contactContentRef}
                className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
                  activeTab === "contact" ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                  {contactOptions.map((option, index) => (
                    <ContactOption
                      key={index}
                      icon={option.icon}
                      label={option.label}
                      value={option.value}
                      color={option.color}
                      lightColor={option.lightColor}
                      link={option.link}
                    />
                  ))}
                </div>
              </div>

              {/* Social tab content */}
              <div
                ref={socialContentRef}
                className={`absolute top-0 left-0 w-full transition-opacity duration-300 ${
                  activeTab === "social" ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 w-full">
                  {socialLinks.map((link, index) => (
                    <SocialOption
                      key={index}
                      href={link.href}
                      icon={link.icon}
                      label={link.label}
                      username={link.username}
                      color={link.color}
                      lightColor={link.lightColor}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.6 }}
            className="flex gap-3"
          >
            <Button
              variant="outline"
              className="bg-indigo-600 dark:bg-indigo-600 hover:bg-indigo-700 dark:hover:bg-indigo-700 text-white rounded-full px-6 py-2 text-sm font-medium"
            >
              Connect
            </Button>
            <Button
              variant="outline"
              className="bg-transparent text-indigo-600 dark:text-white border-indigo-600 dark:border-white hover:bg-indigo-50 dark:hover:bg-white/10 rounded-full px-6 py-2 text-sm font-medium"
            >
              Download CV
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
