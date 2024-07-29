import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';

const useSocket = (): typeof Socket | null => {
  const [socket, setSocket] = useState<typeof Socket | null>(null);

  useEffect(() => {
    const socketIo = io();

    setSocket(socketIo);

    return () => {
      socketIo.disconnect();
    };
  }, []);

  return socket;
};

export default useSocket;
