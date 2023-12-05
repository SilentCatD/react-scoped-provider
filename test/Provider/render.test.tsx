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

it('render String ctor without error', () => {
  const { container } = render(
    <Provider ctor={String} source={'value'} name='value'>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('render Boolean ctor without error', () => {
  const { container } = render(
    <Provider ctor={Boolean} source={() => true} name='value'>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('render Number ctor without error', () => {
  const { container } = render(
    <Provider ctor={Number} source={5} name='value'>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('render Custom ctor without error', () => {
  const { container } = render(
    <Provider ctor={A} source={new B(5)} name='value'>
      <DisplayRendered />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

class A {
  count: number
  constructor(count: number) {
    this.count = count
  }
}

class B extends A {}
