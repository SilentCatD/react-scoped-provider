import { getByTestId, render } from '@testing-library/react'
import { Provider } from '../../src'

const DisplayRendered = () => {
  return <h1 data-testid='text'>Rendered</h1>
}

it('render provided value without error', () => {
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
it('render name provided value without error', () => {
  const { container } = render(
    <Provider source={'value'} name='value'>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('render provided create without error', () => {
  const { container } = render(
    <Provider source={() => 'value'}>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('render name provided create without error', () => {
  const { container } = render(
    <Provider source={() => 'value'} name='value'>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})
