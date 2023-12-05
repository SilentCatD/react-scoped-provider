# React Scoped Provider

[![NPM version][npm-image]][npm-url]
[![codecov][codecov-image]][codecov-url]
[![npm bundle size][npm-bundle-size-image]][npm-bundle-size-url]
[![Build][github-build]][github-build-url]
[![License][github-license]][github-license-url]

[codecov-url]: https://codecov.io/gh/SilentCatD/react-scoped-provider
[codecov-image]: https://codecov.io/gh/SilentCatD/react-scoped-provider/graph/badge.svg?token=00KR3INR7I
[npm-url]: https://www.npmjs.com/package/react-scoped-provider
[npm-image]: https://img.shields.io/npm/v/react-scoped-provider
[npm-bundle-size-image]: https://img.shields.io/bundlephobia/min/react-scoped-provider
[npm-bundle-size-url]: https://bundlephobia.com/package/react-scoped-provider
[github-license]: https://img.shields.io/github/license/SilentCatD/react-scoped-provider
[github-license-url]: https://github.com/SilentCatD/react-scoped-provider/blob/main/LICENSE
[github-build]: https://github.com/SilentCatD/react-scoped-provider/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/SilentCatD/react-scoped-provider/actions/workflows/publish.yml

I've always appreciated the concept of scoped dependency injection because it offers a clear and understandable way to manage resources throughout the lifecycle of a component.

In particular, resources associated with the lifecycle of a view should be disposed of when the view is unmounted.

## Features

- Enables dependency injection without the need to manually create a `Context` for each `DataType`.
- Handles scenarios where dealing with multiple nested `Contexts` becomes cumbersome (often referred to as "Context hell").
- Provides a way to expose a value to a subtree and easily trigger a re-render with different data, similar to the traditional `Context` API.
- Offers the ability to expose a value to a subtree and maintain its persistence between renders.
- Ensures cleanup of provided resources when the `Provider` is unmounted.

## Usage

### Provider

#### Provide a value

Expose a value to a subtree, this is closest to a traditional `Context` API's `Provider`.
When used with `useState`, changes in this value may make dependent re-render with new data.

```tsx
<Provider source={"value"}>
    <Children />
</Provider>,
```

#### Provide a persisted instance

Expose a persisted instance between renders. This value will be kept with `useRef` and won't change between re-renders.

```tsx
<Provider source={()=> "value" }>
    <Children />
</Provider>,
```

These 2 two types only should be used one at a time for each `Provider` and kept it that way throughout the component's lifeCycle. Use them interchangeably may cause unexpected behavior.

#### Named Provider

Out of the box, the `Provider` component will auto infer the type of each passed-in value for `primitives` and `class`, then uses them as the `name` to query instances.

Generally, it will create a map in which the `key` will be the `name` of the type, and the `value` will be the actual injected value.

```
"tadaa" => "String" // typeof string
false => "Boolean" // typeof boolean
5 => "Number" // typeof number
new ThisIsClassName() => "ThisIsClassName" // Have to be defined with a `class` keyword
```

You can easily overwrite this default `name` with the parameter `name` in `ProviderProps`.

```tsx
<Provider source={"value"} name="value-key">
    <Children />
</Provider>,
```

For TypeScript `type` and `interface`, as these will be stripped when compiling to JavaScript, the custom `name` parameter becomes crucial for retrieving specified data.

```tsx
type CustomType = {value: string};
const data: CustomType = {value: "text"};

<Provider source={data} name="custom-data-type">
    <Children />
</Provider>,
```

This mechanism is important for retrieving the value later on, especially when dealing with complex type systems in TypeScript.

#### Scoped data overwrite

Be warned that providing duplicated `name` values for data may lead to overwrite behavior. If multiple instances of `Provider` use the same name for their data, the previous provided value with the same name will be replaced by the subsequent one.

```tsx
<Provider source={'firstValue'} name='sharedName'>
  <Provider source={'secondValue'} name='sharedName'>
    <Children />
  </Provider>
</Provider>
```

In the above example, the second `Provider` will replace the value provided by the first one, makes any children components using it will receive the value `secondValue`.

#### Clean up

Each `Provider` comes with a `cleanUp` function inside `ProviderProps`, providing a mechanism to clean up, dispose of, or perform operations on the data when the `Provider` is unmounted from the render-tree.

The `cleanUp` function is executed automatically when the `Provider` is unmounted to cleanup created resources, ensuring proper handling of resources associated with the provided data.

This function is only called for `Provider` with `Create<T>` or `()=> T` in the `source` params to cleanup persisted value. If you use `Provider` with a `source` of type `T`, cleanup function won't be called for that resources

```tsx
<Provider source={() => 'value'} cleanUp={(value : string)=> {
    // do something here
}}>
    <Children />
</Provider>,
```

You can customize the `cleanUp` function based on your specific needs, allowing you to perform cleanup operations tailored to the nature of the provided data.

### Retrieve data

Before retrieving data using hooks, ensure that the specified type is provided within the current subtree. If not, attempting to retrieve the data will result in an error, specifically the `ResourcesNotProvidedError`.

This error serves as a helpful reminder to verify that the necessary data has been provided to the current subtree.

#### Retrieving Primitive and Class Types

To retrieve `primitive` and `class` types, you can use the `useProvider` hook:

