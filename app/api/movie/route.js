
import '@/lib/db'
import UserSchema from '@/schema/movie.schema'

 import { NextResponse as res} from "next/server"

 export const POST = async (request)=>{
  try{
     const body = await request.json()
    //  return res.json(body)
    const user = new UserSchema(body)
    await user.save()
    return res.json({success:true})
  }
  catch (err){
       return res.json(
        {
          success: false, message :err
        },
        {
          status:500
        }
       )
  }
}


export const GET = async () => {
  const users = await UserSchema.find().select('-password');
  return res.json({ success: true, users });
};
