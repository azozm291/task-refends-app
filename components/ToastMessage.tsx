'use client'


import { useToast } from "@/hooks/use-toast"
import { useEffect } from "react"

interface ToastMessageProps {
  errorMessage?: string
}

const ToastMessage = ({ errorMessage }: ToastMessageProps) => {
  const { toast } = useToast()

  useEffect(() => {
    if (errorMessage) {
      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      })
    }
  }, [errorMessage, toast])

  return null // No need to render anything, just triggers the toast
}

export default ToastMessage
