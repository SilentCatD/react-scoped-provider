import { fireEvent, getByTestId, render, waitFor } from '@testing-library/react'
import { PropsWithChildren, useState } from 'react'
import { Consumer, MultiProvider, Provider, ResourcesNotProvidedError, useProvider } from '../../src'

class Counter {
  count: number
  constructor(count: number) {
    this.count = count
  }
}

class CustomData {
  key: string
  value: string
  constructor(key: string, value: string) {
    this.key = key
    this.value = value
  }
}

const ProviderComponent = ({ children }: PropsWithChildren) => {
  return (
    <MultiProvider
      providers={[
        <Provider key={1} source={5} />,
        <Provider key={2} source={true} />,
        <Provider key={3} source={'test-text'} />,
        <Provider key={4} source={new Counter(6)} />,
        <Provider key={5} source={new CustomData('test-key', 'test-val')} name='custom' />,
      ]}
    >
      {children}
    </MultiProvider>
  )
}

const ComsumerComponent = () => {
  return (
    <>
      <Consumer ctor={Number}>{(number) => <h2 data-testid='number'>{number}</h2>}</Consumer>
      <Consumer ctor={Boolean}>{(boolean) => <h2 data-testid='boolean'>{boolean ? 'true' : 'false'}</h2>}</Consumer>
      <Consumer ctor={String}>{(text) => <h2 data-testid='text'>{text}</h2>}</Consumer>
      <Consumer ctor={Counter}>{(counter) => <h2 data-testid='count'>{counter.count}</h2>}</Consumer>
      <Consumer ctor={CustomData} name='custom'>
        {(customData) => <h2 data-testid='key'>{customData.key}</h2>}
      </Consumer>
      <Consumer ctor={CustomData} name='custom'>
        {(customData) => <h2 data-testid='value'>{customData.value}</h2>}
      </Consumer>
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
  const expectedText = 'test-text'
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

const UndefComsumerComponent = () => {
  return (
    <>
      <Consumer allowUndef ctor={Number}>
        {(number) => <h2 data-testid='number'>{number}</h2>}
      </Consumer>
      <Consumer allowUndef ctor={Boolean}>
        {(boolean) => <h2 data-testid='boolean'>{boolean ? 'true' : 'false'}</h2>}
      </Consumer>
      <Consumer allowUndef ctor={String}>
        {(text) => <h2 data-testid='text'>{text}</h2>}
      </Consumer>
      <Consumer allowUndef ctor={Counter}>
        {(counter) => <h2 data-testid='count'>{counter?.count}</h2>}
      </Consumer>
      <Consumer allowUndef ctor={CustomData} name='custom'>
        {(customData) => <h2 data-testid='key'>{customData?.key}</h2>}
      </Consumer>
      <Consumer allowUndef ctor={CustomData} name='custom'>
        {(customData) => <h2 data-testid='value'>{customData?.value}</h2>}
      </Consumer>
    </>
  )
}

it('not throw when not provided and allowUndef', () => {
  const { container } = render(<UndefComsumerComponent />)
  const renderedNumberElement = getByTestId(container, 'number')
  const renderedNumber = renderedNumberElement.textContent
  const expectedNumber = ''
  expect(renderedNumber).toBe(expectedNumber)

  const renderedBooleanElement = getByTestId(container, 'boolean')
  const renderedBoolean = renderedBooleanElement.textContent
  const expectedBoolean = 'false'
  expect(renderedBoolean).toBe(expectedBoolean)

  const renderedTextElement = getByTestId(container, 'text')
  const renderedText = renderedTextElement.textContent
  const expectedText = ''
  expect(renderedText).toBe(expectedText)

  const renderedCountElement = getByTestId(container, 'count')
  const renderedCount = renderedCountElement.textContent
  const expectedCount = ''
  expect(renderedCount).toBe(expectedCount)

  const renderedKeyElement = getByTestId(container, 'key')
  const renderedKey = renderedKeyElement.textContent
  const expectedKey = ''
  expect(renderedKey).toBe(expectedKey)

  const renderedValueElement = getByTestId(container, 'value')
  const renderedValue = renderedValueElement.textContent
  const expectedValue = ''
  expect(renderedValue).toBe(expectedValue)
})

it('not throw when provided and allowUndef', () => {
  const { container } = render(
    <ProviderComponent>
      <UndefComsumerComponent />
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
  const expectedText = 'test-text'
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

const ProviderComponent2 = ({ children }: PropsWithChildren) => {
  const [count, setCount] = useState(0)
  return (
    <Provider source={count}>
      <button data-testid='inc' onClick={() => setCount((value) => value + 1)}>
        Inc
      </button>
      {children}
    </Provider>
  )
}
const ComsumerComponent2 = () => {
  const number = useProvider(Number)
  return <h2 data-testid='number'>{number}</h2>
}

it('child component update when provided value changed', () => {
  const { container } = render(
    <ProviderComponent2>
      <ComsumerComponent2 />
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
    <Provider source={() => count}>
      <button data-testid='inc' onClick={() => setCount((value) => value + 1)}>
        Inc
      </button>
      {children}
    </Provider>
  )
}

const ComsumerComponent3 = () => {
  const number = useProvider(Number)
  return <h2 data-testid='number'>{number}</h2>
}

it('child component NOT update when provided Create changed', () => {
  const { container } = render(
    <ProviderComponent3>
      <ComsumerComponent3 />
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
