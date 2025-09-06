"use client"

import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/LanguageContext"

export function useLocalizedToast() {
  const { toast } = useToast()
  const { t } = useLanguage()

  const showToast = {
    success: (title?: string, description?: string) => {
      toast({
        variant: "success",
        title: title || t('toast.success'),
        description,
      })
    },
    error: (title?: string, description?: string) => {
      toast({
        variant: "destructive",
        title: title || t('toast.error'),
        description,
      })
    },
    warning: (title?: string, description?: string) => {
      toast({
        variant: "warning",
        title: title || t('toast.warning'),
        description,
      })
    },
    info: (title?: string, description?: string) => {
      toast({
        variant: "default",
        title: title || t('toast.info'),
        description,
      })
    },
  }

  return { toast, showToast, t }
}
