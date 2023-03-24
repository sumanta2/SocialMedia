import ChatModel from "../Models/ChatModel.js";
import MessageModel from "../Models/MessageModel.js";

import socket from "../index.js"

export const createChat= async(req,res) => {         //it store more than one same value need to fix finally solve this
    const newChat= new ChatModel({
        members: [req.body.senderId, req.body.receiverId,],
    });

    
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[req.body.senderId, req.body.receiverId,]}
        })
        if(chat) return res.status(200).json(chat);


        const result = await newChat.save();
        socket.emit("new-chat", result,req.body.receiverId);
        res.status(200).json(result);

    } catch (error) {
        res.status(500).json(error);
    }
};

export const userChats = async (req,res) => {
    try {
        const chat= await ChatModel.find({
            members:{$in:[req.params.userId]}
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const findChat = async (req, res) =>{
    try {
        const chat = await ChatModel.findOne({
            members:{$all:[req.params.firstId,req.params.secondId]}
        })
        res.status(200).json(chat);
    } catch (error) {
        res.status(500).json(error);
    }
}

export const deleteChat = async (req, res) => {
    try {
        await MessageModel.deleteMany({chatId:req.params.id});
        const deleteCount = await ChatModel.deleteOne({_id: req.params.id});
        res.status(200).json({...deleteCount,deleteChat:req.params.id});
        
        
    } catch (error) {
        res.status(500).json(error);
    }
}
