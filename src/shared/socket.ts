import { io, Socket } from "socket.io-client";

// socket.ts
let socket: Socket | null = null;

export const connectSocket = () => {
  if (socket?.connected) return socket; // reuse existing

  const token = localStorage.getItem("accessToken");

  socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
    withCredentials: true,
    auth: { token },
    transports: ["websocket", "polling"], // ← add this
  });

  return socket;
};

export { socket };