import mongoose from "mongoose";
const bookSchema = mongoose.Schema({
  title:{
    type:String,
    required: true,
  },
  author:{
    type:String,
    required : true,
  },
  publishYear : {
    type:Number,
  }

},
{
    timestamps : true,
}
);


export const Books = mongoose.model('Cat',bookSchema );