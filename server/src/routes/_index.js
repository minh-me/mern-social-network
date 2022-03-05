import { Router } from 'express'
import authRoutes from './auth.route'
import userRoutes from './user.route'
import uploadRoutes from './upload.route'
import chatRoutes from './chat.route'
import postRoutes from './post.route'
import notificationRoutes from './notification.route'
import messageRoutes from './message.route'
import commentRoutes from './comment.route'

const router = new Router()

const defaultRoutes = [
  {
    path: '/chats',
    route: chatRoutes,
  },
  {
    path: '/posts',
    route: postRoutes,
  },
  {
    path: '/comments',
    route: commentRoutes,
  },
  {
    path: '/notifications',
    route: notificationRoutes,
  },
  {
    path: '/messages',
    route: messageRoutes,
  },
  {
    path: '/uploads',
    route: uploadRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/users',
    route: userRoutes,
  },
]

defaultRoutes.forEach(route => {
  router.use(route.path, route.route)
})

export default router
