import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name : String,
  message : String,
  date : { type: Date, default: Date.now }  
})

export default mongoose.model("User",userSchema);