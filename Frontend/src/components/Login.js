import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/login', { username, password });
      localStorage.setItem('token', response.data.token);
      navigate('/chat');
    } catch (error) {
      alert('Kirish muvaffaqiyatsiz!');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Kirish</h1>
      <input
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Foydalanuvchi nomi"
        style={styles.input}
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Parol"
        style={styles.input}
      />
      <button onClick={handleLogin} style={styles.button}>
        Kirish
      </button>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  },
  input: {
    padding: '10px',
    margin: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '300px',
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

export default Login;
