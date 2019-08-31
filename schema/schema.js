//
const graphql = require('graphql');
const _ = require('lodash');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
} = graphql;

const users = [
  { id: '24', firstName: 'bill', age: 20},
  { id: '44', firstName: 'sam', age: 22},
]

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: {
    id: {
      type: GraphQLString 
    },
    firstName: {
      type: GraphQLString 
    },
    age: {
      type: GraphQLInt
    }
  }
})
// root query allow us to jump in our data as blue print entry point;
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    // give me idea of what you are looking for
    user: {
      type: UserType,
      args: { id: { type : GraphQLString }},
      // actually place we go in our db, TO GRAB DATA
      resolve(parentValue, args) {
        //  return raw js object graphql handle this.
        return _.find(users, { id: args.id });
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery
});


// this is query it will come to root query
// {
//   user(id: "24") {
//     id,
//     firstName,
//     age
//   }
// }

