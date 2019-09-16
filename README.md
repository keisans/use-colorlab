# use-colorlab

A custom React Hook that provides a context for color data. This is designed to be used with the export object from https://colorlab.dev 
## Installation

```
$ npm install use-colorlab
```

## Example

### Provider

```javascript
import {ColorProvider} from 'use-colorlab';

const colors = {
  red: {
    10: {
      hex: "#f00",
    },
    default: {
      hex: "#c00"
    }
  }
}

const App = () => (
  <ColorProvider colors={colors}>
    {/* ... */}
  </ColorProvider>
);
```

### Hook

Under the `ColorProvider` context, the `useColorlab` hook will give access to color functions

```javascript
import {useColorlab} from 'use-colorlab';

const MyComponent = () => {
  const {red} = useColorlab();
  return (
    <h1 style={{color: red()}}>Hello, world!</h1>
  )
}
```

The api for each color function takes the form of `[color](stop: number, format: string)`

```javascript
purple() // #6953eb - The hex code for the default stop
purple(80) // #3f20ba - Hex code for stop 80
purple('css') // rgb(105,83,235) - css rgb value for the default stop
purple(30, 'hsl') // hsl(246.23,81.05%,81.37%) - hsl value for stop 30
```


