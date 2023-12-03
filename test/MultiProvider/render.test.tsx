// able to render without error
// able to render all providers

import { getByTestId, render } from '@testing-library/react'
import { PropsWithChildren } from 'react'
import { MultiProvider } from '../../src'

const App = () => {
  return <h1 data-testid='app-text'>App</h1>
}

const Provider1 = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1 data-testid='provider1-text'>Provider1</h1>
      {children}
    </div>
  )
}

const Provider2 = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1 data-testid='provider2-text'>Provider2</h1>
      {children}
    </div>
  )
}
const Provider3 = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1 data-testid='provider3-text'>Provider3</h1>
      {children}
    </div>
  )
}
const Provider4 = ({ children }: PropsWithChildren) => {
  return (
    <div>
      <h1 data-testid='provider4-text'>Provider4</h1>
      {children}
    </div>
  )
}
it('render 1 level nested, main child rendered', () => {
  const { container } = render(
    <MultiProvider providers={[<Provider1 key={1} />]}>
      <App />
    </MultiProvider>,
  )

  const appTextElement = getByTestId(container, 'app-text')
  const appText = appTextElement.textContent
  const expected = 'App'
  expect(appText).toBe(expected)
})

it('render 1 level nested, level 1 child rendered', () => {
  const { container } = render(
    <MultiProvider providers={[<Provider1 key={1} />]}>
      <App />
    </MultiProvider>,
  )

  const textElement = getByTestId(container, 'provider1-text')
  const text = textElement.textContent
  const expected = 'Provider1'
  expect(text).toBe(expected)
})

it('render 4 level nested, all level child rendered', () => {
  const { container } = render(
    <MultiProvider
      providers={[<Provider1 key={1} />, <Provider2 key={2} />, <Provider3 key={3} />, <Provider4 key={4} />]}
    >
      <App />
    </MultiProvider>,
  )

  const appTextElement = getByTestId(container, 'app-text')
  const appText = appTextElement.textContent
  const expectedAppText = 'App'
  expect(appText).toBe(expectedAppText)

  const provider1TextElement = getByTestId(container, 'provider1-text')
  const provider1Text = provider1TextElement.textContent
  const expectedProvider1Text = 'Provider1'
  expect(provider1Text).toBe(expectedProvider1Text)

  const provider2TextElement = getByTestId(container, 'provider2-text')
  const provider2Text = provider2TextElement.textContent
  const expectedProvider2Text = 'Provider2'
  expect(provider2Text).toBe(expectedProvider2Text)

  const provider3TextElement = getByTestId(container, 'provider3-text')
  const provider3Text = provider3TextElement.textContent
  const expectedProvider3Text = 'Provider3'
  expect(provider3Text).toBe(expectedProvider3Text)

  const provider4TextElement = getByTestId(container, 'provider4-text')
  const provider4Text = provider4TextElement.textContent
  const expectedProvider4Text = 'Provider4'
  expect(provider4Text).toBe(expectedProvider4Text)
})
