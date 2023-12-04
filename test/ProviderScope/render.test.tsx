import { getByTestId, render } from '@testing-library/react'
import { ProviderScope } from '../../src'
import { PropsWithChildren } from 'react'

const DisplayRendered = () => {
  return <h1 data-testid='text'>Rendered</h1>
}

const Nester = ({ children }: PropsWithChildren) => {
  return <div>{children}</div>
}

it('render without error', () => {
  const { container } = render(
    <ProviderScope value={'value'}>
      <Nester>
        <Nester>
          <Nester>
            <Nester>
              <DisplayRendered />
            </Nester>
          </Nester>
        </Nester>
      </Nester>
    </ProviderScope>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})

it('render with parent without error', () => {
  const { container } = render(
    <ProviderScope value={'parent data'}>
      <ProviderScope value={'value'}>
        <DisplayRendered />
      </ProviderScope>
    </ProviderScope>,
  )
  const rendered = getByTestId(container, 'text')
  const renderedText = rendered.textContent
  const expectedText = 'Rendered'
  expect(renderedText).toBe(expectedText)
})
