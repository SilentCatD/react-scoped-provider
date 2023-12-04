import { useContext } from 'react'
import { ProviderContext } from '../ProviderContext'
import { ResourcesNotProvidedError } from '../errors'
import { ProviderConfigs } from '../types'

function useNamedProvider<T>(name: string): T
function useNamedProvider<T>(name: string, configs?: ProviderConfigs): T | undefined
function useNamedProvider<T>(name: string, configs?: ProviderConfigs): T | undefined {
  const key = name
  const parentDataContext = useContext(ProviderContext)
  const parentData = parentDataContext?.data
  const parentDataExisted = parentData?.has(key) ?? false
  if (!parentDataExisted) {
    if (configs?.allowUndefined === true) {
      return undefined
    }
    throw new ResourcesNotProvidedError(key)
  }
  const result = parentData?.get(key)
  return result
}

export default useNamedProvider
