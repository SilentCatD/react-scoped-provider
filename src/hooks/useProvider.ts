import { getObjectRuntimeName } from '../utils'
import useNamedProvider from './useNamedProvider'

type UseProviderConfigs = {
  allowUndef: boolean
  name?: string
}

function useProvider(ctor: StringConstructor, configs: UseProviderConfigs): string | undefined
function useProvider(ctor: StringConstructor, name?: string): string
function useProvider(ctor: BooleanConstructor, configs: UseProviderConfigs): boolean | undefined
function useProvider(ctor: BooleanConstructor, name?: string): boolean
function useProvider(ctor: NumberConstructor, configs: UseProviderConfigs): number | undefined
function useProvider(ctor: NumberConstructor, name?: string): number
function useProvider<T>(ctor: new (...a: any) => T, name?: string): T
function useProvider<T>(ctor: new (...a: any) => T, configs: UseProviderConfigs): T | undefined
function useProvider<T>(ctor: new (...a: any) => T, configs?: string | UseProviderConfigs): T | undefined {
  const name = typeof configs === 'string' ? configs : configs?.name
  const allowUndef = typeof configs === 'string' ? false : configs?.allowUndef ?? false
  const key = name ?? getObjectRuntimeName(ctor)
  return useNamedProvider(key, { allowUndef })
}

export default useProvider
export { UseProviderConfigs }
