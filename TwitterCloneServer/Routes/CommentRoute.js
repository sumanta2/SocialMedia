import express from 'express';
import { createComment,getComments ,deleteComment,likeComment,deleteCommentsSpecificPost} from "../Controller/CommentController.js";

const router= express.Router();


router.post("/", createComment)
router.get("/:contentId", getComments)
router.delete("/:commentId", deleteComment)
router.delete("/post/:postId", deleteCommentsSpecificPost)
router.put("/likes/:commentId",likeComment)


export default router;