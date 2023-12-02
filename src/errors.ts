class ResourcesNotProvidedError extends Error {
  constructor(name: string) {
    super(`Can't find ${name} in scope, make sure it is provided.`)
    Object.setPrototypeOf(this, ResourcesNotProvidedError.prototype)
  }
}

export { ResourcesNotProvidedError }
