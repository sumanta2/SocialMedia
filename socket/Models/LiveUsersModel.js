const mongoose= require('mongoose');
const LiveUsersSchema = mongoose.Schema(
    {
        online: {type:String,required:true},
        userId: {type:String,required:true},
        socketId: {type:String,required:true},
        lastSeen: {type:String},
        timeDiff: {type:Number},
    }
)

const LiveUsersModel = mongoose.model("LiveUsers", LiveUsersSchema)

module.exports= LiveUsersModel;  //it is es5 format so i write module.exports instead of export default LiveUsersModel

