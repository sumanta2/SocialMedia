import express from "express"
import { getPostsByHashTag, getTrending } from "../Controller/HashTagController.js"
const router= express.Router()

router.get('/tag/:hashtag', getPostsByHashTag)
router.get('/trending', getTrending)

export default router;
