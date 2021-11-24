import {loadTypedefsSync} from '@graphql-tools/load';
import {GraphQLFileLoader} from '@graphql-tools/graphql-file-loader';
import {printSchema} from 'graphql';

import {load} from './load';
import {Neo4jGraphQL} from '@neo4j/graphql';

export const typeDefs = loadTypedefsSync(load(), {
  loaders: [new GraphQLFileLoader()],
}).map((value) => value.rawSDL).join('\n');

const neo4jGraphQL = new Neo4jGraphQL({
  typeDefs,
});


export const schema = neo4jGraphQL.schema;

export const print = () => printSchema(schema);
