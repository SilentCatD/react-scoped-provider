import MultiProvider, { ReceivableElement, MultiProviderProps } from './MultiProvider'
import {
  useProvider,
  useNamedProvider,
  UseNamedProviderConfig,
  UseNamedProviderConfigAllowUndef,
  UseNamedProviderConfigDisAllowUndef,
  UseProviderConfigsAllowUndef,
  UseProviderConfigsDisAllowUndef,
  UseProviderConfigs,
} from './hooks'
import { Provider, ProviderProps, CreateProviderProps, ValueProviderProps } from './Provider'
import { ContextData, ProviderContext } from './ProviderContext'
import { ProviderScope, ProviderScopeProps } from './ProviderScope'
import { ResourcesNotProvidedError } from './errors'
import { getObjectRuntimeName, isCreate } from './utils'
import { Create, Constructor } from './types'
import {
  Consumer,
  NumberConsumerAllowUndefProps,
  NumberConsumerDisAllowUndefProps,
  BooleanConsumerAllowUndefProps,
  BooleanConsumerDisAllowUndefProps,
  StringConsumerAllowUndefProps,
  StringConsumerDisAllowUndefProps,
  CtorConsumerAllowUndefProps,
  CtorConsumerDisAllowUndefProps,
  NamedConsumerDisAllowUndefProps,
  NamedConsumerAllowUndefProps,
} from './Consumer'
export { Consumer }
export type {
  NumberConsumerAllowUndefProps,
  NumberConsumerDisAllowUndefProps,
  BooleanConsumerAllowUndefProps,
  BooleanConsumerDisAllowUndefProps,
  StringConsumerAllowUndefProps,
  StringConsumerDisAllowUndefProps,
  CtorConsumerAllowUndefProps,
  CtorConsumerDisAllowUndefProps,
  NamedConsumerDisAllowUndefProps,
  NamedConsumerAllowUndefProps,
}
export type { Create, Constructor }
export { Provider }
export type { ProviderProps, CreateProviderProps, ValueProviderProps }
export { ProviderScope }
export type { ProviderScopeProps }
export { ProviderContext }
export type { ContextData }
export { useProvider, useNamedProvider }
export type {
  UseNamedProviderConfig,
  UseNamedProviderConfigAllowUndef,
  UseNamedProviderConfigDisAllowUndef,
  UseProviderConfigsAllowUndef,
  UseProviderConfigsDisAllowUndef,
  UseProviderConfigs,
}
export { MultiProvider }
export type { ReceivableElement, MultiProviderProps }
export { ResourcesNotProvidedError }
export { getObjectRuntimeName, isCreate }
