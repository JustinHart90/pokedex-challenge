import { Pokemon } from './schema/interfaces'

export const checkExists = (filters: string[]) : boolean => {
  return Boolean(filters.length > 0);
}

export const isMatch = (pokeValues: string[], filterValues: string[]) : boolean => {
  return filterValues.every(value => pokeValues.indexOf(value) !== -1)
}

export const sortById = (a: Pokemon, b: Pokemon) : number => {
  return parseInt(a.id, 10) - parseInt(b.id, 10)
}