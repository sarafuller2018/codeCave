const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        firstName: {
            type: String,
            required: true,
            trim: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        githubLink: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        projects: [
            {
                type: Schema.Types.ObjectId,
                ref: "Project"
            }
        ]
    }
);

const User = model("User", userSchema);

module.exports = User;