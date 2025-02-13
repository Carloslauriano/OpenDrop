import fastify from 'fastify';
import websocket from '@fastify/websocket';


const server = fastify();

// Registra o plugin de WebSocket
server.register(websocket,{
  options: { maxPayload: 1048576 }
});

server.register(async function (fastify) {
  server.get('/ws', { websocket: true }, (socket /* WebSocket */, req /* FastifyRequest */) => {
    socket.on('message', message => {
      // message.toString() === 'hi from client'
      socket.send('hi from server')
    })
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
