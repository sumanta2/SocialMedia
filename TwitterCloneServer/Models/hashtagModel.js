import mongoose from "mongoose"
const hashtagSchema= mongoose.Schema({
    hashtag:{type:String,required:true},
    userId:{type:String,required:true},
    postId:{type:String,required:true},
},{
    timestamps:true
});

var HashTagModel=mongoose.model("hashtags",hashtagSchema)

export default HashTagModel;