export interface FilterAttributes {
  id: string
  value: string
}

export interface SortAttributes {
  id: string
  desc: string
}

export interface FilterQueryAttributes {
  page: string | number
  pageSize: string | number
  filtered: string
  sorted: string
}

/**
 *
 * @param filtered - Filter Query Object
 * @returns
 */
function FilterQueryObject(filtered: FilterAttributes[]): {} {
  const resultObject = {}
  if (typeof filtered !== 'object') {
    throw new Error(`Filtered must be an object, expected ${typeof filtered}`)
  }

  for (let i = 0; i < filtered.length; i += 1) {
    let { id, value } = filtered[i]
    if (id.split('.').length > 1) {
      id = `$${id}$`
    }

    // @ts-expect-error
    resultObject[id] = { $regex: `.*${value}.*` }
  }

  return resultObject
}

export { FilterQueryObject }
