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
  }
}
`