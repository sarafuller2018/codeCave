const { User, Project } = require("../models");

const resolvers = {
    Query: {
        projects: async () => {
            return Project.find();
        },

        project: async (parent, { projectId }) => {
            return Project.findOne({ _id: projectId })
        }
    },

    Mutation: {
        addUser: async (parent, { firstName, lastName, email, githubProfileLink }) => {
            return User.create({ firstName, lastName, email, githubProfileLink });
        },
        addProject: async (parent, { name, description, githubProjectLink, image }) => {
            return Project.create({ name, description, githubProjectLink, image });
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
            );
        }
    }
};

module.exports = resolvers;