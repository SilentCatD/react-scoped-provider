type Create<T> = () => T

// eslint-disable-next-line @typescript-eslint/ban-types
type Constructor<T> = Function & { prototype: T }

export type { Create, Constructor }
