import { IResolvers } from 'apollo-server'
import { Pokemon } from '../schema/interfaces'
import pokemon from '../pokemon.json'
import find from 'lodash/find'

const pokemonOne: IResolvers<any, any> = {
    Pokemon: {
      prevEvolutions(rawPokemon: Pokemon) {
        return (
          rawPokemon.prevEvolutions?.map(evolution =>
            find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
          ) || []
        )
      },
      nextEvolutions(rawPokemon: Pokemon) {
        return (
          rawPokemon.nextEvolutions?.map(evolution =>
            find(pokemon, otherPokemon => otherPokemon.num === evolution.num)
          ) || []
        )
      },
    },

    Query: {
      pokemonOne(_, { id }: { id: string }): Pokemon {
        return (pokemon as Record<string, Pokemon>)[id]
      },
    },
  }

export default pokemonOne