import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation Mutation($userName: String!, $email: String!, $password: String!, $githubProfileLink: String!) {
    addUser(userName: $userName, email: $email, password: $password, githubProfileLink: $githubProfileLink) {
      token
      user {
        id
        userName
      }
    }
  }
  `;

  export const LOGIN_USER = gql`
  mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        id
        userName
      }
    }
  }
  `;

  export const ADD_PROJECT = gql`
  mutation Mutation($name: String!, $description: String!, $githubProjectLink: String!, $image: String) {
    addProject(name: $name, description: $description, githubProjectLink: $githubProjectLink, image: $image) {
      id
    }
  }
  `;

  export const ADD_COMMENT = gql`
  mutation AddComment($projectId: ID!, $text: String!) {
    addComment(projectId: $projectId, text: $text) {
      text
      user
    }
  }
`;