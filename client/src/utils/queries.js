import { gql } from '@apollo/client';

export const QUERY_PROJECTS = gql`
query Projects {
    projects {
      id
      name
      description
      githubProjectLink
      image
    }
  }
`;