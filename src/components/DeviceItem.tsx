"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Laptop, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { useFileReceive } from "@/lib/fileReceiveContext"

interface DeviceItemProps {
  name: string
}

export default function DeviceItem({ name }: DeviceItemProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setReceivedFile } = useFileReceive()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setProgress(0)

    // Simulating upload process
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, 200))
      setProgress(i)
    }

    setIsUploading(false)
    setProgress(0)
    toast({
      title: "Arquivo enviado",
      description: `${file.name} foi enviado para ${name}`,
    })

    // Simulate receiving the file on the other device
    setTimeout(() => {
      setReceivedFile({ fileName: file.name, fromDevice: "Seu dispositivo" })
    }, 2000)
  }

  const handleCardClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="cursor-pointer transition-all hover:bg-gray-100" onClick={handleCardClick}>
      <CardContent className="flex flex-col p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Laptop className="w-6 h-6" />
            <span className="font-medium">{name}</span>
          </div>
          <Button
            variant="outline"
            size="icon"
            disabled={isUploading}
            onClick={(e) => {
              e.stopPropagation() // Prevent card click event
              fileInputRef.current?.click()
            }}
          >
            <Upload className={`w-4 h-4 ${isUploading ? "animate-pulse" : ""}`} />
            <span className="sr-only">Enviar arquivo para {name}</span>
          </Button>
        </div>
        {isUploading && <Progress value={progress} className="w-full mt-2" />}
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} />
      </CardContent>
    </Card>
  )
}

