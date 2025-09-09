import * as React from "react"
import { cn } from "@/lib/utils"
import { createPortal } from "react-dom"

interface DialogProps {
  open: boolean
  onOpenChange?: (open: boolean) => void
  disableOutsideClick?: boolean
  children: React.ReactNode
  maxWidth?: string
}

interface DialogContentProps {
  className?: string
  children: React.ReactNode
}

interface DialogHeaderProps {
  className?: string
  children: React.ReactNode
}

interface DialogTitleProps {
  className?: string
  children: React.ReactNode
}

interface DialogDescriptionProps {
  className?: string
  children: React.ReactNode
}

interface DialogFooterProps {
  className?: string
  children: React.ReactNode
}

const Dialog = ({ open, onOpenChange, disableOutsideClick = false, children, maxWidth = "max-w-lg" }: DialogProps) => {
  if (!open) return null

  const dialogContent = (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/20 backdrop-blur-sm"
        onClick={() => !disableOutsideClick && onOpenChange && onOpenChange(false)}
      />
      {/* Content */}
      <div className={cn("relative z-50 max-h-[90vh] w-full overflow-y-auto", maxWidth)}>
        {children}
      </div>
    </div>
  )

  // Use portal to render at document body level
  return typeof window !== 'undefined' 
    ? createPortal(dialogContent, document.body)
    : null
}

const DialogContent = React.forwardRef<HTMLDivElement, DialogContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl border shadow-lg p-6 m-4",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
)
DialogContent.displayName = "DialogContent"

const DialogHeader = ({ className, children }: DialogHeaderProps) => (
  <div className={cn("flex flex-col space-y-1.5 text-center sm:text-left mb-4 pb-4 relative", className)}>
    {children}
    <div className="absolute bottom-0 left-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
  </div>
)

const DialogTitle = React.forwardRef<HTMLHeadingElement, DialogTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h2
      ref={ref}
      className={cn("text-lg font-semibold leading-none tracking-tight", className)}
      {...props}
    >
      {children}
    </h2>
  )
)
DialogTitle.displayName = "DialogTitle"

const DialogDescription = React.forwardRef<HTMLParagraphElement, DialogDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-gray-600", className)}
      {...props}
    >
      {children}
    </p>
  )
)
DialogDescription.displayName = "DialogDescription"

const DialogFooter = ({ className, children }: DialogFooterProps) => (
  <div className={cn("flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-6 pt-4 relative", className)}>
    <div className="absolute top-0 left-0 right-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
    {children}
  </div>
)

export {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
}
