import app from './app'
import { config, logger } from './config'
import 'colors'
import { Server } from 'socket.io'
import { configCors } from './config/cors'
import { User } from './models'

// Run app
const server = app.listen(
  config.port,
  logger.info(
    `Server running in ${config.env} mode on port ${config.port}`.cyan.underline
  )
)

const EVENTS = {
  setup: 'set_up',
  connected: 'connected',
  joinChat: 'join_chat',
  newMessage: 'new_message',
  messageReceived: 'message_received',
  typing: 'typing',
  stopTyping: 'stop_typing',
  renameChat: 'rename_chat',
}

// Socket
const io = new Server(server, {
  pingTimeout: 60000,
  cors: {
    origin: 'http://localhost:3000',
  },
})
io.on('connection', socket => {
  // logger.info('Connected to socket io.')

  // Setup
  socket.on(EVENTS.setup, user => {
    socket.join(user.id)
    logger.info(`user ${user.id}`)
    socket.emit(EVENTS.connected)
  })

  // Join chat
  socket.on(EVENTS.joinChat, chat => socket.join(chat))

  // Rename chat
  socket.on(EVENTS.renameChat, ({ chatId, newChatName }) =>
    socket.to(chatId).emit(EVENTS.renameChat, { chatId, newChatName })
  )

  // Typing
  socket.on(EVENTS.typing, room => socket.to(room).emit(EVENTS.typing))
  socket.on(EVENTS.stopTyping, room => socket.to(room).emit(EVENTS.stopTyping))

  // New message
  socket.on(EVENTS.newMessage, message => {
    const chat = message.chat

    if (!chat.users) return logger.error('chat.users not defined.')

    chat.users.forEach(user => {
      if (user === message.sender.id) return

      socket.to(user).emit(EVENTS.messageReceived, message)
    })
  })
})

// Handle unhandled promise rejections
const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed')
      process.exit(1)
    })
  } else {
    process.exit(1)
  }
}

const unexpectedErrorHandler = error => {
  logger.error(error)
  exitHandler()
}

process.on('uncaughtException', unexpectedErrorHandler)
process.on('unhandledRejection', unexpectedErrorHandler)

process.on('SIGTERM', () => {
  logger.info('SIGTERM received')
  if (server) {
    server.close()
  }
})
