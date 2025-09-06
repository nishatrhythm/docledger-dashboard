"use client"

import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { 
  RxCheckCircled, 
  RxCrossCircled, 
  RxExclamationTriangle, 
  RxInfoCircled 
} from "react-icons/rx"

export function Toaster() {
  const { toasts } = useToast()

  const getIcon = (variant?: string | null) => {
    switch (variant) {
      case "success":
        return <RxCheckCircled className="h-5 w-5 text-green-600" />
      case "destructive":
        return <RxCrossCircled className="h-5 w-5 text-red-600" />
      case "warning":
        return <RxExclamationTriangle className="h-5 w-5 text-yellow-600" />
      default:
        return <RxInfoCircled className="h-5 w-5 text-blue-600" />
    }
  }

  return (
    <ToastProvider>
      {toasts.map(function ({ id, title, description, action, variant, ...props }) {
        return (
          <Toast key={id} variant={variant} {...props}>
            <div className="flex items-center gap-3">
              <div className="flex-shrink-0">
                {getIcon(variant)}
              </div>
              <div className="grid gap-1 flex-1">
                {title && <ToastTitle>{title}</ToastTitle>}
                {description && (
                  <ToastDescription>{description}</ToastDescription>
                )}
              </div>
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}
