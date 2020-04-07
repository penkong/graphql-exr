export default {
  author(parentValue, args, ctx, info) {
    return users.find((user) => {
      return user.id === parentValue.author;
    });
  },
  post(parentValue, args, ctx, info) {
    return posts.find((post) => {
      return post.id === parentValue.post;
    });
  },
};
