import HashTagModel from "../Models/hashtagModel.js"  //if here does not provide .js as extension it generate error 
import PostModel from "../Models/postModel.js";
import mongoose from "mongoose"

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
        const postIDListObj = postIdList.map(id => new mongoose.Types.ObjectId(id))
        const posts = await PostModel.aggregate([
            {
                $match : {_id : { $in: postIDListObj}} 
            },  
            {
               $lookup : {
                    from: 'users',
                    localField: 'userId',
                    foreignField: '_id',
                    as: 'userData'
               }  
            }, 
            {
                $project: {
                    _id: 1,
                    desc: 1,
                    likes: 1,
                    image: 1,
                    userId: 1,
                    createdAt: 1,
                    updatedAt: 1,
                    username: { $arrayElemAt: ["$userData.username", 0] },
                    firstname: { $arrayElemAt: ["$userData.firstname", 0] },
                    lastname: { $arrayElemAt: ["$userData.lastname", 0] },
                    profilePicture:{ $arrayElemAt: ["$userData.profilePicture", 0] },
                }
            }

        ])
        posts.sort((a,b)=>{ return b.createdAt-a.createdAt})
        res.status(200).json(posts)
    } catch (error) {
        console.log(error)
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