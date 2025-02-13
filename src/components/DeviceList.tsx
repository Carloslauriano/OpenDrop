"use client"

import { useState, useEffect } from "react"
import DeviceItem from "./DeviceItem"

export default function DeviceList() {
  const [devices, setDevices] = useState<string[]>([])

  useEffect(() => {
    // TODO: Implement WebSocket connection to get connected devices
    const mockDevices = [
      "Laptop de João",
      "iPhone de Maria",
      "Tablet de Carlos",
      "PC de Ana",
      "Android de Pedro",
      "MacBook de Laura",
    ]
    setDevices(mockDevices)
  }, [])

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-4 text-foreground text-center">Dispositivos Conectados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device, index) => (
          <DeviceItem key={index} name={device} />
        ))}
      </div>
    </div>
  )
}

