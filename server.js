
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
let Sequelize = require('sequelize');
let { makeExecutableSchema } = require("graphql-tools") ;
let casual = require('casual');
let _ = require('lodash');

const db = new Sequelize('blog', null, null, {
  dialect: 'sqlite',
  storage: './blog.sqlite',
});

const TaskModel = db.define('task',{
  taskName: {type: Sequelize.STRING}
})
casual.seed(88);
// db.sync({ force: true }).then(() => {
//   _.times(10, () => {
//     return TaskModel.create({
//       taskName: casual.sentence
//     })
//   });
// });
const Task = db.models.task;

const typeDefs = gql`
type Query {
  allTask:[Task]
}

type Mutation {
  addTask(taskName:String):Task
  deleteTask(id:Int):Task
  updateTask(id:Int,taskName:String):Task
}

type Task {
  id: Int
  taskName: String
}
`;

const resolvers = {
  Query: {
    allTask(_, args){
      return Task.findAll();
    }
  },
  Mutation : {
    addTask(root, args, context, info){
      return Task.create({
        taskName:args.taskName});
    },
    deleteTask(root, args, context, info){
      return Task.destroy({
        where:{
          id:args.id
        }
      })
    },
    updateTask(root, args, context, info){
      return Task.update({
        taskName: args.taskName
      },
      {
        where:{id:args.id}
      })
    }
  }
}

const schema = makeExecutableSchema({ typeDefs, resolvers })
const server = new ApolloServer({ typeDefs, resolvers });

const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);