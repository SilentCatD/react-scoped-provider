import { PropsWithChildren, useRef } from 'react'
import { Create } from '../types'
import { isCreate } from '../utils'
import { ProviderScope } from '../ProviderScope'

type ProviderProps<T> = {
  source: Create<T> | T
  name?: string
}
function Provider<T>({ source, children, name }: PropsWithChildren<ProviderProps<T>>): JSX.Element {
  const createdData = useRef(isCreate(source) ? source() : undefined)
  const valueData: T | undefined = isCreate(source) ? undefined : source
  return (
    <ProviderScope name={name} value={createdData.current ?? valueData}>
      {children}
    </ProviderScope>
  )
}

export type { ProviderProps }
export { Provider }
