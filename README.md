# @seberm/react-marquee

> React Marquee using GSAP

[![NPM](https://img.shields.io/npm/v/@seberm/react-marquee.svg)](https://www.npmjs.com/package/@seberm/react-marquee) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @seberm/react-marquee
```

## Usage

```jsx
import React, { Component } from 'react'

import Marquee from '@seberm/react-marquee'

const Example = () => {
  return (
    <Marquee spacing="20">
      <h2>Hello World<h2>
    </Marquee>
  )
}
```

## CSS

```css
.marquee-container, .marquee-wrap  {
  overflow:hidden;
}
.marquee {
  position:absolute;
}
```

## Props

| name | type | default | description | 
| --- | --- | --- | --- |
| reverse | boolean | false | animates from left to right | 
| separation | number | 0 | separation between each child in px |

## License

MIT © [Ermilin](https://github.com/Ermilin)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).
