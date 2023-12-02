import { getByTestId, render } from '@testing-library/react'
import { Provider } from '../../src'

const DisplayRendered = () => {
  return <h1 data-testid='text'>Rendered</h1>
}

it('render without error', () => {
  const { container } = render(
    <Provider source={'value'}>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})
