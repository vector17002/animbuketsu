import mongoose from "mongoose";
const WishListSchema = new mongoose.Schema({
     user:{
        type: String,
        required:[true , 'User is required']
     },
     animeImg:{
        type:String,
        required: [true , 'Image is required'],
     },
     animeName:{
        type: String,
        required: [true , 'Name is required']
     },
     episodes:{
       type: Number,
       required: [true , 'Episodes are required']
     },
     completed:{
      type:Number,
      default: 0
     },
     status:{
        type: Number,
        default :-1
     }
})
const WishList = mongoose.models.WishList || mongoose.model("WishList" , WishListSchema);
export default WishList;