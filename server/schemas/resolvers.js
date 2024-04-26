const { User, Project } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth');

const resolvers = {
    Query: {
        projects: async () => {
            return Project.find().populate("contributors").populate("comments");
        },

        project: async (parent, { projectId }) => {
            return Project.findOne({ _id: projectId }).populate("contributors").populate("comments");
        },

        users: async () => {
            return User.find().populate("projects");
        },
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, email, githubProfileLink }) => {
            const user = await User.create({ firstName, lastName, email, githubProfileLink });
            const token = signToken(user);

            return { token, user }
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw AuthenticationError
            }

            const correctPw = await user.isCorrectPassword(password);

            if (!correctPw) {
                throw AuthenticationError
            }

            const token = signToken(user);
            return { token, profile };
        },
        addProject: async (parent, { owner, name, description, githubProjectLink, image }) => {
            return Project.create({ owner, name, description, githubProjectLink, image });
        },
        addComment: async (parent, { projectId, text }) => {
            return Project.findOneAndUpdate(
                { _id: projectId },
                {
                    $addToSet: { comments: { text } },
                },
                {
                    new: true,
                    runValidators: true,
                }
            );
        },
        removeProject: async (parent, { projectId }) => {
            return Project.findOneAndDelete({ _id: projectId });
        },
        removeComment: async (parent, { projectId, commentId }) => {
            return Project.findOneAndUpdate(
                { _id: projectId },
                { $pull: { comments: { _id: commentId } } },
                { new: true }
            );
        }
    }
};

module.exports = resolvers;