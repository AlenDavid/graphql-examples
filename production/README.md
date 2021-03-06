# NestJS + GraphQL + MongoDB + PassportJS Boilerplate

This is an ever-evolving starter kit for NestJS projects with GraphQL and MongoDB.

* [Features](#Features)
* [Requirements](#Requirements)
* [Available Mutations](#Available-Mutations)
* [Available Queries](#Available-Queries)
* [Securing a specific route](#Securing-a-specific-route)
* [Getting started](#Getting-started)
* [Important commands](#Important-commands)
* [Contribution](#Contribution)

## Features

- [GraphQL](https://graphql.org/)
- [NestJS](https://nestjs.com/) server
- [MongoDB](https://www.mongodb.com/)
- [Apollo](https://www.apollographql.com/)
- [JWT](https://jwt.io/) Rolebased Authentication using Passport.js
- Authorization
- User Management
- E2E testing
- [Docker](https://www.docker.com/) Compose

## Requirements

- [Node](https://nodejs.org/en/)
- [NPM](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/) (optional)

## Available Mutations

```bash
login(email: Email!, password: String!): Auth
register(email: Email!, password: String!): Auth
update(id: String!, user: UpdateUser!): User
delete(email: Email!): User
```

## Available Queries

```bash
users: [User!]
user(email: Email!): User
```

## Securing a specific route

You can secure a route using two predefined guards that can check for the authentification state or the user role.

Only for authenticated users:

```javascript
@UseGuards(GraphqlAuthGuard)
@Resolver()
export class UserResolver {

}
```

Only for users with specific roles:

```javascript
@UseGuards(RolesGuard)
@Resolver()
export class UserResolver {
    // only Admins can access this function
    @Roles("Admin")
    @Query(returns => [UserType])
    async users() {
        return await this.userService.showAll();
    }
}
```

The current version provides no option to create the first admin account automatically and instead is made for creating the first admin manually (Which will be the case for most applications). After creating the first admin you can change the roles by using the update mutation.

## Getting started

### Installation

```bash
# Clone the repository
git clone https://github.com/TannerGabriel/nestjs-graphql-boilerplate.git

# Enter into the directory
cd nestjs-graphql-boilerplate/

# Install the dependencies
npm install
```

### Configuration

The application can be further configured using environment variables. Here is a list of the environment variables and their standard values.

```bash
# The host url of the database (default = localhost) 
DATABASE_HOST=
# The port the application runs on (default = 3000)
PORT=
```

### Starting the application

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
``` 

Visit http://localhost:3000/graphql for the GraphQL playground

### Starting using Docker

The application also includes a Docker Compose file, which makes it easier to get your application running.

```bash
# Build the image for the application
docker-compose build

# Run the application in detached mode
docker-compose up -d
```

## Important commands

Here is a list of important commands.

### Run E2E tests

```bash
npm run test:e2e

# Docker
docker exec -it nodejs npm run test:e2e
```

### Build the application

```bash
npm run build
```

### Start the application in production

```bash
npm run start
```

## Author

David Alen

## License

The boilerplate for this project is licensed under the MIT License - see the [LICENSE_BOILERPLATE.md](LICENSE_BOILERPLATE) file for details.