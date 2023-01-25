import express from 'express';
import { addMessage, getMessages,deleteMessage } from '../Controller/MessageController.js';

const router= express.Router();

router.post("/",addMessage);
router.get("/:chatId",getMessages);
router.delete("/:chatId",deleteMessage);

export default router;