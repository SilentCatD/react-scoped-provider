import { createContext } from 'react'

type ContextData = {
  data: Map<any, any>
}

const ProviderContext = createContext<ContextData | undefined>(undefined)

export type { ContextData }
export { ProviderContext }
