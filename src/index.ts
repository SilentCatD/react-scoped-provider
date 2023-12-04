import MultiProvider, { ReceivableElement, MultiProviderProps } from './MultiProvider'
import { useProvider, useNamedProvider, UseNamedProviderConfig, UseProviderConfigs } from './hooks'
import { Provider, ProviderProps } from './Provider'
import { ContextData, ProviderContext } from './ProviderContext'
import { ProviderScope, ProviderScopeProps } from './ProviderScope'
import { ResourcesNotProvidedError } from './errors'
import { getObjectRuntimeName, isCreate } from './utils'
import { Create } from './types'
import {
  Consumer,
  BooleanConsumerProps,
  UndefBooleanConsumerProps,
  NumberConsumerProps,
  UndefNumberConsumerProps,
  StringConsumerProps,
  UndefStringConsumerProps,
  CtorConsumerProps,
  UndefCtorConsumerProps,
  NamedConsumerProps,
  UndefNamedConsumerProps,
} from './Consumer'
export { Consumer }
export type {
  BooleanConsumerProps,
  UndefBooleanConsumerProps,
  NumberConsumerProps,
  UndefNumberConsumerProps,
  StringConsumerProps,
  UndefStringConsumerProps,
  CtorConsumerProps,
  UndefCtorConsumerProps,
  NamedConsumerProps,
  UndefNamedConsumerProps,
}
export { Create }
export { ProviderProps, Provider }
export { ProviderScope, ProviderScopeProps }
export { ProviderContext, ContextData }
export { useProvider, useNamedProvider, UseNamedProviderConfig, UseProviderConfigs }
export { MultiProvider, ReceivableElement, MultiProviderProps }
export { ResourcesNotProvidedError }
export { getObjectRuntimeName, isCreate }
