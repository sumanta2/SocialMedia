import MessageModel from "../Models/MessageModel.js";


export const addMessage = async(req, res) => { 
    const {chatId,senderId,text} = req.body
    const message= new MessageModel(
        {
            chatId,
            senderId,
            text
        }
    );
    try {
        const result = await message.save();
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}


export const getMessages = async(req, res) => {
    const {chatId} = req.params
    try {
        const result = await MessageModel.find({chatId});
        res.status(200).json(result);
    } catch (error) {
        res.status(500).json(error);
    }
}

//delete specific users all messages
export const deleteMessage = async (req, res) => {
    const {chatId} = req.params;

    try {
        const deleteCount = await MessageModel.deleteMany({chatId});
        res.status(200).json(deleteCount);
    } catch (error) {
        res.status(500).json(error);
    }
}

//Delete specific message based on message Id
export const deleteOneMessage = async (req, res) => {
    const {messageId} = req.params;

    try {
        const deleteCount = await MessageModel.deleteOne({ _id: messageId });
        res.status(200).json({messageId});
    } catch (error) {
        res.status(500).json(error);
    }
}