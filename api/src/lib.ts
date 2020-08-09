export const checkExists = (filters: string[]) : boolean => {
  return Boolean(filters.length > 0);
}

export const isMatch = (pokeValues: string[], filterValues: string[]) : boolean => {
  return filterValues.every(value => pokeValues.indexOf(value) !== -1)
}