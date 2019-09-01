//
const graphql = require('graphql');
// const _ = require('lodash');
const axios = require('axios');
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
// every route has type 
// company type must be on top of user type
// because we are going associated company to user type.
// we are going to do nested queries
const CompanyType = new GraphQLObjectType({
  name: 'Company',
  fields: {
    id: {
      type: GraphQLString
    },
    name: {
      type: GraphQLString
    },
    description: {
      type: GraphQLString
    }
  }
});

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
    },
    // user model != user type
    // companyId  != company
    // json       != graph
    // because res from server have not company info graph asks where i must 
    // catch my info from ==> CompanyType ( we teach graph  by resolve func )
    // we user resolve func to populate company props on userType
    company: {
      // now need define resolve func for this prop graph ql knows how
      // to find company associated with the specific user
      // teaching graph how to get user
      type: CompanyType,
      resolve(parentValue, args) {
        // console.log(parentValue, args);
        return axios
          .get(`http://localhost:3000/companies/${parentValue.companyId}`)
          .then(res => res.data);
      }
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

