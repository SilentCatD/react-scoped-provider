import React from 'react'
import {
  CElement,
  DOMElement,
  DetailedReactHTMLElement,
  FunctionComponentElement,
  PropsWithChildren,
  ReactElement,
  ReactHTMLElement,
  ReactNode,
  ReactSVGElement,
} from 'react'

type ReceivableElement =
  | DetailedReactHTMLElement<any, any>
  | ReactHTMLElement<any>
  | ReactSVGElement
  | DOMElement<any, any>
  | FunctionComponentElement<any>
  | CElement<any, any>
  | ReactElement<any>
type MultiProviderProps = {
  providers: ReceivableElement[]
}
const MultiProvider: React.FC<PropsWithChildren<MultiProviderProps>> = ({ providers, children }) => {
  const renderNested = (nestedElements: ReceivableElement[], nestedChildren?: ReactNode): ReactElement | ReactNode => {
    const [currentElement, ...remainingElement] = nestedElements
    if (currentElement) {
      return React.cloneElement(currentElement, undefined, renderNested(remainingElement, nestedChildren))
    }
    return children
  }
  return renderNested(providers, children)
}
export type { ReceivableElement, MultiProviderProps as NestedProps }
export default MultiProvider
