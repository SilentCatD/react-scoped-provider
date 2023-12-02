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

it('Primitive instance number name is Number', () => {
  const value = 5
  const valueName = getObjectRuntimeName(value)
  const expected = 'Number'
  expect(valueName).toBe(expected)
})

it('Primitive constructor Number name is Number', () => {
  const value = Number
  const valueName = getObjectRuntimeName(value)
  const expected = 'Number'
  expect(valueName).toBe(expected)
})

it('Primitive instance number name is the same with constructor Number', () => {
  const instance = 5
  const instanceName = getObjectRuntimeName(instance)
  const className = getObjectRuntimeName(Number)
  expect(instanceName).toBe(className)
})

it('Primitive instance string name is String', () => {
  const value = 'test'
  const valueName = getObjectRuntimeName(value)
  const expected = 'String'
  expect(valueName).toBe(expected)
})

it('Primitive constructor String name is String', () => {
  const value = String
  const valueName = getObjectRuntimeName(value)
  const expected = 'String'
  expect(valueName).toBe(expected)
})

it('Primitive instance string name is the same with constructor String', () => {
  const instance = 'test'
  const instanceName = getObjectRuntimeName(instance)
  const className = getObjectRuntimeName(String)
  expect(instanceName).toBe(className)
})

it('Primitive constructor Boolean name is Boolean', () => {
  const value = Boolean
  const valueName = getObjectRuntimeName(value)
  const expected = 'Boolean'
  expect(valueName).toBe(expected)
})

it('Primitive instance boolean name is Boolean', () => {
  const value = true
  const valueName = getObjectRuntimeName(value)
  const expected = 'Boolean'
  expect(valueName).toBe(expected)
})

it('Primitive instance boolean name is the same with constructor Boolean', () => {
  const instance = 'test'
  const instanceName = getObjectRuntimeName(instance)
  const className = getObjectRuntimeName(String)
  expect(instanceName).toBe(className)
})
