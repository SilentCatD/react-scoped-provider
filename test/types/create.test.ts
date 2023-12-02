import { Create } from '../../src'

it('Create<T> is function', () => {
  const data: Create<number> = () => 5
  const dataType = typeof data
  const expected = 'function'
  expect(dataType).toBe(expected)
})

it('callable Create<T> return correct value', () => {
  const data: Create<number> = () => 5
  const createdData = data()
  const expected = 5
  expect(createdData).toBe(expected)
})

it('callable Create<T> return correct type', () => {
  const data: Create<number> = () => 5
  const createdData = typeof data()
  const expected = 'number'
  expect(createdData).toBe(expected)
})
