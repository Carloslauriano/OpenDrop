"use client"

import { useState, useEffect } from "react"
import { Loader2 } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function ConnectionStatus() {
  const [isConnecting, setIsConnecting] = useState(true)

  useEffect(() => {
    // Simular uma conexão após 5 segundos
    const timer = setTimeout(() => {
      setIsConnecting(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  if (!isConnecting) return null

  return (
    <div className="fixed inset-x-0 top-16 flex items-center justify-center z-50">
      <Card className="w-[300px] shadow-lg">
        <CardContent className="flex items-center justify-center p-4">
          <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
          <p className="text-sm font-medium">connecting...</p>
        </CardContent>
      </Card>
    </div>
  )
}

