"use client"

import { useSocket } from '@/hooks/use-socket';
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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  devices: any[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setDevices: React.Dispatch<React.SetStateAction<any[]>>;
}

export const UserContexto = createContext<UserContextoType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<Dados>({
    nome: 'Nome Inicial',
    id: 'undefined',
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [devices, setDevices] = useState<any[]>([])

  const socketUrl = process.env.NEXT_PUBLIC_SOCKET_URL || 'ws://127.0.0.1:8080/ws';
  const { isConnected, messages, sendMessage } = useSocket(socketUrl);

  return (
    <UserContexto.Provider value={{ dados, setDados, isConnected, messages, sendMessage, devices, setDevices }}>
      {children}
    </UserContexto.Provider>
  );
}
