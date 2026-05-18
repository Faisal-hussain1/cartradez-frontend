import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export const connectSocket = (): Socket => {
  if (socket?.connected) return socket; // reuse existing

  const token = localStorage.getItem("accessToken");

  socket = io(process.env.NEXT_PUBLIC_SERVER_URL!, {
    withCredentials: true,
    auth: { token },
    transports: ["websocket"], // force WebSocket only
    path: "/socket.io",        // optional, default is fine
    reconnectionAttempts: 5,   // limit reconnect attempts
  });

  socket.on("connect_error", (err) => {
    console.error("Socket connection failed:", err.message);
  });

  return socket;
};
