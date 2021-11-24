import express from 'express';
import {graphqlHTTP} from 'express-graphql';

import {print} from './tools/schema';
import NeoSchema from './tools/ogm';

export const app = express();

app.use(
    '/graphql',
    graphqlHTTP({
      schema: NeoSchema.schema,
      graphiql: true,
    }),
);
app.get(
    '/schema',
    (_, res) => res.send(print()),
);

app.listen(4000, () => {
  console.info(`Server listening on http://localhost:4000 🥵 `);
});
