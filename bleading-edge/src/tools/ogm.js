import neo4j from 'neo4j-driver';
import {Neo4jGraphQL} from '@neo4j/graphql';
import {OGM} from '@neo4j/graphql-ogm';

import {typeDefs} from './schema';

const url = process.env.NEO4J_URL || 'neo4j://localhost:7687';

export const driver = neo4j.driver(
    url,
    neo4j.auth.basic(process.env.NEO4J_USERNAME, process.env.NEO4J_PASSWORD),
);

const secret = process.env.OGM_SECRET || 'shhhh';

export const config = {
  typeDefs,
  driver,
  config: {
    jwt: {
      secret,
    },
  },
};

export const ogm = new OGM(config);

export default new Neo4jGraphQL(config);

