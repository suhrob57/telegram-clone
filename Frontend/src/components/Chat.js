import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';

const socket = io('http://localhost:5000');

function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    socket.on('receiveMessage', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    axios.get('http://localhost:5000/api/messages')
      .then((response) => setMessages(response.data));
  }, []);

  const sendMessage = () => {
    socket.emit('sendMessage', { user: 'Me', text: input });
    setInput('');
  };

  return (
    <div style={styles.chatContainer}>
      <div style={styles.messagesContainer}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        ))}
      </div>
      <div style={styles.inputContainer}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
          placeholder="Xabar yozing..."
        />
        <button onClick={sendMessage} style={styles.button}>
          Yuborish
        </button>
      </div>
    </div>
  );
}

const styles = {
  chatContainer: {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
    padding: '10px',
    backgroundColor: '#f0f0f0',
  },
  messagesContainer: {
    flex: 1,
    overflowY: 'auto',
    marginBottom: '10px',
  },
  message: {
    backgroundColor: '#fff',
    padding: '10px',
    borderRadius: '5px',
    marginBottom: '10px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  inputContainer: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Chat;
