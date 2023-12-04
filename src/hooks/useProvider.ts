import { ProviderConfigs } from '../types'
import { getObjectRuntimeName } from '../utils'
import useNamedProvider from './useNamedProvider'

function useProvider(ctor: StringConstructor, name?: string): string
function useProvider(ctor: BooleanConstructor, name?: string): boolean
function useProvider(ctor: NumberConstructor, name?: string): number
function useProvider<T>(ctor: new (...a: any) => T, name?: string): T
function useProvider<T>(ctor: new (...a: any) => T, name?: string): T
function useProvider<T>(ctor: new (...a: any) => T, name?: string, configs?: ProviderConfigs): T | undefined
function useProvider<T>(ctor: new (...a: any) => T, name?: string, configs?: ProviderConfigs): T | undefined {
  const key = name ?? getObjectRuntimeName(ctor)
  return useNamedProvider(key, configs)
}

export default useProvider
