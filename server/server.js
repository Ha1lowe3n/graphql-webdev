import express from "express";
import { graphqlHTTP } from "express-graphql";

import schema from "../schema/schema.js";

const PORT = 5000;
const app = express();

app.use(
    "/graphql",
    graphqlHTTP({
        schema,
        graphiql: true,
    })
);

app.listen(PORT, console.log(`Server working on port ${PORT}`));
