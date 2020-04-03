const express = require("express");
const expressGraphQL = require("express-graphql");
const schema = require("./schema/schema");

const app = express();

app.use(
  "/graphql",
  expressGraphQL({
    //its development too let use graph ql
    graphiql: true,
    schema
  })
);

app.listen(4000, () => {
  console.log("listening");
});
