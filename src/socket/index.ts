import { Server, Socket } from 'socket.io'; // Note: you'll need standard socket.io types

export const setUpSocket = (io: Server) => {
  console.log('Setting up Socket.IO events...');

  io.on('connection', (socket: Socket) => {
    console.log('New client connected:', socket.id);

    // Join a specific conversation room
    socket.on('join-conversation', (conversationId: string) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined conversation ${conversationId}`);
    });

    // Handle sending a message
    socket.on('send-message', (data: { conversationId: string; message: any }) => {
      // Broadcast to everyone in the conversation EXCEPT the sender
      // Actually we just broadcast to the room, or io.to(roomId)
      io.to(data.conversationId).emit('receive-message', data.message);
      
      // Also broadcast to the 'admin-monitoring' room
      io.to('admin-monitoring').emit('admin-intercept', data);
    });

    // Typing indication
    socket.on('typing', (data: { conversationId: string; user: string }) => {
      socket.broadcast.to(data.conversationId).emit('user-typing', data.user);
    });

    socket.on('stop-typing', (data: { conversationId: string; user: string }) => {
      socket.broadcast.to(data.conversationId).emit('user-stop-typing', data.user);
    });

    // Admin monitoring joining
    socket.on('join-admin', () => {
      socket.join('admin-monitoring');
      console.log(`Admin joined monitoring: ${socket.id}`);
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected:', socket.id);
    });
  });
};
