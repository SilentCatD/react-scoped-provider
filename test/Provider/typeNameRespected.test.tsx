import { getByTestId, render } from '@testing-library/react'
import { Constructor, Provider, useNamedProvider, useProvider } from '../../src'

const DisplayRendered = ({ name }: { name: string }) => {
  useNamedProvider(name)
  return <h1 data-testid='text'>Rendered</h1>
}

const DisplayRenderedConstructor = ({ ctor }: { ctor: Constructor<any> }) => {
  useProvider(ctor)
  return <h1 data-testid='text'>Rendered</h1>
}
abstract class SuperClass {
  count: number
  constructor(count: number) {
    this.count = count
  }
}

class SubClass extends SuperClass {
  count2: number
  constructor(count2: number) {
    super(0)
    this.count2 = count2
  }
}

it('respect Subclass name', () => {
  const { container } = render(
    <Provider source={new SubClass(5)}>
      <DisplayRendered name={SubClass.name} />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('respect Superclass ctor name', () => {
  const { container } = render(
    <Provider name={SuperClass.name} source={new SubClass(5)}>
      <DisplayRendered name={SuperClass.name} />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('respect Subclass type', () => {
  const { container } = render(
    <Provider source={new SubClass(5)}>
      <DisplayRenderedConstructor ctor={SubClass} />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('respect Superclass ctor type', () => {
  const { container } = render(
    <Provider name={SuperClass.name} source={new SubClass(5)}>
      <DisplayRenderedConstructor ctor={SuperClass} />
    </Provider>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})
