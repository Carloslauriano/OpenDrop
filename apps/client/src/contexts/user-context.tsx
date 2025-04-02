"use client"

import { useSocket } from '@/hooks/use-socket';
import { DeviceClass } from '@/utils/device-class';
import { createContext, useState, ReactNode } from 'react';

interface Dados {
  nome: string;
  id: string;
}

interface UserContextoType {
  dados: Dados;
  setDados: React.Dispatch<React.SetStateAction<Dados>>;
  isConnected: boolean;
  messages: string[];
  sendMessage: (message: string) => void;
  devices: DeviceClass[];
  setDevices: React.Dispatch<React.SetStateAction<DeviceClass[]>>;
}

export const UserContexto = createContext<UserContextoType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<Dados>({
    nome: 'Nome Inicial',
    id: 'undefined',
  });

  const [devices, setDevices] = useState<DeviceClass[]>([])

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://127.0.0.1:8080/ws';
  const { isConnected, messages, sendMessage } = useSocket(socketUrl);

  return (
    <UserContexto.Provider value={{ dados, setDados, isConnected, messages, sendMessage, devices, setDevices }}>
      {children}
    </UserContexto.Provider>
  );
}
