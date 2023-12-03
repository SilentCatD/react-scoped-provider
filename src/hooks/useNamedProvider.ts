import { useContext } from 'react'
import { ProviderContext } from '../ProviderContext'
import { ResourcesNotProvidedError } from '../errors'

function useNamedProvider<T>(name: string): T {
  const key = name
  const parentDataContext = useContext(ProviderContext)
  const parentData = parentDataContext?.data
  const parentDataExisted = parentData?.has(key) ?? false
  if (!parentDataExisted) {
    throw new ResourcesNotProvidedError(key)
  }
  const result = parentData?.get(key)
  return result
}

export default useNamedProvider
