require('dotenv').config();
const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(express.json());

// MongoDB ulanishi
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.log("MongoDB connection error:", err));

const MessageSchema = new mongoose.Schema({
  user: String,
  text: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', MessageSchema);

// Socket.io eventlar
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('sendMessage', async (data) => {
    const message = new Message(data);
    await message.save();
    io.emit('receiveMessage', message);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

// API endpoint
app.get('/api/messages', async (req, res) => {
  const messages = await Message.find().sort({ timestamp: -1 });
  res.json(messages);
});

// PORT uchun `process.env.PORT` dan foydalanamiz
const PORT = process.env.PORT || 8000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
