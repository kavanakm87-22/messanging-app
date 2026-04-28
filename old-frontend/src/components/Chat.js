import React, { useState } from 'react';

function Chat({ username }) {
  // State to hold our list of messages and the current message being typed
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");

  // Function to handle sending a message
  const sendMessage = () => {
    if (currentMessage.trim() !== "") {
      setMessages([...messages, { author: username, text: currentMessage }]);
      setCurrentMessage(""); // Clear the input box after sending
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", fontFamily: "sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>Welcome to the chat, {username}!</h2>
      
      {/* Chat Window */}
      <div style={{ 
        border: "1px solid #ccc", 
        borderRadius: "8px",
        height: "300px", 
        padding: "15px", 
        marginBottom: "15px",
        overflowY: "auto",
        backgroundColor: "#f9f9f9"
      }}>
        {messages.length === 0 ? (
          <p style={{ color: "#888", textAlign: "center" }}>No messages yet. Start chatting!</p>
        ) : (
          messages.map((msg, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <strong>{msg.author}: </strong> 
              <span>{msg.text}</span>
            </div>
          ))
        )}
      </div>

      {/* Input Area */}
      <div style={{ display: "flex", gap: "10px" }}>
        <input
          type="text"
          value={currentMessage}
          onChange={(e) => setCurrentMessage(e.target.value)}
          placeholder="Type a message..."
          style={{ 
            flex: 1, 
            padding: "10px", 
            borderRadius: "5px", 
            border: "1px solid #ccc" 
          }}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Send on Enter key
        />
        <button 
          onClick={sendMessage} 
          style={{ 
            padding: "10px 20px", 
            backgroundColor: "#007bff", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default Chat;