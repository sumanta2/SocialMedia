import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  contentId: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  likes: [],
},
{
    timestamps:true,
});

const CommentModel = mongoose.model('Comment', CommentSchema);

export default CommentModel;
