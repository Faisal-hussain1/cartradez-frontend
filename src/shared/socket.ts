import { io, Socket } from "socket.io-client";

let socket: Socket;

export const connectSocket = () => {
  const token = localStorage.getItem("accessToken");

  socket = io(
    process.env.NEXT_PUBLIC_SERVER_URL,
    {
      withCredentials: true,
      auth: {
        token,
      },
    }
  );

  return socket;
};

export { socket };