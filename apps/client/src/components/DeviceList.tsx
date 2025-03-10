"use client"

import { useEffect, useContext } from "react"
import DeviceItem from "./DeviceItem"
import { UserContexto } from "@/contexts/user-context"

export default function DeviceList() {
  const connection = useContext(UserContexto);
  if (!connection) throw new Error("DeviceList deve ser utilizado dentro do ConnectionProvider");
  const { dados, setDados, isConnected, messages, sendMessage, devices, setDevices } = connection;

  useEffect(() => {
    if (isConnected && dados.nome) {
      sendMessage(JSON.stringify({ type: 'hello', data: { name: dados.nome } }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isConnected])


  useEffect(() => {
    if (!isConnected) return
    if (!messages[messages.length - 1]) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lestMessages = JSON.parse(messages[messages.length - 1]) as any;

    switch (lestMessages.type) {

      case 'existing-users':
        setDevices(lestMessages.users)
        break;
      case 'user-disconnected':
        setDevices(prevDevices => prevDevices.filter(device => device.userId !== lestMessages.userId));
        break;
      case 'new-user':
        setDevices(prevDevices => [...prevDevices, lestMessages.user]);
        break;
      case 'connection':
        setDados(prevDados => {
          const newDados = { ...prevDados, id: lestMessages.userId }
          return newDados
        })
        break;
      case 'user-renamed':
        setDevices(prevDevices =>
          prevDevices.map(device =>
            device.userId === lestMessages.userId ? { ...device, name: lestMessages.name } : device
          )
        );
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-4 text-foreground text-center">Dispositivos Conectados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device, index) => (
          <DeviceItem key={index} name={device.name} />
        ))}
      </div>
    </div>
  )
}

