const express = require('express');
// compatibility layer
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');
const app = express();
app.use('/graphql', expressGraphQL({
  schema ,
  graphiql: true
  // how data arranged
  // tell to graphql what our data exactly look like
}));


















app.listen(4000, () => {
  console.log('listening');
});