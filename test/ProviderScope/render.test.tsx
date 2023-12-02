import { getByTestId, render } from '@testing-library/react'
import { ProviderScope } from '../../src'

const DisplayRendered = () => {
  return <h1 data-testid='text'>Rendered</h1>
}

it('render without error', () => {
  const { container } = render(
    <ProviderScope value={'value'}>
      <DisplayRendered />
    </ProviderScope>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})
