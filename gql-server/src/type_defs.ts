import { gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Task" type defines the queryable fields for every task in our data source.
  type Task {
    id: ID!
    task: String
    description: String
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "tasks" query returns an array of zero or more Tasks (defined above).
  type Query {
    allTasks: [Task]
  }

  type Mutation {
    createTask(task: String!, description: String!): Task
  }
`;

export default typeDefs;
