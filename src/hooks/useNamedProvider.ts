import { useContext } from 'react'
import { ProviderContext } from '../ProviderContext'
import { ResourcesNotProvidedError } from '../errors'

interface UseNamedProviderConfig {
  allowUndef: boolean
}

interface UseNamedProviderConfigAllowUndef extends UseNamedProviderConfig {
  allowUndef: true
}

interface UseNamedProviderConfigDisAllowUndef extends UseNamedProviderConfig {
  allowUndef: false
}
function useNamedProvider<T>(name: string): T
function useNamedProvider<T>(name: string, configs: UseNamedProviderConfigAllowUndef): T | undefined
function useNamedProvider<T>(name: string, configs: UseNamedProviderConfigDisAllowUndef): T
function useNamedProvider<T>(name: string, configs?: UseNamedProviderConfig): T | undefined
function useNamedProvider<T>(name: string, configs?: UseNamedProviderConfig): T | undefined {
  const key = name
  const parentDataContext = useContext(ProviderContext)
  const parentData = parentDataContext?.data
  const parentDataExisted = parentData?.has(key) ?? false
  if (!parentDataExisted) {
    if (configs?.allowUndef === true) {
      return undefined
    }
    throw new ResourcesNotProvidedError(key)
  }
  const result = parentData?.get(key)
  return result
}

export default useNamedProvider
export { UseNamedProviderConfigDisAllowUndef, UseNamedProviderConfig, UseNamedProviderConfigAllowUndef }
