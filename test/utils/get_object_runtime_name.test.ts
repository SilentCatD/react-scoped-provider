import { getObjectRuntimeName } from '../../src/index'
class ThisIsClassName {}

it('Name of type is name of class', () => {
  const name = getObjectRuntimeName(ThisIsClassName)
  const expectedName = 'ThisIsClassName'
  expect(name).toBe(expectedName)
})

it('Name of instance is name of class', () => {
  const instance = new ThisIsClassName()
  const name = getObjectRuntimeName(instance)
  const expectedName = 'ThisIsClassName'
  expect(name).toBe(expectedName)
})

it('Name of instance is name of type', () => {
  const instance = new ThisIsClassName()
  const instanceName = getObjectRuntimeName(instance)
  const typeName = getObjectRuntimeName(ThisIsClassName)
  expect(instanceName).toBe(typeName)
})
