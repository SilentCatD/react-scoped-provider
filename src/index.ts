import MultiProvider, { ReceivableElement, MultiProviderProps } from './MultiProvider'
import { useProvider, useNamedProvider } from './hooks'
import { Provider, ProviderProps } from './Provider'
import { ContextData, ProviderContext } from './ProviderContext'
import { ProviderScope, ProviderScopeProps } from './ProviderScope'
import { ResourcesNotProvidedError } from './errors'
import { getObjectRuntimeName, isCreate } from './utils'
import { Create } from './types'
import {
  Consumer,
  ConsumerProps,
  BooleanConsumerProps,
  NumberConsumerProps,
  StringConsumerProps,
  CtorConsumerProps,
  NamedConsumerProps,
} from './Consumer'
export { Consumer }
export type {
  ConsumerProps,
  BooleanConsumerProps,
  NumberConsumerProps,
  StringConsumerProps,
  CtorConsumerProps,
  NamedConsumerProps,
}
export { Create }
export { ProviderProps, Provider }
export { ProviderScope, ProviderScopeProps }
export { ProviderContext, ContextData }
export { useProvider, useNamedProvider }
export { MultiProvider, ReceivableElement, MultiProviderProps }
export { ResourcesNotProvidedError }
export { getObjectRuntimeName, isCreate }
