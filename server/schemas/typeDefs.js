const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    githubLink: String!
    projects: [Project]
  }

  type Project {
    id: ID!
    name: String!
    description: String!
    image: String
    contributors: [User]!
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
    project(id: ID!): Project
    comments(projectId: ID!): [Comment]!
  }

  type Mutation {
    signup(firstName: String!, lastName: String!, email: String!, githubLink: String!): User
    login(email: String!): User
    logout: Boolean
    createProject(name: String!, description: String!, images: [String]!): Project
    addComment(projectId: ID!, text: String!): Comment
  }
`;

module.exports = typeDefs;