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

        // by adding context to our query, we can retrieve the logged in user without specifically searching for them
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id: context.user._id });
            }
            throw AuthenticationError;
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
        addProject: async (parent, { owner, name, description, githubProjectLink, image }, context) => {
            if (context.user) {
                return Project.create({ owner, name, description, githubProjectLink, image });
            }
            throw AuthenticationError;
        },
        addComment: async (parent, { projectId, text }, context) => {
            if (context.user) {
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
            }
            throw AuthenticationError;
        },
        // need to see if this works? try && 
        removeProject: async (parent, { projectId }, context) => {
            if (context.user) {
                return Project.findOneAndDelete({ _id: projectId });
            }
            throw AuthenticationError;
        },
        removeComment: async (parent, { projectId, commentId }, context) => {
            if (context.user) {
                return Project.findOneAndUpdate(
                    { _id: projectId },
                    { $pull: { comments: { _id: commentId } } },
                    { new: true }
                );
            }
            throw AuthenticationError;
        },
    },
};

module.exports = resolvers;