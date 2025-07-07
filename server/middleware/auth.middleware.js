import jwt from 'jsonwebtoken'
import UserModel from '../models/user.model.js';

export const protectRoute = async (req,res,next) => {
    try {
        const token = req.cookies.jwt;

        if(!token){
            return res.status(401).json({success : false, message : "Unauthorized - No Token Provided"})
        }
        
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        if(!decoded){
            return res.status(401).json({success : false, message : "Unauthorized - No Token Provided"})
        }
        
        const user  = await UserModel.findById(decoded.userId).select("-password");
        
        if(!user){
            return res.status(401).json({success : false, message : "User Not Found"})
        }

        req.user = user

        next()

    } catch (error) {
        console.log("Error in protectRoute : ", error.message)
    }
}