```tsx
const number = useProvider(Number) // return nearest provided number
const boolean = useProvider(Boolean) // return nearest provided boolean
const text = useProvider(String) // return nearest provided string
const customData = useProvider(ThisIsClassName) // return nearest provided instance of ThisIsClassName
```

Note that `ThisIsClassName` must be defined with the keyword `class`; this function is not compatible with `type` and `interface` in TypeScript.

By default, each of the above types will be converted to the default `name` used as `key` to query data:

```
Number => "Number"
Boolean => "Boolean"
String => "String"
ThisIsClassName => "ThisIsClassName"
```

You can customize this behavior by using the `name` parameter in `ProviderProps`. If you do, the data **must** be queried using the same specified name.

```tsx
<Provider source={42} name="MyNumber">
    <Children />
</Provider>,

const myNumber = useProvider(Number, 'MyNumber') // return 42
```

#### Retrieving Any Types by Name

Due to the fact that `type` and `interface` in TypeScript will be stripped during compilation, you can't directly use and pass them into the `useProvider` hook. Instead, you can utilize the `useNamedProvider` hook. The only difference is that you need to manually provide the name and type.

This hook works with a variety of `DataType`, including those supported by `useProvider`.

```tsx
<Provider source={42} name="MyNumber">
    <Children />
</Provider>,

const myNumber = useNamedProvider<number>('MyNumber') // return 42
```

```tsx
type CustomType = {value: string};
const data: CustomType = {value: "text"};

<Provider source={data} name="custom-data-type">
    <Children />
</Provider>,

const myNumber = useNamedProvider<CustomType>('custom-data-type') // return {value: "text"}
```

This allows you to dynamically retrieve values based on the specified name and type.

#### Consumer Component

Similar to the Context API, this library provides a `Consumer` component that corresponds to the hooks introduced above.

For both `primitive` and `class` types, akin to the `useProvider` hook, you can use:

```tsx
<Consumer ctor={Number}>{
  (number) =>
    // children

}</Consumer>

<Consumer ctor={Boolean}>{
  (boolean) =>
    // children

}</Consumer>

<Consumer ctor={String}>{
  (text) =>
    // children

}</Consumer>

<Consumer ctor={Counter}>{
  (counter) =>
    // children

}</Consumer>

<Consumer name='customCounterName' ctor={Counter}>{
  (counter) =>
    // children

}</Consumer>
```

For custom `type`, `interface`, or any of the types supported by the `useNamedProvider` hook, you can utilize the `Consumer` component as follows:

```tsx
<Consumer<number> name="customNumberName">{
  (number) =>
    // children

}</Consumer>

<Consumer<boolean> name="customBooleanName">{
  (boolean) =>
    // children

}</Consumer>

<Consumer<string> name="customTextName">{
  (text) =>
    // children

}</Consumer>

<Consumer<Counter> name="customCounterName">{
  (counter) =>
    // children

}</Consumer>

<Consumer<CustomDataType> name='customDataType'>{
  (customData) =>
    // children

}</Consumer>
```

### Allow undefined

Even though throwing `ResourcesNotProvidedError` when resources can't be located is the default behavior. You can change this to make `Consumer`, `useNamedProvider` and `useProvider` to return `undefined` instead with the `allowUndef` flag.

```tsx
// return type of `customData` will become `CustomData | undefined`
const customData = useProvider(CustomData, { allowUndef: true, name: 'custom' })
```

```tsx
// return type of `text` will become `string | undefined`
const text = useNamedProvider<string>('test-text', { allowUndef: true })
```

Try changing these flag to `false`, you will see returned type get updated.

For `Consumer`:

```tsx
// type of `customData` will become `CustomData | undefined`
<Consumer<CustomDataType> allowUndef name='customDataType'>{
  (customData) =>
    // children

}</Consumer>
```

```tsx
// type of `counter` will become `Counter | undefined`
<Consumer allowUndef name='customCounterName' ctor={Counter}>{
  (counter) =>
    // children

}</Consumer>
```

### Context hell

Deeply nested components wrapping each other to provide values can become hard to read and maintain, making the code more difficult to change the order, or add/remove providers. This challenge is commonly known as "Context hell."

This complexity can be simplified using the `MultiProvider` component.

```tsx
<MultiProvider
  providers={[
    <Provider source={0} />,
    <Provider source={'test-string'} />,
    <Provider source={true} />,
    <Provider source={() => new Counter(5)} />,
  ]}
>
  <Children />
</MultiProvider>
```

The above is equivalent to the traditional deeply nested structure:

```tsx
<Provider source={0}>
  <Provider source={'test-string'}>
    <Provider source={true}>
      <Provider source={() => new Counter(5)}>
        <Children /> // Children using provided values.
      </Provider>
    </Provider>
  </Provider>
</Provider>
```

Using `MultiProvider` improves code readability and maintainability, making it easier to manage a large number of providers.

## Conclusion

Thank you for exploring and learning about the features and capabilities of the React Scoped Provider library. With its intuitive API and components like `Provider`, `MultiProvider`, `useProvider`, and `useNamedProvider`, managing and injecting dependencies in your React application becomes more flexible and straightforward.

Whether you're dealing with complex type systems in TypeScript, avoiding "Context hell" with `MultiProvider`, or providing and retrieving data with specific names, React Scoped Provider aims to enhance the developer experience by offering a versatile and scalable solution.

I hope that this library proves valuable in your React projects. If you have any questions, encounter issues, or want to contribute, feel free to reach out to me. Happy coding!
