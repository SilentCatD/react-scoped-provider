import { useNamedProvider } from '../hooks'
import { getObjectRuntimeName } from '../utils'

interface ConsumberProps<T> {
  children: (data: T) => JSX.Element
  name?: string
}

interface SpecializedNamed<T> extends ConsumberProps<T> {
  name: string
  ctor?: undefined
}
interface Specialized<T> extends ConsumberProps<T> {
  ctor: new (...a: any) => T
}
interface SpecializedString extends ConsumberProps<string> {
  ctor: StringConstructor
}
interface SpecializedBoolean extends ConsumberProps<boolean> {
  ctor: BooleanConstructor
}
interface SpecializedNumber extends ConsumberProps<number> {
  ctor: NumberConstructor
}

function Consumer(props: SpecializedBoolean): JSX.Element
function Consumer(props: SpecializedNumber): JSX.Element
function Consumer(props: SpecializedString): JSX.Element
function Consumer<T>(props: Specialized<T>): JSX.Element
function Consumer<T>(props: SpecializedNamed<T>): JSX.Element
function Consumer<T>(props: Specialized<T> | SpecializedNamed<T>): JSX.Element {
  const { children, name, ctor } = props
  const queryName = name ?? getObjectRuntimeName(ctor)
  const data = useNamedProvider<T>(queryName)
  return children(data)
}

export { Consumer }
export type { ConsumberProps }
