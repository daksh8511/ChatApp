import express from 'express'
import { CheckAuth, Login, Logout, Signup, UpdateProfile } from '../controller/auth.controller.js';
import { protectRoute } from '../middleware/auth.middleware.js';

const authRoutes = express.Router()

authRoutes.post('/signup', Signup)
authRoutes.post('/login', Login)
authRoutes.post('/logout', Logout)

authRoutes.put('/update_profile', protectRoute ,UpdateProfile)

authRoutes.get('/check', protectRoute, CheckAuth)

export default authRoutes;