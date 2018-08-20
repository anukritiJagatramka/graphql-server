const { gql } = require('apollo-server-express');

const typeDefs = gql`
type Query {
  allTask: [Task]
}

type Task {
  id: Int
  taskName: String
}
`;

module.exports = typeDefs;
