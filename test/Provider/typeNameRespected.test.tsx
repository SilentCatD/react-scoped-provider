import { getByTestId, render } from '@testing-library/react'
import { Provider, useNamedProvider } from '../../src'

const DisplayRendered = ({ name }: { name: string }) => {
  useNamedProvider(name)
  return <h1 data-testid='text'>Rendered</h1>
}

class SuperClass {
  count: number
  constructor(count: number) {
    this.count = count
  }
}

class SubClass extends SuperClass {}

it('respect Subclass type', () => {
  const { container } = render(
    <Provider source={new SubClass(5)}>
      <DisplayRendered name='SubClass' />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('respect Superclass ctor type', () => {
  const { container } = render(
    <Provider ctor={SuperClass} source={new SubClass(5)}>
      <DisplayRendered name='SuperClass' />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('respect specified name', () => {
  const { container } = render(
    <Provider ctor={SuperClass} source={new SubClass(5)} name='custom-name'>
      <DisplayRendered name='custom-name' />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})
