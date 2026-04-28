// App.jsx
import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import './App.css'; // Make sure this is imported!

// Connect to your Node.js backend
const socket = io.connect("http://localhost:3001");

function App() {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const messagesEndRef = useRef(null);

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageList((list) => [...list, data]);
    });

    // Cleanup listener on component unmount
    return () => socket.off("receive_message");
  }, []);

  // Auto-scroll to the newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messageList]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (currentMessage !== "") {
      const messageData = {
        id: Math.random().toString(36).substring(7),
        senderId: socket.id,
        text: currentMessage,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      await socket.emit("send_message", messageData);
      setCurrentMessage(""); // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <h2>Live Chat</h2>
        </div>
        
        <div className="chat-body">
          {messageList.map((msgContent) => {
            const isMe = msgContent.senderId === socket.id;
            return (
              <div key={msgContent.id} className={`message-row ${isMe ? "you" : "other"}`}>
                <div className="message-content">
                  <p>{msgContent.text}</p>
                  <span className="time-stamp">{msgContent.time}</span>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>

        <form className="chat-footer" onSubmit={sendMessage}>
          <input
            type="text"
            value={currentMessage}
            placeholder="Type a message..."
            onChange={(event) => setCurrentMessage(event.target.value)}
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default App;