// name of type that have field with another type.
// to tell graph ql how to get type from frild , relational db.
// set up a method for each of fields that relate to another type.
// parentValue is relation model , author is user here parent is post and posts data array
export default {
  author(parentValue, args, ctx, info) {
    // give us real info in data of posts
    return users.find((user) => {
      return user.id === parentValue.author;
    });
  },
  comments(parentValue, args, ctx, info) {
    return comments.filter((comment) => {
      return comment.post === parentValue.id;
    });
  },
};
