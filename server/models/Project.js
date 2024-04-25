const { Schema, model } = require('mongoose');

const projectSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        description: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            trim: true
        },
        contributors: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
                required: true
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ]
    }
);

const Project = model("Project", projectSchema);

module.exports = Project;