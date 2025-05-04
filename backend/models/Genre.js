import mongoose from "mongoose";


const Schema =  mongoose.Schema

const genreSchema = new Schema (
    {
        name:{
            type:String,
            trim:true,
            required:true,
            maxLength:32,
            unique:true
        }
    }
)

const Genre = mongoose.model("Genre",genreSchema)

export default Genre