import { ReactNode, useEffect, useRef } from 'react'
import { Create } from '../types'
import { isCreate } from '../utils'
import { ProviderScope } from '../ProviderScope'

interface ProviderProps<T> {
  source: Create<T> | T
  cleanUp?: (data: T) => void
  name?: string
  children?: ReactNode
}

interface CreateProviderProps<T> extends ProviderProps<T> {
  source: Create<T>
}
interface ValueProviderProps<T> extends ProviderProps<T> {
  source: T
  cleanUp?: undefined
}

function Provider<T>(props: ValueProviderProps<T>): JSX.Element
function Provider<T>(props: CreateProviderProps<T>): JSX.Element
function Provider<T>({ source, cleanUp, children, name }: ProviderProps<T>): JSX.Element {
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
    <ProviderScope name={name} value={createdData.current ?? valueData}>
      {children}
    </ProviderScope>
  )
}

export type { ProviderProps, CreateProviderProps, ValueProviderProps }
export { Provider }
