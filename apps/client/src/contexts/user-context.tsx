"use client"

import { createContext, useState, ReactNode } from 'react';

interface Dados {
  nome: string;
  id: string;
}

interface UserContextoType {
  dados: Dados;
  setDados: React.Dispatch<React.SetStateAction<Dados>>;
}

export const UserContexto = createContext<UserContextoType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<Dados>({
    nome: 'Nome Inicial',
    id: 'undefined',
  });

  return (
    <UserContexto.Provider value={{ dados, setDados }}>
      {children}
    </UserContexto.Provider>
  );
}
