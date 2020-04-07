export default  {
  posts(parentValue, args, ctx, info) {
    return posts.filter((post) => {
      return post.author === parentValue.id;
    });
  },
  comments(parentValue, args, ctx, info) {
    return comments.filter((comment) => {
      return comment.author === parentValue.id;
    });
  },
},