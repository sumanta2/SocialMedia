import UserModel from "../Models/userModel.js";  //if here does not provide .js as extension it generate error 
import { UserSchema } from "../Models/userModel.js";
import socket from "../index.js"
import PostModel from "../Models/postModel.js"; 
import CommentModel from "../Models/CommentModel.js";
import ChatModel from "../Models/ChatModel.js";
import MessageModel from "../Models/MessageModel.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";

//get all User

export const getAllUsers= async (req,res)=>{
    try {
        let users= await UserModel.find()          //it return maximum first 20 document

        users=users.map((user)=>{
            const {password ,...otherDetails}= user._doc
            return otherDetails
        })
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json(error)
    }
}


//get a User

export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const user = await UserModel.findById(id)
        if(user)
        {
            const {password , ...otherDetails }=user._doc    //here _doc indicate all the date present in user object which assign to another variable
            res.status(200).json(otherDetails)
        }
        else{
            res.status(404).json("No such User Exists")
        }
        
    } catch (error) {
        res.status(500).json(error)
    }
}

export const updateUser= async (req,res)=>{
    const id=req.params.id 
    const {_id,currentUserAdminStatus,password}=req.body
    if(id=== _id)
    {
        
        try {
            if (password)
            {
                const salt= await bcrypt.genSalt(10)
                req.body.password=await bcrypt.hash(password,salt)
            }
            const user= await UserModel.findByIdAndUpdate(id,req.body,{new:true})
            const token= jwt.sign(
                {username:user.username,id:user._id},
                process.env.JWT_KEY,{expiresIn:"1h"}
            );
            res.status(200).json({user,token})
        } catch (error) {
                res.status(500).json(error)
        }
    }
    else{
        res.status(403).json("Access Denied! You can update Only Your own password")
    }
}


// //Delete User

// export const DeleteUser = async (req,res)=>{
//     const id=req.params.id
//     const {currentUserId,currentUserAdminStatus}=req.body
//     if(currentUserId || currentUserAdminStatus)    //here currentUserId does not get proper value from middleware need check if used
//     {
//         try {
//             await UserModel.findByIdAndDelete(id)
//             res.status(200).json("User deleted successfully")
//         } catch (error) {
//             res.status(500).json(error)
            
//         }
//     }
//     else{
//         res.status(403).json("Access Denied! You can Delete Only Your own password")
//     }
// }

//delete an user's account an delete all post share by him and delete all comments present on his shared post
// delete from live user's list try remove if anyone follow you or you follow anyone ##This feature i will add letter
export const DeleteUser = async (req, res) => {
    
    const id = req.params.id;
    try {
        const postIdsPromise = PostModel.find({ userId: id }).distinct('_id');
        const chatIdsPromise = ChatModel.find({ members: { $in: id } }).distinct('_id');

        const [postIds, chatIds] = await Promise.all([postIdsPromise, chatIdsPromise]);

        
        const promises = [
            CommentModel.deleteMany({ contentId: { $in: postIds } }).catch(err => { throw err }),
            PostModel.deleteMany({ userId: id }).catch(err => { throw err }),
            MessageModel.deleteMany({ chatId: { $in: chatIds } }).catch(err => { throw err }),
            ChatModel.deleteMany({ _id: { $in: chatIds } }).catch(err => { throw err }),
            //UserModel.findByIdAndDelete(id).catch(err => { throw err }),
        ];
        await Promise.all(promises);
        socket.emit("new-user-delete", id);// here i make a socket request to socket server to delete liveUsers data
        res.status(200).json({delete: true});

        
    } catch (error) {
        console.log(error)
        res.status(500).json({error})

    }
}

//Follow a User

export const followUser= async (req,res)=>{
    const id=req.params.id 
    const {_id}=req.body
    if(_id === id)
    {
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser= await UserModel.findById(id)
            const followingUser=await UserModel.findById(_id)
            if(!followUser.followers.includes(_id))
            {
                await followUser.updateOne({$push:{followers:_id}})
                await followingUser.updateOne({$push:{following:id}})
                res.status(200).json("User Followed!")
            }
            else{
                res.status(403).json("User is Already Following by You!")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


//UnFollow a User

export const UnFollowUser= async (req,res)=>{
    const id=req.params.id 
    const {_id}=req.body
    if(_id === id)
    {
        res.status(403).json("Action forbidden")
    }
    else{
        try {
            const followUser= await UserModel.findById(id)
            const followingUser=await UserModel.findById(_id)
            if(followUser.followers.includes(_id))
            {
                await followUser.updateOne({$pull:{followers:_id}})
                await followingUser.updateOne({$pull:{following:id}})
                res.status(200).json("User UnFollowed!")
            }
            else{
                res.status(403).json("User is Not Followed by You!")
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}