"use client"

import { useState, useEffect } from "react"
import DeviceItem from "./DeviceItem"

export default function DeviceList() {
  const [devices, setDevices] = useState<string[]>([])

  useEffect(() => {
    // TODO: Implement WebSocket connection to get connected devices
    const mockDevices = ["Laptop de João", "iPhone de Maria", "Tablet de Carlos"]
    setDevices(mockDevices)
  }, [])

  return (
    <div className="w-full max-w-md space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Dispositivos Conectados</h2>
      {devices.map((device, index) => (
        <DeviceItem key={index} name={device} />
      ))}
    </div>
  )
}

