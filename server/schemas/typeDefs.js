const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    githubProfileLink: String!
    projects: [Project]
  }

  type Project {
    id: ID!
    owner: User!
    name: String!
    description: String!
    githubProjectLink: String!
    image: String
    createdAt: String!
    contributors: [User]
    comments: [Comment]
  }

  type Comment {
    id: ID!
    text: String!
    user: User!
    project: Project!
  }

  type Query {
    projects: [Project]!
    project(projectId: ID!): Project
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, email: String!, githubProfileLink: String!): User
    addProject(owner: User!, name: String!, description: String!, githubProjectLink: String!, image: String): Project
    addComment(projectId: ID!, text: String!): Comment
    removeProject(projectId: ID!): Project
    removeComment(projectId: ID!, commentId: ID!): Project
  }
`;

module.exports = typeDefs;