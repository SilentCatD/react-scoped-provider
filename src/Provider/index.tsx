import { ReactNode, useEffect, useRef } from 'react'
import { Create } from '../types'
import { getObjectRuntimeName, isCreate } from '../utils'
import { ProviderScope } from '../ProviderScope'

interface ProviderProps<T> {
  source: Create<T> | T
  cleanUp?: (data: T) => void
  name?: string
  children?: ReactNode
  ctor?: new (...a: any) => any
}

interface CreateProviderProps<T> extends ProviderProps<T> {
  source: Create<T>
  ctor?: new (...a: any) => T
}
interface ValueProviderProps<T> extends ProviderProps<T> {
  source: T
  cleanUp?: undefined
  ctor?: new (...a: any) => T
}

function Provider<T>(props: ValueProviderProps<T>): JSX.Element
function Provider<T>(props: CreateProviderProps<T>): JSX.Element
function Provider<T>({ source, cleanUp, children, name, ctor }: ProviderProps<T>): JSX.Element {
  const createdData = useRef(isCreate(source) ? source() : undefined)
  const valueData: T | undefined = isCreate(source) ? undefined : source
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      const currentData = createdData.current
      if (currentData !== undefined) {
        cleanUp?.(currentData)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <ProviderScope
      name={name ?? getObjectRuntimeName(ctor ?? createdData.current ?? valueData)}
      value={createdData.current ?? valueData}
    >
      {children}
    </ProviderScope>
  )
}

export type { ProviderProps, CreateProviderProps, ValueProviderProps }
export { Provider }
