import uuid from "uuid/v4";
export default {
  createUser(parentValue, args, ctx, info) {
    const eamilTaken = users.some((user) => user.email === args.data.email);
    if (eamilTaken) throw new Error("Email is Taken");
    const user = {
      id: uuid(),
      ...args.data,
    };
    -users.push(user);
    return user;
  },
  deleteUser(parentValue, args, ctx, info) {
    const userIndex = users.findIndex((user) => user.id === args.id);
    if (userIndex === -1) throw new Error("User not found!");
    const deletedUser = users.splice(userIndex, 1);
    posts = posts.filter((post) => {
      const match = post.author === args.id;
      if (match) {
        comments = comments.filter((comment) => comment.post !== post.id);
      }
      return !match;
    });
    comments = comments.filter((comment) => comment.author !== args.id);
    return deletedUser[0];
  },
  createPost(parentValue, args, ctx, info) {
    const userExist = users.some((user) => user.id === args.data.author);
    if (!userExist) throw new Error("author not found");
    const post = {
      id: uuid(),
      ...args.data,
    };
    posts.push(post);
    return post;
  },
  createComment(parentValue, args, ctx, info) {
    const userExist = users.some((user) => user.id === args.data.author);
    const postExist = posts.some(
      (post) => post.id === args.data.post && post.published
    );
    if (!userExist || !postExist)
      throw new Error("Your selected data not exist!");
    const comment = {
      id: uuid(),
      ...args.data,
    };
    comments.push(comment);
    return comment;
  },
};
