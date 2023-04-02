import mongoose from "mongoose"
const hashtagSchema= mongoose.Schema({
    hashtag:{type:String,required:true},
    userId:{ type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    postId:{ type: mongoose.Schema.Types.ObjectId, ref: 'posts' },
},{
    timestamps:true
});

var HashTagModel=mongoose.model("hashtags",hashtagSchema)

export default HashTagModel;