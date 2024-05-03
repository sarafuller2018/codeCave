const { User, Project, Comment } = require("../models");
const { signToken, AuthenticationError } = require('../utils/auth');
const { ObjectId } = require("mongoose").Types;

const resolvers = {
    Query: {
        projects: async () => {
            return Project.find().populate("contributors").populate("comments");
        },

        project: async (parent, { projectId }) => {
            return Project.findOne({ _id: projectId }).populate("contributors").populate("comments");
        },

        user: async (_, { id }) => {
            try {
              const user = await User.findById(id);
              return user;
            } catch (error) {
              console.error('Error fetching user:', error);
              throw new Error('Failed to fetch user');
            }
        },

        users: async () => {
            return User.find().populate({
                path: 'projects',
                populate: {
                    path: 'comments ownerEmail',
                    select:"text user project"
                }
            });
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
        addUser: async (parent, { firstName, lastName, userName, email, password, githubProfileLink }) => {
            const user = await User.create({ firstName, lastName, userName, email, password, githubProfileLink });
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
            return { token, user };
        },
        addProject: async (parent, { name, description, githubProjectLink, image }, context) => {
            if (context.user) {
                const project = await Project.create({
                    name, description, githubProjectLink, image,
                    user: new ObjectId(context.user._id),
                    ownerEmail:context.user.email
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { projects: project._id } }
                );

                return project;
            }
            throw AuthenticationError;
        },
        addComment: async (parent, { projectId, text, user }, context) => {
            if (context.user) {
                try {
                    // Create a new comment and associate it with the user
                    const newComment = await Comment.create({ projectId, text, user });
                    
                    // Find the project and add the comment's ObjectId to the comments array
                    const updatedProject = await Project.findByIdAndUpdate(
                        { _id: projectId },
                        { $addToSet: { comments: newComment._id } },
                        { new: true }
                    );
        
                    if (!updatedProject) {
                        throw new Error('Project not found');
                    }
        
                    return updatedProject;
                } catch (error) {
                    console.error('Error adding comment:', error);
                    throw new Error('Failed to add comment');
                }
            }
            throw AuthenticationError;
        },
        removeProject: async (parent, { projectId }, context) => {
            if (context.user) {
                const project = await Project.findOneAndDelete({
                    _id: projectId,
                    user: new ObjectId(context.user._id)
                });

                await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $pull: { projects: project._id } },
                    { new: true }
                );

                return project;
            }
            throw AuthenticationError;
        },
        removeComment: async (parent, { projectId, commentId }, context) => {
            if (context.user) {
                const comment = await Comment.findOneAndDelete({
                    _id: commentId,
                    user: context.user.userName
                });

                await Project.findOneAndUpdate(
                    { _id: projectId },
                    { $pull: { comments: comment._id } },
                    { new: true }
                );

                return comment;
            }
            throw AuthenticationError;
        },
        
    },
};

module.exports = resolvers;