const { User, Project, Comment } = require("../models");
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
            return User.find().populate({
                path: 'projects',
                populate: {
                    path: 'comments',
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
        addUser: async (parent, { firstName, lastName, userName, email, githubProfileLink }) => {
            const user = await User.create({ firstName, lastName, userName, email, githubProfileLink });
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
                    user: context.user.userName
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { projects: project._id } }
                );

                return project;
            }
            throw AuthenticationError;
        },
        addComment: async (parent, { projectId, text }, context) => {
            if (context.user) {
                // Create a new comment
                const newComment = await Comment.create({ text, user: context.user.userName });
                
                // Find the project and add the comment's ObjectId to the comments array
                const updatedProject = await Project.findByIdAndUpdate(
                    projectId,
                    { $addToSet: { comments: newComment._id } },
                    { new: true }
                );
        
                return newComment;
            }
            throw new AuthenticationError("You must be logged in to add a comment.");
        },
        removeProject: async (parent, { projectId }, context) => {
            if (context.user) {
                const project = await Project.findOneAndDelete({
                    _id: projectId,
                    user: context.user.userName
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
        sendEmail: async (_, { from, to, subject, text }) => {
            try {
                let transporter = nodemailer.createTransport({
                    // Your email configuration
                });

                let info = await transporter.sendMail({
                    from: from,
                    to: to,
                    subject: subject,
                    text: text,
                });

                console.log('Email sent: ' + info.response);
                return 'Email sent successfully';
            } catch (error) {
                console.error('Error sending email:', error);
                throw new Error('Failed to send email');
            }
        },
    },
};

module.exports = resolvers;