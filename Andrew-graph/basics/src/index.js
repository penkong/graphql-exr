import { GraphQLServer } from "graphql-yoga";

// scaler type : string , boolean , int, float , id

// demo user data
const users = [
  {
    id: "1",
    name: "mk",
    email: "tse@gmial.com",
  },
  {
    id: "2",
    name: "mk2",
    email: "1tse@gmial.com",
  },
  {
    id: "3",
    name: "mk3",
    email: "2tse@gmial.com",
  },
  {
    id: "4",
    name: "mk4",
    email: "3tse@gmial.com",
  },
];

const posts = [
  { id: "11", title: "post1", body: "body1", published: false, author: "1" },
  { id: "12", title: "post2", body: "body2", published: false, author: "2" },
  { id: "13", title: "post3", body: "body3", published: true, author: "3" },
];

const comments = [
  { id: "24", text: "hale lu yaaaaa!", author: "3", post: "12" },
  { id: "32", text: "hale na lu yaaaaa!", author: "4", post: "13" },
  { id: "43", text: "hale bashe lu yaaaaa!", author: "1", post: "11" },
];
// type definitions
const typeDefs = `
  type Query {
    users(query: String) : [User!]!
    posts(query: String) : [Post!]!
    comment(query: String): [Comment!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    post: Post!
    author: User!
  }
`;

const resolvers = {
  Query: {
    users(parentValue, args, ctx, info) {
      if (!args.query) {
        return users;
      }
      return users.filter((user) => {
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
  },
  // to tell graph ql how to get type from frild , relational db.
  // name of type that have field with another type.
  Post: {
    // set up a method for each of fields that relate to another type.
    // parentValue is relation model , author is user here parent is post and posts data array
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
  },
  User: {
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
  Comment: {
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
  },
};

const server = new GraphQLServer({
  typeDefs,
  resolvers,
});

server.start(() => {
  console.log("the server is up");
});
