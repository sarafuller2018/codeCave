const { Schema, model } = require('mongoose');

const commentSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        user: {
            type: String,
            required: true,
            trim: true,
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: "Project",
            required: true
        }
    }
);

const Comment = model("Comment", commentSchema);

module.exports = Comment;