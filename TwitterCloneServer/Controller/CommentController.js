import CommentModel from "../Models/CommentModel.js";

//create a comment
export const createComment = async (req, res) => {

    const newComment = new CommentModel(req.body)
    try {

        await newComment.save()

        res.status(200).json(newComment)
    } catch (error) {
        res.status(500).json(error)
    }
}


//Get  some comment based on the content Id
export const getComments = async (req,res) => {
    try {
        const comments= await CommentModel.aggregate([
            {
              $match: { contentId: req.params.contentId }
            },
            {
              $addFields: {
                userIdObj: { $toObjectId: "$userId" }
              }
            },
            {
              $lookup: {
                from: "users",
                localField: "userIdObj",
                foreignField: "_id",
                as: "user"
              }
            },
            {
              $unwind: "$user"
            },
            {
              $project: {
                _id: 1,
                contentId: 1,
                text: 1,
                userId: 1,
                likes:1,
                createdAt: 1,
                "user.firstname": 1,
                "user.lastname": 1,
                "user.profilePicture": 1
              }
            }
          ])
          
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json(error);
    }
}


//Delete a comment based on the id of the comment
export const deleteComment = async (req, res) => {
    try {
        const deleteCount = await CommentModel.deleteOne({_id: req.params.commentId});
        res.status(200).json({...deleteCount,deleteComment:req.params.commentId}); 
        
    } catch (error) {
        res.status(500).json(error);
    }
}

//Like and un-liked or an comment
export const likeComment = async (req, res) => {
  const CommentId = req.params.commentId
  const { userId } = req.body
  
  try {
    const comment = await CommentModel.findById(CommentId)
    if (!comment.likes.includes(userId)) {
      await comment.updateOne({ $push: { likes: userId } })
      res.status(200).json("Comment liked")
    }
    else {
      await comment.updateOne({ $pull: { likes: userId } })
      res.status(200).json("Comment Un-liked")
    }

  } catch (error) {
      res.status(500).json(error)
  }
}
