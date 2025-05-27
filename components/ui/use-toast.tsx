import type React from "react"
// Simplified version of the toast component
import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  action?: React.ReactNode
  variant?: "default" | "destructive"
}

export function toast({ title, description, action, variant }: ToastProps) {
  return sonnerToast(title, {
    description,
    action,
  })
}
