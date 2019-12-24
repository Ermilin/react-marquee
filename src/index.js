import React, { useRef, useEffect, useState, createRef, useLayoutEffect, useCallback } from 'react'
import gsap, { Linear } from 'gsap'
import 'gsap/ModifiersPlugin'

const Marquee = props => {
  const [cards, setCards] = useState([''])
  const [distance, setDistance] = useState(false)
  const [separation, setSeparation] = useState(false)

  let target = useRef(cards.map(() => createRef()))
  let speed = 20

  let isScrolling = null
  let reverse = false

  let tweenDistance = props.reverse ? separation * cards.length : -separation * cards.length
  let sensitivity = 0.001

  const animate = useCallback((e, i) => {
    for (let i = 0; i < cards.length; i++) {

      gsap.set(target.current[i], {
        x: (i + cards.length) * separation
      })

      gsap.to(target.current[i], speed, {
        repeat: -1,
        ease: Linear.easeNone,
        x: `+=${tweenDistance}`,
        modifiers: {
          x: x => {
            return x % tweenDistance
          }
        }
      })
    }
  }, [distance])

  useEffect(() => {
    if (distance) {
      animate()
    }
  }, [animate])

  useLayoutEffect(() => {
    addCards()
    let newSeparation = Math.round(target.current[0].clientWidth)
    setSeparation(newSeparation)
    setDistance(newSeparation * cards.length)
  }, [])


  const addCards = () => {
    let amountCalc = Math.ceil((window.innerWidth + target.current[0].clientWidth) / (target.current[0].clientWidth * cards.length))

    for (let i = cards.length; i < amountCalc; i++) {
      cards.push('')
    }
  }

  const playTween = () => {
    let allTweens = gsap.getAllTweens()
    for (let i = 0; i < allTweens.length; i++) {
      allTweens[i].play()
    }
  }

  const reverseTween = () => {
    let allTweens = gsap.getAllTweens()
    for (let i = 0; i < allTweens.length; i++) {
      allTweens[i].reverse()
    }
  }

  const checkScrollSpeed = ((settings) => {
    settings = settings || {}

    let lastPos, newPos, timer, delta,
      delay = settings.delay || 50 // ms

    const clear = () => {
      lastPos = null
      delta = 0
    }
    clear()

    return () => {
      newPos = window.scrollY
      if (lastPos != null) {
        delta = newPos - lastPos
      }
      if (delta < 0 && reverse === false) {
        reverse = true
      }
      if (delta > 0 && reverse === true) {
        reverse = false
      }
      lastPos = newPos
      clearTimeout(timer)
      timer = setTimeout(clear, delay)
      return delta
    }
  })()

  window.onscroll = () => {
    let allTweens = gsap.getAllTweens()
    let newPos = checkScrollSpeed()
    let min = 20 / 13.333
    // checks if user is scrolling up or down and sets value accordingly
    if (newPos < min && newPos > 0) {
      newPos = min
    } else if (newPos > -min && newPos < 0) {
      newPos = -min
    }

    if (allTweens.length) {
      let allTweens = gsap.getAllTweens()
      let progress = allTweens[0].progress()

      if (target) {
        for (let i = 0; i < allTweens.length; i++) {
          allTweens[i].pause()
          // boost progress to prevent tween from stopping when reversing past 0 progress
          allTweens[i].progress(9999)
          allTweens[i].progress(progress + (newPos * sensitivity))
        }
      }
    }
  }
  window.addEventListener('scroll', () => {
    // Clear our timeout throughout the scroll
    window.clearTimeout(isScrolling)
    // Set a timeout to run after scrolling ends
    isScrolling = setTimeout(() => {
      let allTweens = gsap.getAllTweens()

      if (allTweens.length) reverse ? reverseTween() : playTween()
    }, 20)
  }, false)

  return (
    <>
      <div className='marquee-container'>
        <div className='marquee-wrap'
          style={{
            transform: `translateX(-${target.current[0].clientWidth}px)`,
            width: `${window.innerWidth + target.current[0].clientWidth}px`,
            height: `${target.current[0].clientHeight}px`
          }}
        >
          {cards.map((e, i) => (
            <div
              key={i}
              className='marquee'
              ref={e => target.current[i] = e}
              style={{
                paddingLeft: `${props.spacing}px`
              }}
            >
              {props.children}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}
export default Marquee
