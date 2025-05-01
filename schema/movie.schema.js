import mongoose, { Schema} from "mongoose";
// import bcrypt from 'bcrypt';
const userSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  dec: {
    type: String,
    required: true,
    trim: true,
    
  },
  img: {
    type: String,
    required: true,
    trim: true,
  },
  link: {
    type: String,
    required: true,
    trim: true,
  },
  quality1: {
    type: String,
    // required: true,
    trim: true,
  },
  quality2: {
    type: String,
    // required: true,
    trim: true,
  },
  quality3: {
    type: String,
    // required: true,
    trim: true,
  },
  genra: {
    type: String,
    // required: true,
    trim: true,
  },
});


mongoose .models ={}
// userSchema.pre("save", async function(next){

//    const encrypted = await bcrypt.hash(this.password.toString, 12)
//  this.password=encrypted
//    next()
// })


// userSchema.pre("save", async function (next) {
  

//   const encrypted = await bcrypt.hash(this.password.toString(), 12);
//   this.password = encrypted;
//   next();
// });



const UserSchema = mongoose.model("movies", userSchema)




export default UserSchema;
