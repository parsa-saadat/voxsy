import http from 'http'
import path from 'path';
import { fileURLToPath } from 'url';

import { config } from 'dotenv';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { Server } from 'socket.io';

import routes from './routes/index.js';
import morganMiddleware from './middlewares/log/morgan.middleware.js';
import corsOptions from './configs/cros.config.js';
import createLimiter from './middlewares/safety/ratelimiter.middleware.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

config();

const app = express();
const server = http.createServer(app);

export const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  const resiverId = socket.handshake.query.userId
  console.log('Client connected successfully ' + resiverId);
});

const rateLimiter = createLimiter({ windowMs: 15 * 60 * 1000, max: 200 });

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(helmet());

app.use(cors(corsOptions));

app.use(morganMiddleware);

app.use(rateLimiter, routes);
app.use(rateLimiter, express.static(path.join(__dirname, 'public')))

const port = process.env.PORT || 3000;
const host = process.env.HOST || 'localhost';

server.listen(port, host, () => {
  console.log(`Server is running on ${host}:${port}`);
});

export { __dirname, __filename }