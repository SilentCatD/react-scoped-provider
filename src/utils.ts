import { Create } from './types'

export function getObjectRuntimeName(o: any) {
  if (typeof o === 'string') {
    return String.name
  }
  // if (typeof o === 'bigint') {
  //   return BigInt.name
  // }
  if (typeof o === 'boolean') {
    return Boolean.name
  }
  // if (typeof o === 'function') {
  //   return Function.name
  // }
  if (typeof o === 'number') {
    return Number.name
  }
  // if (typeof o === 'symbol') {
  //   return Symbol.name
  // }
  if (typeof o === 'object') {
    return o.constructor.name
  }
  return o.name
}

export function isCreate<T>(source: Create<T> | T): source is Create<T> {
  return typeof source === 'function'
}
