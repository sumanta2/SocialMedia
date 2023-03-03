import express from 'express';
import { addMessage, getMessages,deleteMessage,deleteOneMessage } from '../Controller/MessageController.js';

const router= express.Router();

router.post("/",addMessage);
router.get("/:chatId",getMessages);
router.delete("/:chatId", deleteMessage);
router.delete("/oneMsg/:messageId",deleteOneMessage);


export default router;