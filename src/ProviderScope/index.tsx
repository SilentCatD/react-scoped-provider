import { PropsWithChildren, useContext } from 'react'
import { ProviderContext } from '../ProviderContext'
import { getObjectRuntimeName } from '../utils'

type ProviderScopeProps<T> = {
  value: T
  name?: string
}

function ProviderScope<T>({ children, value, name }: PropsWithChildren<ProviderScopeProps<T>>) {
  const parentDataContext = useContext(ProviderContext)
  let parentData: Map<any, any>
  if (parentDataContext?.data === undefined) {
    parentData = new Map()
  } else {
    parentData = new Map(parentDataContext.data)
  }

  const key = name ?? getObjectRuntimeName(value)
  parentData.set(key, value)
  return <ProviderContext.Provider value={{ data: parentData }}>{children}</ProviderContext.Provider>
}
export { ProviderScope }
export type { ProviderScopeProps }
