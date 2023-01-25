import express from 'express';
import { createChat, findChat, userChats, deleteChat } from '../Controller/ChatController.js';

const router= express.Router();

router.post("/",createChat)
router.get("/:userId",userChats)
router.get("/find/:firstId/:secondId",findChat)
router.delete('/:id',deleteChat)

export default router;