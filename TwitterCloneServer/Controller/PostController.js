import PostModel from "../Models/postModel.js"
import UserModel from "../Models/userModel.js"
import mongoose from "mongoose"
import fs from "fs"
import * as HashTagController from "../Controller/HashTagController.js"
import CommentModel from "../Models/CommentModel.js"


const path = "./public/images/";

//Create new Post

export const createPost = async (req, res) => {
  const hashtags = HashTagController.fetchFromPost(req.body.desc) //populates if there are any hashtags in the post
  req.body.hashtags = hashtags
  const userId = req.body.userId;
  const newPost = new PostModel(req.body)
  const postId = newPost._id
  try {

    const createdPost = await newPost.save()
    HashTagController.commitToDatabase(hashtags, userId, postId)
    res.status(200).json(newPost)
  } catch (error) {
    print(error)
    res.status(500).json(error)
  }
}

//get all posts of specific users

export const getAllPosts = async (req, res,) => {
  const userId = req.params.userId
  try {
    const currentUserPosts = await PostModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          _id: 1,
          desc: 1,
          likes: 1,
          image: 1,
          userId: 1,
          hashtags: 1,
          createdAt: 1,
          updatedAt: 1,
          username: { $arrayElemAt: ["$user.username", 0] },
          firstname: { $arrayElemAt: ["$user.firstname", 0] },
          lastname: { $arrayElemAt: ["$user.lastname", 0] },
          profilePicture: { $arrayElemAt: ["$user.profilePicture", 0] },
        }
      }
    ])
    res.status(200).json(currentUserPosts)
  } catch (error) {
    res.status(500).json(error)
  }
}



//Get a Post 

export const getPost = async (req, res) => {
  const id = req.params.id
  try {
    
    const post = await PostModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          _id: 1,
          desc: 1,
          likes: 1,
          image: 1,
          hashtags: 1,
          userId:1,
          createdAt: 1,
          updatedAt: 1,
          username: { $arrayElemAt: ["$user.username", 0] },
          firstname: { $arrayElemAt: ["$user.firstname", 0] },
          lastname: { $arrayElemAt: ["$user.lastname", 0] },
          profilePicture:{ $arrayElemAt: ["$user.profilePicture", 0] },

        }
      }
    ])
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
    if (post.userId.toString() === userId) {
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
    if (post.userId.toString() === userId) {
      if (post.image !== undefined) {
        if (fs.existsSync(path + post.image)) {
          fs.unlink(path + post.image, (err) => {
            if (err) {
              console.log("File Delete Error" + err);
            }
          })
        }
      }
      await CommentModel.deleteMany({ contentId: postId });
      await post.deleteOne()
      HashTagController.deleteAll(postId)
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



export const getTimelinePosts = async (req, res) => {
  const userId = req.params.id
  try {

    const currentUserPosts = await PostModel.aggregate([
      {
        $match: { userId: new mongoose.Types.ObjectId(userId) }
      },
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $project: {
          _id: 1,
          desc: 1,
          likes: 1,
          image: 1,
          userId:1,
          hashtags: 1,
          createdAt: 1,
          updatedAt: 1,
          username: { $arrayElemAt: ["$user.username", 0] },
          firstname: { $arrayElemAt: ["$user.firstname", 0] },
          lastname: { $arrayElemAt: ["$user.lastname", 0] },
          profilePicture:{ $arrayElemAt: ["$user.profilePicture", 0] },

        }
      }
    ])


    const followingPosts = await UserModel.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(userId)
        }
      },
      {
        $project: {
          followingIds: {
            $map: {
              input: "$following",
              as: "userId",
              in: {
                $toObjectId: "$$userId"
              }
            }
          }
        }
      },
      {
        $lookup: {
          from: "posts",
          let: { followingList: "$followingIds" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $in: ["$userId", "$$followingList"]
                }
              }
            },
            {
              $lookup: {
                from: 'users',
                localField: 'userId',
                foreignField: '_id',
                as: 'userDetails'
              }
            },
            {
              $project: {
                _id: 1,
                desc: 1,
                likes: 1,
                hashtags: 1,
                userId:1,
                createdAt: 1,
                updatedAt: 1,
                username: { $arrayElemAt: ["$userDetails.username", 0] },
                firstname: { $arrayElemAt: ["$userDetails.firstname", 0] },
                lastname: { $arrayElemAt: ["$userDetails.lastname", 0] },
                profilePicture:{ $arrayElemAt: ["$userDetails.profilePicture", 0] },
              }
            }
          ],
          as: "followingPosts"
        }
      },
      {
        $project: {
          followingPosts: 1,
          user: {
            username: "$username",
            firstname: "$firstname",
            lastname: "$lastname",
            profilePicture: "$profilePicture",
          }
        }
      }
    ]);


    res.status(200).json(currentUserPosts.concat(...followingPosts[0].followingPosts).sort((a, b) => { return b.createdAt - a.createdAt }))
  }
  catch (error) {
    res.status(500).json(error)
  }
}