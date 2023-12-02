import { Create, isCreate } from '../../src/index'

type CreateOrValue<T> = Create<T> | T

it('T is not Create, T is value', () => {
  const data: CreateOrValue<string> = 'data'
  const isCreateResult = isCreate(data)
  const expected = false
  expect(isCreateResult).toBe(expected)
})

it('T is Create, T is not value', () => {
  const data: CreateOrValue<string> = () => 'data'
  const isCreateResult = isCreate(data)
  const expected = true
  expect(isCreateResult).toBe(expected)
})
