export default {
  comment: {
    subscribe(parentValue, args, ctx, info) {
      const post = ctx.db.find(
        (post) => post.id === args.postId && post.published
      );
      if (!post) throw new Error("Post not Found");
      // asyncIterator allow actually subscription happen
      return ctx.pubsub.asyncIterator(`comment ${args.postId}`);
    },
  },
  post: {
    subscribe(parentValue, args, ctx, info) {
      return ctx.pubsub.asyncIterator("post");
    },
  },
};
