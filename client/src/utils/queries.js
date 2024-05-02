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
    contributors {
      userName
      githubProfileLink
    }
  }
}
`

export const QUERY_COMMENTS = gql`
query Comments($projectId: ID!) {
  project(projectId: $projectId) {
    comments {
      text
      user
    }
  }
}
`