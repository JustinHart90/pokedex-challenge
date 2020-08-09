import { IResolvers } from 'apollo-server'
import { Pokemon } from '../schema/interfaces'
import pokemon from '../pokemon.json'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

const checkExists = (filters: string[]) : boolean => {
  return Boolean(filters.length > 0);
}

const isMatch = (pokeValues: string[], filterValues: string[]) : boolean => {
  return filterValues.every(value => pokeValues.indexOf(value) !== -1)
}

const pokemonMany: IResolvers<any, any> = {
  Query: {
    pokemonMany(
      _,
      { typeFilters = [], weaknessFilters = [], skip = 0, limit = 999 } : 
      { typeFilters?: string[], weaknessFilters?: string[], skip?: number; limit?: number }
    ): Pokemon[] {

      // hold state of which filters are provided
      const areProvided = {
        typeFilters: checkExists(typeFilters),
        weaknessFilters: checkExists(weaknessFilters),
      };

      // check if any filters are provided
      const shouldFilter: boolean = (areProvided.typeFilters || areProvided.weaknessFilters)

      // callback function to apply filters
      const applyFilters = (poke: Pokemon) : boolean => {
        let typesMatch: boolean = isMatch(poke.types, typeFilters)
        let weaknessesMatch: boolean = isMatch(poke.weaknesses, weaknessFilters)

        if (areProvided.typeFilters && areProvided.weaknessFilters) {
          return (typesMatch && weaknessesMatch)
        }

        if (areProvided.typeFilters) {
          return typesMatch
        } else {
          return weaknessesMatch
        }
      }

      // apply any filters that are provided
      const filteredPokemon = (
        shouldFilter
        ? filter(pokemon, applyFilters)
        : pokemon
      )

      return sortBy(filteredPokemon, (poke: Pokemon) => parseInt(poke.id, 10))
      .slice(
        skip,
        limit + skip
      )
    },
  },
}

export default pokemonMany