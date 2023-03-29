import HashTagModel from "../Models/hashtagModel.js"  //if here does not provide .js as extension it generate error 
import PostModel from "../Models/postModel.js";
import bcrypt, { hash } from "bcrypt"
import jwt from "jsonwebtoken";

// process the hashtag 
export const fetchFromPost = (message) => {
    const hashtagsArr = message.match(/#([A-Za-z0-9]+)/g)?.map(e => e.slice(1))
    return hashtagsArr ? hashtagsArr : []
}


//delete the hashtag in the database when post is deleted
export const deleteAll = async (postId) => {
    await HashTagModel.deleteMany({postId})
}

//save tags to database
export const commitToDatabase = async (hashtags, userId, postId) => {
    const hashTagDocs = []
    for (let hashtag of hashtags){
        hashTagDocs.push({hashtag, userId, postId})
    }
    await HashTagModel.insertMany(hashTagDocs)
}

export const getPostsByHashTag = async (req, res) => {
    const {hashtag} = req.params
    try {
        const postIdList = await HashTagModel.find({hashtag}).distinct("postId")
        const posts = await PostModel.find({_id : { $in: postIdList}})
        posts.sort((a,b)=>{ return b.createdAt-a.createdAt})
        res.status(200).json(posts)
    } catch (error) {
        res.status(500).json(error)
    }
}

export const getAllHashTag = async (req,res) => {
    try {
        
    } catch (error) {
        res.status(500).json(error)
    }
}


export const getTrending = async (req,res) => {
    try {
        const now = new Date();
        const limitTime = new Date(now.getTime() - (30 * 24 * 60 * 60 * 1000));
        const pipeline = [
            { $match : { createdAt: {$gt : limitTime} } },
            { $group : { _id: '$hashtag', count : {$sum: 1}  } },
            { $sort: { count: -1 } },
        ]
        const trendingResult = await HashTagModel.aggregate(pipeline);
        res.status(200).json(trendingResult)
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}