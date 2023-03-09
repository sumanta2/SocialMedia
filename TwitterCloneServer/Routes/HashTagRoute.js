import express from "express"
import { getPostsByHashTag } from "../Controller/HashTagController.js"
const router= express.Router()

router.get('/:hashtag', getPostsByHashTag)

export default router;
