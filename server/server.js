import express from "express";
import { graphqlHTTP } from "express-graphql";
import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "../config/db.js";
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

(async function () {
    await connectDB();
    app.listen(PORT, console.log(`Server running on port ${PORT}`));
})();
