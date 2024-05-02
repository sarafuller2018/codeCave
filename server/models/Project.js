const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const projectSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
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
        githubProjectLink: {
            type: String,
            required: true,
            trim: true
        },
        image: {
            type: String,
            trim: true
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (timestamp) => dateFormat(timestamp),
        },
        contributors: [
            {
                type: Schema.Types.ObjectId,
                ref: "User",
            }
        ],
        comments: [
            {
                type: Schema.Types.ObjectId,
                ref: "Comment"
            }
        ],
        ownerEmail: {
            type: String,
            required: true
        }
    }
);

const Project = model("Project", projectSchema);

module.exports = Project;