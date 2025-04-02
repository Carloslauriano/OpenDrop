"use client"

import { useEffect, useContext } from "react"
import DeviceItem from "./DeviceItem"
import { UserContexto } from "@/contexts/user-context"
import { DeviceClass } from "@/utils/device-class";

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
    const message = JSON.stringify({ type: 'device-name', data: { name: dados.nome, uuid: dados.id } })
    sendMessage(message)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dados.nome])


  useEffect(() => {
    if (!isConnected) return
    if (!messages[messages.length - 1]) return
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lestMessages = JSON.parse(messages[messages.length - 1]) as any;

    switch (lestMessages.type) {

      case 'existing-users':
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        setDevices(lestMessages.users.map((user: any) => new DeviceClass(user.userId, user)))
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
        devices.map(device => {
          if (device.userId === lestMessages.userId) {
            device.changeName(lestMessages.name)
          }
        })
        break;
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages])

  return (
    <div className="w-full max-w-6xl">
      <h2 className="text-2xl font-semibold mb-4 text-foreground text-center">Dispositivos Conectados</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {devices.map((device, index) => (
          <DeviceItem key={index} device={device} />
        ))}
      </div>
    </div>
  )
}

