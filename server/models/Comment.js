const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        project: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        }
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;