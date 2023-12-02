import { Create } from './types'

export function getObjectRuntimeName(o: any) {
  if (typeof o === 'object') {
    return o.constructor.name
  }
  return o.name
}

export function isCreate<T>(source: Create<T> | T): source is Create<T> {
  return typeof source === 'function'
}
