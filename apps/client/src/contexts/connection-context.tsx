import { createContext, useState, ReactNode } from 'react';

interface Dados {
  nome: string;
  id: string;
  conexoes: string[];
}

interface ConnectionContextoType {
  dados: Dados;
  setDados: React.Dispatch<React.SetStateAction<Dados>>;
}

export const ConnectionContexto = createContext<ConnectionContextoType | undefined>(undefined);

export function ConnectionProvider({ children }: { children: ReactNode }) {
  const [dados, setDados] = useState<Dados>({
    nome: 'Nome Inicial',
    id: 'undefined',
    conexoes: [] // Pode ser uma lista de strings ou de objetos
  });

  return (
    <ConnectionContexto.Provider value={{ dados, setDados }}>
      {children}
    </ConnectionContexto.Provider>
  );
}
