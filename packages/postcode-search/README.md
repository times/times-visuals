# Postcode search

> Postcode search UI element, with optional Postcodes.io integration

## Installation

```bash
# Yarn
$ yarn add @times-visuals/postcode-search

# npm
$ npm add @times-visuals/postcode-search
```

## Usage

### Postcodes.io

The [Postcodes.io](http://postcodes.io/) provider returns a standard response for most UK postcodes. The structure of the response object can be found on their website, under the `[GET] api.postcodes.io/postcodes/:postcode` lookup.

```js
import PostcodeSearch from "@times-visuals/postcode-search";

export default () => (
  <PostcodeSearch
    provider="postcodes.io"
    onLoad={response => {
      // `response` will be the value of the "result" property from the Postcodes.io API request
    }}
    onError={error => {
      // `error` is an instance of a JS Error
    }}
  />
);
```

### Custom provider

You can choose to provide your own request handler, if you want to connect the UI element up to your own API.

```js
import PostcodeSearch from "@times-visuals/postcode-search";

export default () => (
  <PostcodeSearch
    provider="custom"
    onRequest={input => Promise} // `input` is a string of the user's input, you must return a Promise with the response data
    onLoad={response => {
      // `response` will be the result of the Promise from your custom `onRequest` handler
    }}
    onError={error => {
      // `error` is an instance of a JS Error
    }}
  />
);
```
