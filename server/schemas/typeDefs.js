const typeDefs = `
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    userName: String!
    email: String!
    password: String!
    githubProfileLink: String!
    projects: [Project]
  }

  type Auth {
    token: ID!
    profile: Profile
  }

  type Project {
    id: ID!
    user: String!
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
    user: String!
    project: Project!
  }

  type Query {
    projects: [Project]!
    project(projectId: ID!): Project
    users: [User]!
    me: Profile
  }

  type Mutation {
    addUser(firstName: String!, lastName: String!, userName: String!, email: String!, password: String!, githubProfileLink: String!): Auth
    login(email: String!, password: String!): Auth
    
    addProject(name: String!, description: String!, githubProjectLink: String!, image: String): Project
    addComment(projectId: ID!, text: String!): Comment
    removeProject(projectId: ID!): Project
    removeComment(projectId: ID!, commentId: ID!): Comment
  }
`;

module.exports = typeDefs;