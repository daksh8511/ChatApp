import express from 'express'
import { protectRoute } from '../middleware/auth.middleware.js';
import { getMessage, getUserForSidebar, sendMessage } from '../controller/message.controller.js';

const messageRoutes = express.Router()

messageRoutes.get('/users', protectRoute, getUserForSidebar)
messageRoutes.get('/:id', protectRoute, getMessage)

messageRoutes.post('/send/:id', protectRoute, sendMessage)


export default messageRoutes;