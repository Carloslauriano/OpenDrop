import { useState, useEffect, useRef } from 'react';

export const useSocket = (url: string) => {
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const ws = useRef<WebSocket | null>(null);

  useEffect(() => {
    // Cria uma nova instância do WebSocket
    ws.current = new WebSocket(url);

    // Quando a conexão é aberta
    ws.current.onopen = () => {
      console.log('Conectado ao WebSocket');
      setIsConnected(true);
    };

    // Quando uma mensagem é recebida
    ws.current.onmessage = (event) => {
      console.log('Mensagem recebida:', event.data);
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };

    // Quando a conexão é fechada
    ws.current.onclose = () => {
      console.log('Conexão fechada');
      setIsConnected(false);
    };

    // Em caso de erro
    ws.current.onerror = (error) => {
      console.error('Erro na conexão WebSocket:', error);
    };

    // Cleanup: fecha a conexão quando o componente é desmontado
    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, [url]);

  // Função para enviar mensagem via WebSocket
  const sendMessage = (message: string) => {
    if (ws.current && isConnected) {
      ws.current.send(message);
    }
  };

  return { isConnected, messages, sendMessage };
};
