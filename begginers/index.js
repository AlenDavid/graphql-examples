const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid').v5;

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type Book {
    title: String
    author: String
  }

  type Thing {
    # comments!
    label: String
    # ID means it has to be unique at the returning data.
    # <type>! the ! means the field cannot be null.
    id: ID!
    ping: String
    pong: String
    water: String
    # [<type>] Array of types
    relatesTo(filter: String): [Thing]
  }

  # The "Query" type is special: it lists all of
  # the available queries that clients can execute,
  # along with the return type for each.
  type Query {
    # simply, returns all the things.
    things: [Thing]
    books: [Book]
  }

  # The "Mutation" type is also special:
  # it lists all of the available mutations
  # that clients can execute.
  type Mutation {
    newThing(label: String): Thing
    newBook(title: String): Book
  }
`;

const books = [
  {
    title: 'The Awakening',
    author: 'Kate Chopin',
  },
  {
    title: 'City of Glass',
    author: 'Paul Auster',
  },
];

const things = [];

// Resolvers define the technique for fetching the types defined in the
// schema.
const resolvers = {
  Query: {
    things: () => things,
    books: () => books,
  },
  Mutation: {
    newBook: (_, { title }) => {
      const book = {
        title,
      };

      books.push(book);

      return books;
    },

    newThing: (_, { label }) => {
      const id = uuid();

      const thing = {
        id,
        label,
      };

      things.push(thing);

      return thing;
    },
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({ typeDefs, resolvers });

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
