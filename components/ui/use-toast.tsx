"use client"

import * as React from "react"
import { useEffect, useState } from "react"
import { createPortal } from "react-dom"
import { cn } from "@/lib/utils"
import { AlertCircle, CheckCircle2, X } from "lucide-react"

export type ToastProps = {
  title?: string
  description?: string
  variant?: "default" | "destructive"
}

type ToastContextType = {
  toast: (props: ToastProps) => void
}

const ToastContext = React.createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<(ToastProps & { id: string })[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  const toast = React.useCallback((props: ToastProps) => {
    const id = Math.random().toString(36).substring(2, 9)
    setToasts((prevToasts) => [...prevToasts, { ...props, id }])

    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
    }, 5000)
  }, [])

  const removeToast = React.useCallback((id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id))
  }, [])

  const contextValue = React.useMemo(() => ({ toast }), [toast])

  return (
    <ToastContext.Provider value={contextValue}>
      {children}
      {mounted &&
        createPortal(
          <div className="fixed bottom-0 right-0 z-50 p-4 space-y-4 w-full max-w-sm">
            {toasts.map((toast) => (
              <div
                key={toast.id}
                className={cn(
                  "flex items-start gap-3 rounded-lg border p-4 shadow-lg transition-all bg-background",
                  toast.variant === "destructive"
                    ? "border-red-600 text-red-600"
                    : "border-border"
                )}
                role="alert"
              >
                <div className="h-5 w-5 flex-shrink-0">
                  {toast.variant === "destructive" ? (
                    <AlertCircle className="h-5 w-5" />
                  ) : (
                    <CheckCircle2 className="h-5 w-5 text-green-500" />
                  )}
                </div>
                <div className="flex-1">
                  {toast.title && (
                    <div className="font-medium leading-none tracking-tight">
                      {toast.title}
                    </div>
                  )}
                  {toast.description && (
                    <div className="mt-1 text-sm opacity-90">
                      {toast.description}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => removeToast(toast.id)}
                  className="flex-shrink-0 rounded-lg p-0.5 text-foreground/50 opacity-70 hover:opacity-100"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const toast = {
  default: (props: Omit<ToastProps, "variant">) => {
    const context = React.useContext(ToastContext)
    if (!context) {
      console.error("toast.default was used outside of ToastProvider")
      return
    }
    context.toast({ ...props, variant: "default" })
  },
  destructive: (props: Omit<ToastProps, "variant">) => {
    const context = React.useContext(ToastContext)
    if (!context) {
      console.error("toast.destructive was used outside of ToastProvider")
      return
    }
    context.toast({ ...props, variant: "destructive" })
  },
} 