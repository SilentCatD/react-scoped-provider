import { useContext } from 'react'
import { getObjectRuntimeName } from '../utils'
import { ProviderContext } from '../ProviderContext'
import { ResourcesNotProvidedError } from '../errors'

function useProvider(ctor: StringConstructor, name?: string): string
function useProvider(ctor: BooleanConstructor, name?: string): boolean
function useProvider(ctor: NumberConstructor, name?: string): number
function useProvider<T>(ctor: new (...a: any) => T, name?: string): T
function useProvider<T>(ctor: new (...a: any) => T, name?: string): T {
  const key = name ?? getObjectRuntimeName(ctor)
  const parentDataContext = useContext(ProviderContext)
  const parentData = parentDataContext?.data
  const parentDataExisted = parentData?.has(key) ?? false
  if (!parentDataExisted) {
    throw new ResourcesNotProvidedError(key)
  }
  const result = parentData?.get(key)
  return result
}

export default useProvider
