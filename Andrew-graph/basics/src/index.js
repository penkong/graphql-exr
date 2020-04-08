import { GraphQLServer, PubSub } from "graphql-yoga";
import db from "./data";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import Post from "./resolvers/Post";
import User from "./resolvers/User";
import Comment from "./resolvers/Comment";
// scaler type : string , boolean , int, float , id

// we pass it to all resolvers add it to context
const pubsub = new PubSub({});

const server = new GraphQLServer({
  typeDefs: "./src/schema.graphql",
  resolvers: {
    Query,
    Mutation,
    Subscription,
    User,
    Post,
    Comment,
  },
  context: {
    db,
    pubsub,
  },
});

server.start(() => {
  console.log("the server is up");
});
