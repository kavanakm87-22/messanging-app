import React, { useState } from "react";
import { Search, Send, MoreVertical } from "lucide-react";

function App() {
  const [selectedChat, setSelectedChat] = useState(0);
  const [message, setMessage] = useState("");

  const chats = [
    {
      name: "John Doe",
      status: "Online",
      messages: [
        { sender: "them", text: "Hey! How are you?" },
        { sender: "me", text: "I'm good! What about you?" },
      ],
    },
    {
      name: "Sophia",
      status: "Offline",
      messages: [
        { sender: "them", text: "Did you complete the project?" },
        { sender: "me", text: "Yes, almost done!" },
      ],
    },
  ];

  const sendMessage = () => {
    if (message.trim() !== "") {
      chats[selectedChat].messages.push({ sender: "me", text: message });
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-r from-indigo-100 to-purple-100">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-lg flex flex-col">
        <div className="p-4 text-2xl font-bold text-indigo-600 border-b">
          ChatApp
        </div>

        {/* Search */}
        <div className="p-3">
          <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
            <Search className="text-gray-500" size={20} />
            <input
              type="text"
              placeholder="Search chats..."
              className="bg-transparent outline-none ml-2 w-full"
            />
          </div>
        </div>

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat, index) => (
            <div
              key={index}
              onClick={() => setSelectedChat(index)}
              className={`p-4 cursor-pointer border-b hover:bg-indigo-50 ${
                selectedChat === index ? "bg-indigo-100" : ""
              }`}
            >
              <h2 className="font-semibold">{chat.name}</h2>
              <p
                className={`text-sm ${
                  chat.status === "Online"
                    ? "text-green-500"
                    : "text-gray-400"
                }`}
              >
                {chat.status}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Window */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white shadow-md p-4 flex justify-between items-center">
          <div>
            <h2 className="font-bold text-lg">
              {chats[selectedChat].name}
            </h2>
            <p className="text-sm text-gray-500">
              {chats[selectedChat].status}
            </p>
          </div>
          <MoreVertical className="text-gray-600 cursor-pointer" />
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-3">
          {chats[selectedChat].messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-xs px-4 py-2 rounded-2xl shadow ${
                msg.sender === "me"
                  ? "bg-indigo-500 text-white ml-auto"
                  : "bg-white text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 bg-white flex items-center gap-2 shadow-inner">
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-1 border rounded-full px-4 py-2 outline-none"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button
            onClick={sendMessage}
            className="bg-indigo-500 hover:bg-indigo-600 text-white p-3 rounded-full"
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;