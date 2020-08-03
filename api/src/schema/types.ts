import { gql } from 'apollo-server'

export default gql`
  type Pokemon {
    id: ID!
    num: ID!
    name: String!
    img: String!
    types: [String!]!
    weaknesses: [String!]!
    height: String!
    weight: String!
    egg: String!
    prevEvolutions: [Pokemon!]!
    nextEvolutions: [Pokemon!]!
    candy: String
    candyCount: Int
  }

  type Query {
    pokemonMany(
      typeFilters: [String], weaknessFilters: [String], skip: Int, limit: Int
    ): [Pokemon!]!
    
    pokemonOne(id: ID!): Pokemon
    
    fuzzySearch(searchValue: String!) : [Pokemon]
  }
`