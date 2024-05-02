import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
query Projects {
    projects {
      id
      name
      description
      githubProjectLink
      image
      createdAt
      
    }
  }
`;

export const QUERY_SINGLE_PROJECT = gql`
  query Project($projectId: ID!) {
    project(projectId: $projectId) {
      id
      name
      description
      githubProjectLink
      image
      createdAt
      ownerEmail
      contributors {
        userName
        githubProfileLink
      }
      comments {
        text
        user
      }
    }
  }
`;

export const QUERY_USER_EMAIL = gql`
  query UserEmail($userId: ID!) {
    user(id: $userId) {
      id
      email
      userName
    }
  }
`;

export const QUERY_COMMENTS = gql`
query Comments($projectId: ID!) {
  project(projectId: $projectId) {
    comments {
      text
      user
    }
  }
}
`;

export const QUERY_ME = gql`
query Me {
  me {
    id
    firstName
    lastName
    email
    userName
    githubProfileLink
    projects {
      id
      name
      description
      createdAt
    }
  }
}
`;