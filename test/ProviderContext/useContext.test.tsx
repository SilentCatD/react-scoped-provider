import { useContext } from 'react'
import { ProviderContext, ProviderScope, getObjectRuntimeName } from '../../src'
import { getByTestId, render } from '@testing-library/react'

const DisplayRendered = () => {
  const data = useContext(ProviderContext)
  const key = getObjectRuntimeName(String)
  const renderData: string | undefined = data?.data.get(key)
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
