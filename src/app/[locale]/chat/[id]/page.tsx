"use client";

import { useEffect, useState, useRef } from "react";
import { Send } from "lucide-react";
import { useGetUserById } from "@/shared/hooks/useUserById";
import { useGetMessages } from "@/shared/hooks/useGetMessages";
import { connectSocket } from "@/shared/socket";
import { useSelector } from "react-redux";
import { getCurrentUser } from "@/shared/redux/slices/users";
import { useParams } from "next/navigation";

export default function ChatPage() {
  const currentUser = useSelector(getCurrentUser);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);

  console.log(message);
  const socketRef = useRef<any>(null);
  const params=useParams();
  const { user } = useGetUserById(params.id);
  const { messages: fetchedMessages } = useGetMessages(
    params.id,
    currentUser?._id
  );


  /* ================= RESET CHAT ================= */
 useEffect(() => {
  if (fetchedMessages && fetchedMessages.length > 0) {
    setMessages((prevMessages) => {
      // 🔥 merge only if there are new messages
      const newMessages = fetchedMessages.filter(
        (msg:any) => !prevMessages.some((existingMsg) => existingMsg._id === msg._id)
      );

      // Only update state if there are new messages
      if (newMessages.length > 0) {
        return [...prevMessages, ...newMessages];
      }
      return prevMessages; // no change if no new messages
    });
  }
}, [fetchedMessages]); // Depend only on fetchedMessages

  /* ================= SOCKET ================= */
  useEffect(() => {
  if (!currentUser?._id) return;

  socketRef.current?.disconnect(); // 🔥 prevent duplicate

  socketRef.current = connectSocket();

  socketRef.current.on("messagesUpdated", (msgs: any[]) => {
  setMessages(msgs);
});

  socketRef.current.on("onlineUsers", (users: string[]) => {
    setOnlineUsers(users);
  });

  socketRef.current.emit("markAsRead", {
    from: params.id,
  });

  return () => {
    socketRef.current?.off("receiveMessage");
    socketRef.current?.off("messageSent");
    socketRef.current?.off("onlineUsers");
    socketRef.current?.disconnect();
  };
}, [currentUser?._id, params.id]);

  /* ================= SEND ================= */
  const handleSend = () => {
    if (!message.trim()) return;

    console.log("Message Sent")
    socketRef.current.emit("sendMessage", {
      to: params.id,
      message,
    });

    setMessage("");
  };

  /* ================= ONLINE STATUS ================= */
  const isOnline = onlineUsers.includes(params?.id as string);

  /* ================= TIME FORMAT ================= */
  const formatTime = (date: string) => {
    if (!date) return "";
    return new Date(date).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">

      {/* HEADER */}
      <div className="flex items-center gap-3 p-4 border-b bg-white">
        <div className="relative">
          <img
            src={user?.profileImage || "/images/avatar-default.jpeg"}
            className="w-8 h-8 rounded-full"
          />

          {/* 🔥 ONLINE DOT */}
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border border-white" />
          )}
        </div>

        <div>
          <p className="text-sm font-semibold">
            {user?.firstName || "Loading..."}
          </p>
          <p className="text-xs text-gray-500">
            {isOnline ? "Online" : "Offline"}
          </p>
        </div>
      </div>

      {/* CHAT */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((msg, index) => {
          const isMine =
            (typeof msg.from === "object"
              ? msg.from._id
              : msg.from
            )?.toString() === currentUser?._id?.toString();

          return (
            <div
              key={index}
              className={`max-w-[75%] px-4 py-2 rounded-lg text-sm ${
                isMine
                  ? "ml-auto bg-primary text-white"
                  : "bg-white border"
              }`}
            >
              <p>{msg.message}</p>

              {/* 🔥 TIME */}
              <span className="text-[10px] opacity-70 block text-right">
                {formatTime(msg.createdAt)}
              </span>
            </div>
          );
        })}
      </div>

      {/* INPUT */}
     <div className="p-3 w-20 border-t bg-white flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none"
        />

        <button
          onClick={handleSend}
          className="bg-primary text-white px-4 rounded-lg flex items-center justify-center"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
}