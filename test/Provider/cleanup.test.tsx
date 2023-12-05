import { render } from '@testing-library/react'
import { Provider } from '../../src'

it('cleanup provided value', () => {
  const cleanUpFunc = jest.fn((value) => value)
  const { unmount } = render(
    <Provider source={'value'} cleanUp={cleanUpFunc}>
      <div></div>
    </Provider>,
  )
  unmount()
  expect(cleanUpFunc.mock.calls).toHaveLength(0)
})

class A {}

it('cleanup provided Create', () => {
  const instance = new A()
  const cleanUpFunc = jest.fn((value) => value)
  const { unmount } = render(
    <Provider source={() => instance} cleanUp={(value) => cleanUpFunc(value)}>
      <div></div>
    </Provider>,
  )
  unmount()
  expect(cleanUpFunc.mock.calls).toHaveLength(1)
  expect(cleanUpFunc.mock.calls[0][0]).toBe(instance)
})
