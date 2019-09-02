const express = require('express');
// compatibility layer
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
// apollo and relay bring query from client to express then it go
// to graphql and then out source api(json server) or db(local)
// request (query) have 3 fields in headers in console can find it
// operationName, query (all client like graphiql speak same lang on queries), variables.
// react vue speak with graphql client and it will send query to back end
// graphql client do job of graphiql  in real world
// lokka, apollo client, relay. clients give us caching ability.
// graphqlexress is reference implementation.
// apollo server is same but different in implementation.
app.use('/graphql', expressGraphQL({
  schema ,
  graphiql: true
  // how data arranged
  // tell to graphql what our data exactly look like
}));


















app.listen(4000, () => {
  console.log('listening');
});