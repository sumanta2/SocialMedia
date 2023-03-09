import express from 'express';
import { createComment,getComments ,deleteComment,likeComment} from "../Controller/CommentController.js";

const router= express.Router();


router.post("/", createComment)
router.get("/:contentId", getComments)
router.delete("/:commentId", deleteComment)
router.put("/likes/:commentId",likeComment)


export default router;