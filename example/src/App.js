import React, { useState } from 'react'
import Marquee from '@seberm/react-marquee'

const App = () => {
  const [toggle, setToggle] = useState(false)

  return (
    <>
      <Marquee spacing="50">
        <h2>Sebooster</h2>
      </Marquee>
      <Marquee spacing="50" reverse>
        <h2>Hej</h2>
      </Marquee>

      <button onClick={() => setToggle(!toggle)}>toggle</button>
      <h1>toggled: {toggle ? 'true' : 'false'}</h1>
    </>
  )
}
export default App