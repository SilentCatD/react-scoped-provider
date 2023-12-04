import { useNamedProvider } from '../hooks'
import { getObjectRuntimeName } from '../utils'

interface ConsumberProps<T> {
  build: (data: T) => JSX.Element
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
  const { build, name, ctor } = props
  const queryName = name ?? getObjectRuntimeName(ctor)
  const data = useNamedProvider<T>(queryName)
  return build(data)
}

class A {
  count?: number
}
const t = () => {
  return <Consumer ctor={String} build={(value) => <>{value}</>} />
  return <Consumer ctor={Boolean} build={(value) => <>{value}</>} />
  return <Consumer ctor={String} build={(value) => <>{value}</>} />
  return <Consumer ctor={A} build={(value) => <>{value.count}</>} />
  return <Consumer<A> build={(value) => <>{value.count}</>} name='asdsa' />
  return <Consumer<A> name='asdsad' build={(data) => <>{data.count}</>} />
}
// function useProvider(ctor: StringConstructor, name?: string): string
// function useProvider(ctor: BooleanConstructor, name?: string): boolean
// function useProvider(ctor: NumberConstructor, name?: string): number
// function useProvider<T>(ctor: new (...a: any) => T, name?: string): T

export { Consumer }
export type { ConsumberProps }
