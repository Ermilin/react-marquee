import React from 'react'
import { useMyHook } from '@seberm/react-marquee'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App