import { Constructor } from '../types'
import { getObjectRuntimeName } from '../utils'
import useNamedProvider from './useNamedProvider'

interface UseProviderConfigs {
  allowUndef?: boolean
  name?: string
}

interface UseProviderConfigsAllowUndef extends UseProviderConfigs {
  allowUndef: true
}
interface UseProviderConfigsDisAllowUndef extends UseProviderConfigs {
  allowUndef?: false
}

function useProvider(ctor: StringConstructor, configs: UseProviderConfigsAllowUndef): string | undefined
function useProvider(ctor: StringConstructor, configs: UseProviderConfigsDisAllowUndef): string
function useProvider(ctor: StringConstructor, name?: string): string
function useProvider(ctor: BooleanConstructor, configs: UseProviderConfigsAllowUndef): boolean | undefined
function useProvider(ctor: BooleanConstructor, configs: UseProviderConfigsDisAllowUndef): boolean
function useProvider(ctor: BooleanConstructor, name?: string): boolean
function useProvider(ctor: NumberConstructor, configs: UseProviderConfigsAllowUndef): number | undefined
function useProvider(ctor: NumberConstructor, configs: UseProviderConfigsDisAllowUndef): number
function useProvider(ctor: NumberConstructor, name?: string): number
function useProvider<T>(ctor: Constructor<T>, configs: UseProviderConfigsAllowUndef): T | undefined
function useProvider<T>(ctor: Constructor<T>, configs: UseProviderConfigsDisAllowUndef): T
function useProvider<T>(ctor: Constructor<T>, name?: string): T
function useProvider<T>(ctor: Constructor<T>, configs?: string | UseProviderConfigs): T | undefined
function useProvider<T>(ctor: Constructor<T>, configs?: string | UseProviderConfigs): T | undefined {
  const name = typeof configs === 'string' ? configs : configs?.name
  const allowUndef = typeof configs === 'string' ? false : configs?.allowUndef ?? false
  const key = name ?? getObjectRuntimeName(ctor)
  return useNamedProvider(key, { allowUndef })
}

export default useProvider
export { UseProviderConfigsAllowUndef, UseProviderConfigsDisAllowUndef, UseProviderConfigs }
