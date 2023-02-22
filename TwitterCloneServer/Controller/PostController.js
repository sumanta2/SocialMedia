import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js"
import HashTagModel from "../Models/hashtagModel.js";
import mongoose from "mongoose";
import fs from "fs";

const path= "./public/images/";

//Create new Post

export const createPost = async (req, res) => {
    const hashtags = fetchHashTags(req.body.desc) //populates if there are any hastags in the post
    req.body.hashtags = hashtags

    const newPost = new PostModel(req.body)
    try {

        await newPost.save()

        for (let hashtag in hashtag){
            await HashTagModel.find({_id: hashtag}, function (err, docs){
                if (docs.length){
                    HashTagModel.updateOne(docs, {_id: hashtag, count: docs.count+1 })
                }else{
                    new HashTagModel({_id: hashtag, count: 1}).save()
                }
            })
        }

        res.status(200).json(newPost)
    } catch (error) {
        res.status(500).json(error)
    }
}

// process the hashtag 

const fetchHashTags = (message) => {
    const hashtagsArr = message.match(/#([a-z0-9]+)/g).map(e => e.slice(1))
    return hashtagsArr ? hashtagsArr : []
}


//update or store the hashtag in the database
const updateHashTags = (hashtag) => {

}

//Get a Post 

export const getPost = async (req, res) => {
    const id = req.params.id
    try {
        const post = await PostModel.findById(id)
        res.status(200).json(post)
    } catch (error) {
        res.status(500).json(error)
    }
}

//Update a Post 

export const updatePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body

    try {
        const post = await PostModel.findById(postId)
        if (post.userId === userId) {
            await post.updateOne({ $set: req.body })
            res.status(200).json("Post Updated")
        }
        else {
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Delete a Post

export const deletePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await PostModel.findById(postId)
        if (post.userId === userId) {
            if(post.image !== undefined)
            {
                if (fs.existsSync(path+post.image)) 
                {
                    fs.unlink(path+post.image,(err)=>{
                        if(err)
                        {
                            console.log("File Delete Error"+err); 
                        }
                    })
                }
            }
            await post.deleteOne()
            res.status(200).json("Post Deleted")
        }
        else {
            res.status(403).json("Action Forbidden")
        }
    } catch (error) {
        res.status(500).json(error)
    }
}

//Like and Dislike a post

export const likePost = async (req, res) => {
    const postId = req.params.id
    const { userId } = req.body
    try {
        const post = await PostModel.findById(postId)
        if (!post.likes.includes(userId)) {
            await post.updateOne({ $push: { likes: userId } })
            res.status(200).json("Post liked")
        }
        else {
            await post.updateOne({ $pull: { likes: userId } })
            res.status(200).json("Post Unliked")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

//Get Timeline Post  start :1:51:25 aggregate pipeline explain 1:56:26


export const getTimelinePosts = async (req, res) => {
    const userId = req.params.id
    try {
        const currentUserPosts = await PostModel.find({ userId: userId })
        const followingPosts = await UserModel.aggregate([
            {
                $match: {
                    _id: new mongoose.Types.ObjectId(userId)
                }
            },
            {
                $lookup: 
                {
                    from: "posts",
                    localField: "following",
                    foreignField: "userId",
                    as: "followingPosts"
                }
            },
            {
                $project: {
                    followingPosts: 1,
                    _id: 0
                }
            }
            
        ])
        res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a,b)=>{ return b.createdAt-a.createdAt}))
    } 
    catch (error) {
        res.status(500).json(error)
    }  
}