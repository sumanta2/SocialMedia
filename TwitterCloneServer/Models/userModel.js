import mongoose from "mongoose"

 export const  UserSchema=mongoose.Schema(
    {
        username:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        firstname:{
            type:String,
            required:true
        },
        lastname:{
            type:String,
            required:true
        },
        isAdmin:{
            type:Boolean,
            default:false
        },
        profilePicture:String,
        coverPicture:String,
        about:String,
        livesin:String,
        worksAt:String,
        relationship:String,
        country:String,
        followers:[],
        following:[],
    },
    {timestamps:true}         //it automatically create the createdAt and updatedAt field 
)

const UserModel=mongoose.model("Users",UserSchema)

export default UserModel;