import { ApolloServer } from 'apollo-server'
import merge from 'lodash/merge'
import pokemonOne from './resolvers/pokemonOne'
import pokemonMany from './resolvers/pokemonMany'
import typeDefs from './schema/types'

// deep merge resolver objects to prevent duplicate properties from overriding each other
const resolvers = merge({}, pokemonOne, pokemonMany)

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
