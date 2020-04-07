export default {
  users(parentValue, args, { db }, info) {
    if (!args.query) {
      return db.users;
    }
    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts(parentValue, args, ctx, info) {
    if (!args.query) return posts;
    return posts.filter((post) => {
      return post.title.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  comment(parentValue, args, ctx, info) {
    return comments;
  },
  me() {
    return {
      id: "12323",
      name: "34mk",
      email: "fdf@gmail.com",
    };
  },
  post() {
    return {
      id: "34343",
      title: "hellopw",
      body:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto, culpa commodi quod officiis molestiae repudiandae beatae fugiat soluta itaque saepe reprehenderit corporis incidunt ratione perferendis magnam aspernatur, mollitia nemo a.",
      published: true,
    };
  },
  // 4 args can pass to all resolvers functions
};
