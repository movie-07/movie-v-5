import { NextResponse as res } from "next/server"
import UserSchema from "@/schema/movie.schema"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const getToken =(payload)=>{
   const accessToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET,{expiresIn:'15m'})
   const refreshToken = jwt.sign(payload,process.env.ACCESS_TOKEN_SECRET_TOKEN_SECRET,{expiresIn:'7d'})
   return {
    accessToken,
    refreshToken
   }
}


export const POST =async (request ) =>{
    try{
        const {email,password}= await request.json()
        const user = await UserSchema.findOne({email})
        if(!user)
            return res.json({success:false , message: 'lowra email thek dai naholy agy account bany aii'},
             {status: 404 }
    )
    const isLogin =await bcrypt.compare(password, user.password)
    if(!isLogin)
        return res.json({success:false , message: 'vsdk password thek kory daii'},
            {status: 401 }
   )
   const token = getToken({
    _id:user._id,
    fullname:user.fullname,
    email: user.email
   })
   console.log(token)
   return res.json({success:true})
    }
    catch(err)
    { 
        return res.json({success:false},
            {status: 500}
        )
    }
}