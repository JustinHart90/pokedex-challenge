import { ApolloServer } from 'apollo-server'
import merge from 'lodash/merge'
import baseResolvers from './resolvers/baseResolvers'
import fuzzySearchResolvers from './resolvers/fuzzySearchResolvers'
import typeDefs from './schema/types'

// deep merge resolver objects to prevent duplicate properties from overriding each other
const resolvers = merge({}, baseResolvers, fuzzySearchResolvers)

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`)
})
