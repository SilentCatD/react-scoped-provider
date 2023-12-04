import { getByTestId, render } from '@testing-library/react'
import App from '../src/App'

test('inject success', () => {
  const { container } = render(<App />)

  const renderedNumberElement = getByTestId(container, 'counter-value')
  const renderedNumber = renderedNumberElement.textContent
  const expectedNumber = 'This should update on btn clicked: 0'
  expect(renderedNumber).toBe(expectedNumber)

  const renderedBooleanElement = getByTestId(container, 'boolean')
  const renderedBoolean = renderedBooleanElement.textContent
  const expectedBoolean = 'Provided Boolean: true'
  expect(renderedBoolean).toBe(expectedBoolean)

  const renderedTextElement = getByTestId(container, 'string')
  const renderedText = renderedTextElement.textContent
  const expectedText = 'Provided String: test-string'
  expect(renderedText).toBe(expectedText)

  const renderedCountElement = getByTestId(container, 'counter-create')
  const renderedCount = renderedCountElement.textContent
  const expectedCount = 'This should NOT update on btn clicked: 1'
  expect(renderedCount).toBe(expectedCount)

  const renderedCustomElement = getByTestId(container, 'custom-data')
  const renderedCustom = renderedCustomElement.textContent
  const expectedCustom = 'Custom data: 3-hello'
  expect(renderedCustom).toBe(expectedCustom)
})
