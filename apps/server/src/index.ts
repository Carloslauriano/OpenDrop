import fastify, { FastifyRequest } from 'fastify';
import websocket from '@fastify/websocket';
import { UAParser } from 'ua-parser-js';


const server = fastify();

// Registra o plugin de WebSocket
server.register(websocket, {
  options: { maxPayload: 1048576 }
});


type socketMessage = {
  type: 'hello' | 'device-name' | 'webrtc-offer' | 'webrtc-answer' | 'webrtc-candidate'
  data?: {
    ipLocal?: string;
    uuid?: string;
    name?: string;
    target?: string;
    offer?: any;
    answer?: any;
    candidate?: any;
  }
}

type Connection = {
  socket: WebSocket;
  userId: string;
  ip: string;
  ipLocal: string;
  deviceInfo: {
    device: string;
    browser: string;
    os: string;
  };
  name?: string;
}

const connections = new Map<string, Connection>();

function notifyUsersOnSameIp(newUser: Connection) {
  // Send existing users to new user
  const usersOnSameIp = Array.from(connections.values())
    .filter(conn => conn.ip === newUser.ip && conn.userId !== newUser.userId);

  if (usersOnSameIp.length > 0) {
    const existingUsers = {
      type: 'existing-users',
      users: usersOnSameIp.map(u => ({
        userId: u.userId,
        deviceInfo: u.deviceInfo,
        name: u.name,
        ipLocal: u.ipLocal
      }))
    };
    newUser.socket.send(JSON.stringify(existingUsers));
  }

  // Notify existing users about new user
  const newUserInfo = {
    type: 'new-user',
    user: {
      userId: newUser.userId,
      deviceInfo: newUser.deviceInfo,
      name: newUser.name,
      ipLocal: newUser.ipLocal
    }
  };

  usersOnSameIp.forEach(conn => {
    conn.socket.send(JSON.stringify(newUserInfo));
  });
}

server.register(async function (fastify) {
  server.get('/ws', { websocket: true }, (socket: WebSocket, req: FastifyRequest) => {
    
    socket.onclose = () => {
      // Remove connection when user disconnects
      const userId = Array.from(connections.entries())
        .find(([_, conn]) => conn.socket === socket)?.[0];
      
      if (userId) {
        const disconnectedUser = connections.get(userId);
        connections.delete(userId);

        // Notify others about disconnection
        if (disconnectedUser) {
          Array.from(connections.values())
            .filter(conn => conn.ip === disconnectedUser.ip)
            .forEach(conn => {
              conn.socket.send(JSON.stringify({
                type: 'user-disconnected',
                userId
              }));
            });
        }
      }
    };

    socket.onmessage = (event: MessageEvent) => {
      const messageStrign = event.data.toString();
      let message: socketMessage

      try {
        message = JSON.parse(messageStrign) as socketMessage
      } catch (error) {
        socket.close(1003, 'Invalid JSON message');
        return;
      }

      switch (message.type) {
        case 'hello':
          const userAgent = new UAParser(req.headers['user-agent']).getResult();
          const userId = crypto.randomUUID();
          const ip = req.headers['x-forwarded-for'] as string || req.ip;
          const ipLocal = message.data?.ipLocal || 'unknown';
          const initialName = message.data?.name || 'unknown';

          const connection: Connection = {
            socket,
            userId,
            ip,
            ipLocal,
            deviceInfo: {
              device: userAgent.device.type || 'unknown',
              browser: userAgent.browser.name || 'unknown',
              os: userAgent.os.name || 'unknown'
            },
            name: initialName
          };

          connections.set(userId, connection);
          
          const connectionInfo = {
            type: 'connection',
            userId,
            device: connection.deviceInfo.device,
            browser: connection.deviceInfo.browser,
            os: connection.deviceInfo.os,
            ip,
            ipLocal,
            name: initialName
          };

          socket.send(JSON.stringify(connectionInfo));
          notifyUsersOnSameIp(connection);
          break;

        case 'device-name':
          if (!message.data) return;
          const { uuid, name } = message.data;
          const conn = connections.get(uuid!);
          if (conn) {
            conn.name = name;
            // Notify others about name update
            Array.from(connections.values())
              .filter(c => c.ip === conn.ip && c.userId !== uuid)
              .forEach(c => {
                c.socket.send(JSON.stringify({
                  type: 'user-renamed',
                  userId: uuid,
                  name
                }));
              });
          }
          break;

        case 'webrtc-offer':
          
          break;

        case 'webrtc-answer':
          
          break;

        case 'webrtc-candidate':
          
          break;

        default:
          socket.close(1003, 'Invalid JSON message');
          break;
      }
    }

  })
})

// Rota de exemplo
server.get('/ping', async (request, reply) => {
  return 'pong\n';
});

// Inicia o servidor
server.listen({ port: 8080, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Servidor rodando em ${address}`);
});
