import React from 'react'
import Marquee from '@seberm/react-marquee'

const App = () => {

  return (
    <>
      <Marquee spacing="50">
        <h2>Sebooster</h2>
      </Marquee>
      <Marquee spacing="50" reverse>
        <h2>Hej</h2>
      </Marquee>
    </>
  )
}
export default App