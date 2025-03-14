"use client"

import type React from "react"
import { useState, useRef, useContext } from "react"
import { Laptop, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { toast } from "@/hooks/use-toast"
import { useFileReceive } from "@/lib/fileReceiveContext"
import { UserContexto } from "@/contexts/user-context"

interface DeviceItemProps {
  device: DeviceProps
}

interface DeviceProps {
  name: string
}

export default function DeviceItem({ device }: DeviceItemProps) {
  const connection = useContext(UserContexto);
  if (!connection) throw new Error("DeviceItem deve ser utilizado dentro do ConnectionProvider");
  const { } = connection;

  const [isUploading, setIsUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { setReceivedFile } = useFileReceive()

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    // const buffer = await file.arrayBuffer()

    setIsUploading(true)
    setProgress(0)

    // Simulating upload process


    // for (let i = 0; i <= 100; i += 10) {
    //   await new Promise((resolve) => setTimeout(resolve, 200))
    //   setProgress(i)
    // }

    setIsUploading(false)
    setProgress(0)
    // toast({
    //   title: "Arquivo enviado",
    //   description: `${file.name} foi enviado para ${name}`,
    // })

    // // Simulate receiving the file on the other device
    // setTimeout(() => {
    //   setReceivedFile({ fileName: file.name, fromDevice: "Seu dispositivo" })
    // }, 2000)
  }

  const handleCardClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <Card className="cursor-pointer transition-all hover:bg-accent" onClick={handleCardClick}>
      <CardContent className="flex flex-col p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <Laptop className="w-6 h-6" />
            <span className="font-medium">{device.name}</span>
          </div>
          <Button
            variant="link"
            size="icon"
            disabled={isUploading}
            onClick={(e) => {
              e.stopPropagation() // Prevent card click event
              fileInputRef.current?.click()
            }}
          >
            <Upload className={`w-4 h-4 ${isUploading ? "animate-pulse" : ""}`} />
            <span className="sr-only">Enviar arquivo para {device.name}</span>
          </Button>
        </div>
        {isUploading && <Progress value={progress} className="w-full mt-2" />}
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleFileSelect} accept="*/*"/>
      </CardContent>
    </Card>
  )
}

