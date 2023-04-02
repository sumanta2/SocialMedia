import mongoose from "mongoose"
const postSchema= mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users' },
    desc:String,
    likes:[],
    image:String,
    hashtags:[],

    
},{
    timestamps:true
});

var PostModel=mongoose.model("Posts",postSchema)

export default PostModel;