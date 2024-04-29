import { gql } from "@apollo/client";

export const ADD_USER = gql`
mutation Mutation($firstName: String!, $lastName: String!, $userName: String!, $email: String!, $password: String!, $githubProfileLink: String!) {
    addUser(firstName: $firstName, lastName: $lastName, userName: $userName, email: $email, password: $password, githubProfileLink: $githubProfileLink) {
      token
      user {
        id
        userName
      }
    }
  }`;