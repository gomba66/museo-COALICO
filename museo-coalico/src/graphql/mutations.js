/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const createPost = /* GraphQL */ `
  mutation CreateTodo(
    $input: CreateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    createTodo(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const updateTodo = /* GraphQL */ `
  mutation UpdateTodo(
    $input: UpdateTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    updateTodo(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const deleteTodo = /* GraphQL */ `
  mutation DeleteTodo(
    $input: DeleteTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    deleteTodo(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`;
export const getPost = /* GraphQL */ `
  mutation getTodo(
    $input: getTodoInput!
    $condition: ModelTodoConditionInput
  ) {
    getodo(input: $input, condition: $condition) {
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
      createdAt
      updatedAt
    }
  }
`
