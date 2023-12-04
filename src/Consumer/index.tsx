import { useNamedProvider } from '../hooks'
import { getObjectRuntimeName } from '../utils'

interface ConsumerProps<T> {
  children: (data: T) => JSX.Element
  name?: string
}

interface NamedConsumerProps<T> extends ConsumerProps<T> {
  name: string
  ctor?: undefined
}
interface CtorConsumerProps<T> extends ConsumerProps<T> {
  ctor: new (...a: any) => T
}
interface StringConsumerProps extends ConsumerProps<string> {
  ctor: StringConstructor
}
interface BooleanConsumerProps extends ConsumerProps<boolean> {
  ctor: BooleanConstructor
}
interface NumberConsumerProps extends ConsumerProps<number> {
  ctor: NumberConstructor
}

function Consumer(props: BooleanConsumerProps): JSX.Element
function Consumer(props: NumberConsumerProps): JSX.Element
function Consumer(props: StringConsumerProps): JSX.Element
function Consumer<T>(props: CtorConsumerProps<T>): JSX.Element
function Consumer<T>(props: NamedConsumerProps<T>): JSX.Element
function Consumer<T>(props: CtorConsumerProps<T> | NamedConsumerProps<T>): JSX.Element {
  const { children, name, ctor } = props
  const queryName = name ?? getObjectRuntimeName(ctor)
  const data = useNamedProvider<T>(queryName)
  return children(data)
}

export { Consumer }
export type {
  ConsumerProps,
  BooleanConsumerProps,
  NumberConsumerProps,
  StringConsumerProps,
  CtorConsumerProps,
  NamedConsumerProps,
}
