import { ResourcesNotProvidedError } from '../../src/index'

it('error prototype is correct', () => {
  const errorIns = new ResourcesNotProvidedError('TestName')
  const errorPrototype = Object.getPrototypeOf(errorIns)
  const expected = ResourcesNotProvidedError.prototype
  expect(errorPrototype).toBe(expected)
})

it('error is correct instance', () => {
  const alwaysThrow = () => {
    throw new ResourcesNotProvidedError('TestName')
  }
  expect(alwaysThrow).toThrow(ResourcesNotProvidedError)
})

it('error message is correct', () => {
  const name = 'TestName'
  const errorIns = new ResourcesNotProvidedError(name)
  const errorMsg = errorIns.message
  const expected = `Can't find ${name} in scope, make sure it is provided.`
  expect(errorMsg).toBe(expected)
})
