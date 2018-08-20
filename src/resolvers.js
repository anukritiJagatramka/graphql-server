let { Task } = require('./connectors');

// const resolvers = {
//   Query: {
//     author(_, args) {
//       return Author.find({ where: args });
//     },
//     allAuthors(_, args) {
//       return Author.findAll();
//     }
//   },
//   Author: {
//     posts(author) {
//       return author.getPosts();
//     }
//   },
//   Post: {
//     author(post) {
//       return post.getAuthor();
//     },
//     views(post) {
//       return View.findOne({ postId: post.id }).then(view => view.views);
//     }
//   }
// };
const resolvers = {
  Query: {
    allTask(_, args){
      return Task.findAll();
    }
  }
}
module.exports = resolvers;