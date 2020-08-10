import { IResolvers } from 'apollo-server'
import { Pokemon } from '../schema/interfaces'
import pokemon from '../pokemon.json'
import Fuse from 'fuse.js'
import filter from 'lodash/filter'
import sortBy from 'lodash/sortBy'

const pokemonArray: Pokemon[] = Object.values(pokemon)
const options = {
  isCaseSensitive: false,
  threshold: 0.7,
  keys: [
    {
      name: 'num',
      weight: 1
    },
    {
      name: 'name',
      weight: 0.8
    },
    {
      name: 'nextEvolutions.name',
      weight: 0.15
    },
    {
      name: 'prevEvolutions.name',
      weight: 0.05
    }
  ]
}

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
      { searchValue = '', typeFilters = [], weaknessFilters = [], skip = 0, limit = 999 } : 
      { searchValue?: string, typeFilters?: string[], weaknessFilters?: string[], skip?: number; limit?: number }
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
        const typesMatch: boolean = isMatch(poke.types, typeFilters)
        const weaknessesMatch: boolean = isMatch(poke.weaknesses, weaknessFilters)

        if (areProvided.typeFilters && areProvided.weaknessFilters) {
          return (typesMatch && weaknessesMatch)
        }

        if (areProvided.typeFilters) {
          return typesMatch
        }

        return weaknessesMatch
      }

      // apply any filters that are provided
      const filteredPokemon = (
        shouldFilter
        ? filter(pokemonArray, applyFilters)
        : pokemonArray
      )

      const fuse = new Fuse(filteredPokemon, options)
      // apply fuzzy search
      const unSortedPokemon = (
        searchValue && searchValue.trim() !== ''
        ? fuse.search(searchValue).map(result => result.item)
        : filteredPokemon
      )

      return sortBy(unSortedPokemon, (poke: Pokemon) => parseInt(poke.id, 10))
      .slice(
        skip,
        limit + skip
      )
    },
  },
}

export default pokemonMany