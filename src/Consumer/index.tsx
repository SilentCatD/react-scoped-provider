import { useNamedProvider } from '../hooks'
import { getObjectRuntimeName } from '../utils'

interface ConsumerProps<T> {
  children: (data: T) => JSX.Element
  name?: string
  ctor?: new (...a: any) => any
  allowUndef?: boolean
}

interface NamedConsumerProps<T> extends ConsumerProps<T> {
  name: string
  ctor?: undefined
}

interface NamedConsumerAllowUndefProps<T> extends NamedConsumerProps<T | undefined> {
  allowUndef: true
}

interface NamedConsumerDisAllowUndefProps<T> extends NamedConsumerProps<T> {
  allowUndef?: false
}

interface CtorConsumerProps<T> extends ConsumerProps<T> {
  ctor: new (...a: any) => T
}

interface CtorConsumerAllowUndefProps<T> extends CtorConsumerProps<T | undefined> {
  allowUndef: true
}

interface CtorConsumerDisAllowUndefProps<T> extends CtorConsumerProps<T> {
  allowUndef?: false
}

interface StringConsumerProps<T> extends ConsumerProps<T> {
  ctor: StringConstructor
}

interface StringConsumerAllowUndefProps extends StringConsumerProps<string | undefined> {
  allowUndef: true
}

interface StringConsumerDisAllowUndefProps extends StringConsumerProps<string> {
  allowUndef?: false
}
interface BooleanConsumerProps<T> extends ConsumerProps<T> {
  ctor: BooleanConstructor
}
interface BooleanConsumerAllowUndefProps extends BooleanConsumerProps<boolean | undefined> {
  allowUndef: true
}

interface BooleanConsumerDisAllowUndefProps extends BooleanConsumerProps<boolean> {
  allowUndef?: false
}
interface NumberConsumerProps<T> extends ConsumerProps<T> {
  ctor: NumberConstructor
}
interface NumberConsumerAllowUndefProps extends NumberConsumerProps<number | undefined> {
  allowUndef: true
}
interface NumberConsumerDisAllowUndefProps extends NumberConsumerProps<number> {
  allowUndef?: false
}

function Consumer(props: NumberConsumerAllowUndefProps): JSX.Element
function Consumer(props: NumberConsumerDisAllowUndefProps): JSX.Element
function Consumer(props: BooleanConsumerAllowUndefProps): JSX.Element
function Consumer(props: BooleanConsumerDisAllowUndefProps): JSX.Element
function Consumer(props: BooleanConsumerAllowUndefProps): JSX.Element
function Consumer(props: StringConsumerAllowUndefProps): JSX.Element
function Consumer(props: StringConsumerDisAllowUndefProps): JSX.Element
function Consumer(props: StringConsumerAllowUndefProps): JSX.Element
function Consumer<T>(props: CtorConsumerAllowUndefProps<T>): JSX.Element
function Consumer<T>(props: CtorConsumerDisAllowUndefProps<T>): JSX.Element
function Consumer<T>(props: NamedConsumerAllowUndefProps<T>): JSX.Element
function Consumer<T>(props: NamedConsumerDisAllowUndefProps<T>): JSX.Element
function Consumer<T>(props: ConsumerProps<T | undefined>): JSX.Element {
  const { children, name, ctor, allowUndef } = props
  const queryName = name ?? getObjectRuntimeName(ctor)
  const data = useNamedProvider<T>(queryName, { allowUndef })
  return children(data)
}

class A {}
type X = {}

const t = () => {
  return (
    <Consumer allowUndef={true} ctor={String} name='dasd'>
      {(value) => <>{value}</>}
    </Consumer>
  )
}

export { Consumer }
// export type {
//   BooleanConsumerProps,
//   UndefBooleanConsumerProps,
//   NumberConsumerProps,
//   UndefNumberConsumerProps,
//   StringConsumerProps,
//   UndefStringConsumerProps,
//   CtorConsumerProps,
//   UndefCtorConsumerProps,
//   NamedConsumerProps,
//   UndefNamedConsumerProps,
// }
