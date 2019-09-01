//
const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = graphql;

const users = [
  { id: '24', firstName: 'bill', age: 20},
  { id: '44', firstName: 'sam', age: 22},
]
// every route has type 
// company type must be on top of user type
// because we are going associated company to user type.
// we are going to do nested queries
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  // we wrap fields with arrow function for let it work because User Type defined
  // below and js don't know it
  // the way of closure works inside js
  // its get defined but get not exec until js engine read all const 
  // and all file get executed.
  // for circular reference from company <=> user.
  fields: () => ({
    id: {
      type: GraphQLString
    },
    firstName: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    },
    // now for bidirectional from company to user
    // company have users not user ... right??
    users: {
      // because we get back many users we use this new obj from graphql
      type: new GraphQLList(UserType),
      // parentValue is precedence => company
      resolve(parentValue, args){
        return axios
          // id of company that we currently considering
          .get(`http://localhost:3000/companies/${parentValue.id}/users`)
          .then(res => res.data);
      }

    }
  })
});

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: {
      type: GraphQLString 
    },
    firstName: {
      type: GraphQLString 
    },
    age: {
      type: GraphQLInt
    },
    // user model != user type
    // companyId  != company
    // json       != graph
    // because res from server have not company info graph asks where i must 
    // catch my info from ==> CompanyType ( we teach graph  by resolve func )
    // we user resolve func to populate company props on userType
    // we req to company id and produce company with it.
    company: {
      // now need define resolve func for this prop graph ql knows how
      // to find company associated with the specific user
      // teaching graph how to get user
      type: CompanyType,
      // parentValue is precedence type => UserType
      resolve(parentValue, args) {
        // console.log(parentValue, args);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
    }
  })
});
// root query allow us to jump in our data as blue print entry point;
// ================== 
// this is law of journey through graph
// root (our query go to root with args obj) => user => company
// we access data through uni direc of root graph and that means for 
// access company we cross over user we can not fetch company first
// graph is node and edges 
// node = types and edges = resolve()
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  // each field on root query is route on REST /user or /company
  fields: {
    // give me idea of what you are looking for
    // it will go on plural
    user: {
      type: UserType,
      args: { id: { type : GraphQLString }},
      // actually place we go in our db, TO GRAB DATA
      resolve(parentValue, args) {
        // return raw js object graphql handle this.
        // return _.find(users, { id: args.id });

        // also resolve can return a promise => graph wait to resolve promise
        // client req => express => graphql => json server(as output api);
        // then graph take back resp and give it back to graph iql.
        return axios
          .get(`http://localhost:3000/users/${args.id}`)
          // remember axios nest data on data property on obj { data: {firstName: 'bill}}
          .then(res => res.data);
        // because it can handle promise we can fetch any data
        // 3th party server reading file from hd or from db
      }
    },
    /////////////////////////////////////////////////////////////
    ////////////////////////////////////////////////////////////
    // now with multiple root query we can access base on different
    // user type instead of user => company now we can go company => user
    // add new field type 
    company : {
      type: CompanyType,
      args: { id: { type : GraphQLString }},
      // parentValue is undefined for first step on root
      // args is argument that we write on our query
      // i think we can add more for future base on other props
      // of company model.
      resolve(parentValue, args){
        // console.log(parentValue, args);
        return axios
          .get(`http://localhost:3000/companies/${args.id}`)
          .then(res => res.data);
      }
    }
  }
})




module.exports = new GraphQLSchema({
  query: RootQuery
});


// this is query it will come to root query
// query can be named
// query fetchUser {
//    //this is field of root
//          sam:  user   (id: "24") {
//                  id,
//                  firstName,
//                  age
//            },
//         niss:  user   (id: "25") {
//                  id,
//                  firstName,
//                  age
//            }
// using query fragments for not repeat and dont type many props on query
//         samin:  user   (id: "25") {
//                  ...companyDetails
//            }
// }
// kind of type checking for not breaking rules for not dry
// more use on front end
// fragment userDetails on User {
// /  id,
//    firstName,
//    description
// }
//
//