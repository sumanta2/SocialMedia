import mongoose from "mongoose"
const hashtagSchema= mongoose.Schema({
    _id:{type:String,required:true},
    count: Number,
},{
    timestamps:true
});

var HashTagModel=mongoose.model("hashtags",hashtagSchema)

export default HashTagModel;