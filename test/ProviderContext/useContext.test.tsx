import { useContext } from 'react'
import { ProviderContext, ProviderScope, getObjectRuntimeName } from '../../src'
import { getByTestId, render } from '@testing-library/react'

const DisplayRendered = () => {
  const data = useContext(ProviderContext)
  const key = getObjectRuntimeName(String)
  const renderData: string | undefined = data?.data.get(key)
  return <h1 data-testid='text'>{renderData}</h1>
}

const DisplayNamedRendered = () => {
  const data = useContext(ProviderContext)
  const renderData: string | undefined = data?.data.get('value')
  return <h1 data-testid='text'>{renderData}</h1>
}

it('useContext is usable with global ProviderContext', () => {
  const textToRender: string = 'Rendered'
  const { container } = render(
    <ProviderScope value={textToRender}>
      <DisplayRendered />
    </ProviderScope>,
  )

  const element = getByTestId(container, 'text')
  const renderedText = element.textContent
  const expected = textToRender
  expect(renderedText).toBe(expected)
})

it('scoped replace behavior', () => {
  const textToRenderParent: string = 'RenderedParent'
  const textToRenderChildren: string = 'RenderedChildren'
  const { container } = render(
    <ProviderScope value={textToRenderParent}>
      <ProviderScope value={textToRenderChildren}>
        <DisplayRendered />
      </ProviderScope>
    </ProviderScope>,
  )

  const element = getByTestId(container, 'text')
  const renderedText = element.textContent
  const expected = textToRenderChildren
  expect(renderedText).toBe(expected)
})

it('named Provider get string data without error', () => {
  const textToRender: string = 'Rendered'
  const { container } = render(
    <ProviderScope value={textToRender} name='value'>
      <DisplayNamedRendered />
    </ProviderScope>,
  )

  const element = getByTestId(container, 'text')
  const renderedText = element.textContent
  const expected = textToRender
  expect(renderedText).toBe(expected)
})
