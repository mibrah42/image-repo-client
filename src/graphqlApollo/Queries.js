import { gql } from "apollo-boost";

export const getImagesQuery = gql`
  {
    images {
      id
      title
      description
      tags
      url
    }
  }
`;

export const searchImagesQuery = gql`
  query($query: String!) {
    search(query: $query) {
      id
      title
      description
      tags
      url
    }
  }
`;

export const deleteImageQuery = gql`
  query($id: ID!) {
    delete(id: $id)
  }
`;
