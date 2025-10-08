# Chat App - Real-time Messaging Application

A modern and powerful chat application with real-time communication capabilities

![Banner](https://uploaded.photo/2025/10/08/8161cf516d8ece3d4b22ef6b144708a6.png)

## 🚀 Key Features

- **Real-time Chat** with WebSocket technology
- **Multimedia Support** - Send images, videos, and audio
- **Modern & Responsive** UI
- **Secure Authentication** with JWT
- **Multiple Theme** support
- **Chat History** with persistent storage

## 🛠 Technologies

### Backend
- **Node.js** - Server runtime environment
- **Express.js** - Web framework
- **Socket.io** - Real-time communication

### Frontend
- **Vite + React** - Modern frontend build
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Databases
- **MongoDB** - Main data storage
- **Redis** - Cache and sessions

## 📦 Core Packages

- `mongodb` - MongoDB connection
- `redis` - Redis connection
- `socket.io` - WebSocket implementation
- `jsonwebtoken` - Authentication management
- `bcrypt` - Password encryption

## 🎯 Project Purpose

This project was created as a learning challenge to master Socket.io and develop a complete chat application. Main focus areas:

- Learning real-time communication concepts
- Working with modern technologies
- Implementing scalable architecture
- Developing Full-Stack skills

## 🏗 Project Structure

```
chat-app/
├── backend/          # Main server
├── frontend/
    ├── app/         # Chat application
    └── landing/     # Landing page
```

## 🚀 Setup & Installation

### Prerequisites
- Node.js (version 18 or higher)
- MongoDB
- Redis

### Installation & Running

#### Backend
```bash
cd backend
npm install
cp .env.example .env
# Configure environment variables in .env file
npm run dev
```

#### Frontend (Application)
```bash
cd frontend/app
npm install
npm run dev
```

#### Frontend (Landing Page)
```bash
cd frontend/landing
npm install
npm run dev
```

## ⚙ Configuration

Configure the `.env` file with appropriate values:

```env
# Main Settings
STATUS=DEV
PORT=3000
CLIENT_URL=http://localhost:5173

# Databases
MONGO_URI=mongodb://localhost:27017/
MONGO_DATABASE_NAME=chat_app
REDIS_URL=redis://127.0.0.1:6379

# Security
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=30d

# Files
MAX_MB_UPLOAD_SIZE=10
ALLOWED_MIME_TYPES=image/jpeg,image/png,image/gif,video/mp4,audio/mpeg

# SMS (Optional)
KAVENEGAR_API_KEY=your-api-key
KAVENEGAR_SENDER_NUMBER=your-sender-number

# Email (Optional)
MAIL_SERVICE=gmail
MAIL_USER=your-email@gmail.com
```

## 📱 Access Points

- **Chat Application**: http://localhost:4000
- **Landing Page**: http://localhost:4001
- **API Server**: http://localhost:3000

## 🔧 Development

### Available Scripts
```bash
npm run dev      # Development mode
npm run build    # Build project
npm run start    # Production mode
npm run test     # Run tests
```

## 🤝 Contribution

This educational project is designed for programming skill development. To contribute:

1. Fork the project
2. Create a new branch
3. Commit your changes
4. Submit a pull request

## 📄 License

This project is released under the MIT License.

---

**Built with ❤️ for learning and new challenges**