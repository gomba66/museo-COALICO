/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getPost = /* GraphQL */ `
  query GetTodo($id: ID!) {
    getTodo(id: $id) {
      id
      name
      year
      creation
      link
      published
      region
      description
      category
      subcategory
      file
    }
  }
`;
export const listPosts = /* GraphQL */ `
  query ListTodos(
    $filter: ModelTodoFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listTodos(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        name
        year
        creation
        link
        published
        region
        description
        category
        subcategory
        file
      }
      nextToken
    }
  }
`;
