import { IResolvers } from 'apollo-server'
import { Pokemon } from '../schema/interfaces'
import pokemon from '../pokemon.json'
import Fuse from 'fuse.js'

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

const fuse = new Fuse(pokemonArray, options)

const fuzzySearchResolvers: IResolvers<any, any> = {
  Query: {
    fuzzySearch(
      _,
      { searchValue } : { searchValue: string }
    ) : Pokemon[] {
        return fuse.search(searchValue).map(result => result.item);
    },
  },
}

export default fuzzySearchResolvers