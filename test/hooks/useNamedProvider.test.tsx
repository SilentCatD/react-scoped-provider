import { PropsWithChildren, useState } from 'react'
import { MultiProvider, Provider, ResourcesNotProvidedError, useNamedProvider } from '../../src'
import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react'

const Nester = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>
}

class Counter {
  count: number
  constructor(count: number) {
    this.count = count
  }
}

type CustomData = {
  key: string
  value: string
}

const ProviderComponent = ({ children }: PropsWithChildren) => {
  return (
    <MultiProvider
      providers={[
        <Provider key={1} source={5} name='test-number' />,
        <Provider key={2} source={true} name='test-boolean' />,
        <Provider key={3} source={'test-text'} name='test-text' />,
        <Provider key={4} source={new Counter(6)} name='test-counter' />,
        <Provider key={5} source={{ key: 'test-key', value: 'test-val' }} name='test-custom' />,
      ]}
    >
      {children}
    </MultiProvider>
  )
}

const ComsumerComponent = () => {
  const number = useNamedProvider<number>('test-number')
  const boolean = useNamedProvider<boolean>('test-boolean')
  const text = useNamedProvider<string>('test-text')
  const counter = useNamedProvider<Counter>('test-counter')
  const customData = useNamedProvider<CustomData>('test-custom')
  return (
    <>
      <h2 data-testid='number'>{number}</h2>
      <h2 data-testid='boolean'>{boolean ? 'true' : 'false'}</h2>
      <h2 data-testid='text'>{text}</h2>
      <h2 data-testid='count'>{counter.count}</h2>
      <h2 data-testid='key'>{customData.key}</h2>
      <h2 data-testid='value'>{customData.value}</h2>
    </>
  )
}

it('can get provided data without error for primitives and class', () => {
  const { container } = render(
    <ProviderComponent>
      <ComsumerComponent />
    </ProviderComponent>,
  )
  const renderedNumberElement = getByTestId(container, 'number')
  const renderedNumber = renderedNumberElement.textContent
  const expectedNumber = '5'
  expect(renderedNumber).toBe(expectedNumber)

  const renderedBooleanElement = getByTestId(container, 'boolean')
  const renderedBoolean = renderedBooleanElement.textContent
  const expectedBoolean = 'true'
  expect(renderedBoolean).toBe(expectedBoolean)

  const renderedTextElement = getByTestId(container, 'text')
  const renderedText = renderedTextElement.textContent
  const expectedText = 'test-text a'
  expect(renderedText).toBe(expectedText)

  const renderedCountElement = getByTestId(container, 'count')
  const renderedCount = renderedCountElement.textContent
  const expectedCount = '6'
  expect(renderedCount).toBe(expectedCount)

  const renderedKeyElement = getByTestId(container, 'key')
  const renderedKey = renderedKeyElement.textContent
  const expectedKey = 'test-key'
  expect(renderedKey).toBe(expectedKey)

  const renderedValueElement = getByTestId(container, 'value')
  const renderedValue = renderedValueElement.textContent
  const expectedValue = 'test-val'
  expect(renderedValue).toBe(expectedValue)
})

it('throw when not provided', async () => {
  jest.spyOn(console, 'error').mockImplementation(() => jest.fn())

  const renderer = () => {
    render(<ComsumerComponent />)
  }
  await waitFor(() => expect(renderer).toThrow(ResourcesNotProvidedError))
  jest.restoreAllMocks()
})

const ProviderComponent2 = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0)
  return (
    <Provider source={count} name='test-count'>
      <button data-testid='inc' onClick={() => setCount((value) => value + 1)}>
        Inc
      </button>
      {children}
    </Provider>
  )
}

const ComsumerComponent2 = () => {
  const number = useNamedProvider<number>('test-count')
  return <h2 data-testid='number'>{number}</h2>
}

it('child component update when provided value changed', () => {
  const { container } = render(
    <ProviderComponent2>
      <Nester>
        <Nester>
          <Nester>
            <Nester>
              <Nester>
                <ComsumerComponent2 />
              </Nester>
            </Nester>
          </Nester>
        </Nester>
      </Nester>
    </ProviderComponent2>,
  )

  const btnElement = getByTestId(container, 'inc')
  const textElement = getByTestId(container, 'number')
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('1')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('2')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('3')
})

const ConsumerRepresenter2 = () => {
  return <ComsumerComponent2 />
}

it('child reoresenter component update when provided value changed', () => {
  const { container } = render(
    <ProviderComponent2>
      <ConsumerRepresenter2 />
    </ProviderComponent2>,
  )

  const btnElement = getByTestId(container, 'inc')
  const textElement = getByTestId(container, 'number')
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('1')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('2')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('3')
})

const ProviderComponent3 = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0)
  return (
    <Provider source={() => count} name='test-count'>
      <button data-testid='inc' onClick={() => setCount((value) => value + 1)}>
        Inc
      </button>
      {children}
    </Provider>
  )
}

const ComsumerComponent3 = () => {
  const number = useNamedProvider<number>('test-count')
  return <h2 data-testid='number'>{number}</h2>
}

it('child component NOT update when provided Create changed', () => {
  const { container } = render(
    <ProviderComponent3>
      <Nester>
        <Nester>
          <Nester>
            <Nester>
              <Nester>
                <ComsumerComponent3 />
              </Nester>
            </Nester>
          </Nester>
        </Nester>
      </Nester>
    </ProviderComponent3>,
  )

  const btnElement = getByTestId(container, 'inc')
  const textElement = getByTestId(container, 'number')
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('0')
})

const ConsumerRepresenter3 = () => {
  return <ComsumerComponent3 />
}

it('child representer component NOT update when provided Create changed', () => {
  const { container } = render(
    <ProviderComponent3>
      <ConsumerRepresenter3 />
    </ProviderComponent3>,
  )

  const btnElement = getByTestId(container, 'inc')
  const textElement = getByTestId(container, 'number')
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('0')

  fireEvent.click(btnElement)
  expect(textElement.textContent).toBe('0')
})
