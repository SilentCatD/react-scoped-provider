import { useNamedProvider } from '../hooks'
import { getObjectRuntimeName } from '../utils'

interface UndefNamedConsumerProps<T> {
  children: (data?: T) => JSX.Element
  name: string
  ctor?: undefined
  allowUndef?: boolean
}

interface NamedConsumerProps<T> {
  children: (data: T) => JSX.Element
  name: string
  ctor?: undefined
  allowUndef?: false
}

interface UndefCtorConsumerProps<T> {
  children: (data?: T) => JSX.Element
  ctor: new (...a: any) => T
  name?: string
  allowUndef?: boolean
}

interface CtorConsumerProps<T> {
  children: (data: T) => JSX.Element
  ctor: new (...a: any) => T
  allowUndef?: false
  name?: string
}
interface StringConsumerProps {
  children: (data: string) => JSX.Element
  ctor: StringConstructor
  allowUndef?: false
  name?: string
}

interface UndefStringConsumerProps {
  children: (data?: string) => JSX.Element
  ctor: StringConstructor
  allowUndef?: boolean
  name?: string
}
interface BooleanConsumerProps {
  name?: string
  children: (data: boolean) => JSX.Element
  ctor: BooleanConstructor
  allowUndef?: false
}

interface UndefBooleanConsumerProps {
  name?: string
  children: (data?: boolean) => JSX.Element
  ctor: BooleanConstructor
  allowUndef?: boolean
}
interface NumberConsumerProps {
  name?: string
  children: (data: number) => JSX.Element
  ctor: NumberConstructor
  allowUndef?: false
}

interface UndefNumberConsumerProps {
  name?: string
  children: (data?: number) => JSX.Element
  ctor: NumberConstructor
  allowUndef?: boolean
}

function Consumer(props: BooleanConsumerProps): JSX.Element
function Consumer(props: UndefBooleanConsumerProps): JSX.Element
function Consumer(props: NumberConsumerProps): JSX.Element
function Consumer(props: UndefNumberConsumerProps): JSX.Element
function Consumer(props: StringConsumerProps): JSX.Element
function Consumer(props: UndefStringConsumerProps): JSX.Element
function Consumer<T>(props: CtorConsumerProps<T>): JSX.Element
function Consumer<T>(props: UndefCtorConsumerProps<T>): JSX.Element
function Consumer<T>(props: NamedConsumerProps<T>): JSX.Element
function Consumer<T>(props: UndefNamedConsumerProps<T>): JSX.Element
function Consumer<T>(props: UndefCtorConsumerProps<T> | UndefNamedConsumerProps<T>): JSX.Element {
  const { children, name, ctor, allowUndef = false } = props
  const queryName = name ?? getObjectRuntimeName(ctor)
  const data = useNamedProvider<T>(queryName, { allowUndef })
  return children(data)
}

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
