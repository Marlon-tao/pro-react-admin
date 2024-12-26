import React, { useEffect, useRef, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'
import icons from './icons'
import styles from './index.module.less'

const setThresholds = (size, x, y) => {
  if (size === 'sm') {
    return {
      hoverX: x * 0.03,
      hoverY: y * 0.03,
    }
  }

  if (size === 'md') {
    return {
      hoverX: x * 0.06,
      hoverY: y * 0.06,
    }
  }

  if (size === 'lg') {
    return {
      hoverX: x * 0.1,
      hoverY: y * 0.1,
    }
  }
}

const DynamicBackground = () => {
  const [hasMounted, setHasMounted] = useState(false)
  const heroRef = useRef()
  const iconsRef = useRef([])
  const iconCount = icons?.length
  const { offsetWidth: width, offsetHeight: height } = heroRef?.current ?? {}

  const onHover = ({ clientX, clientY }) => {
    iconsRef.current.forEach((item) => {
      const { xPos, yPos } = item?.initialPositions ?? {}
      const size = item.size
      const { hoverX, hoverY } = setThresholds(size, clientX, clientY)

      if (item.refItem) {
        item.refItem.style.transform = `translate(${xPos + hoverX}px, ${yPos + hoverY}px)`
      }
    })
  }
  const onHoverDebounced = useDebouncedCallback(onHover, 10)

  useEffect(() => {
    setHasMounted(true)
    const refVal = heroRef?.current
    if (!refVal) return
    refVal.addEventListener('mousemove', onHoverDebounced)
    refVal.addEventListener('resize', onHoverDebounced)

    return () => {
      if (!refVal) return
      refVal.removeEventListener('mousemove', onHoverDebounced)
      refVal.removeEventListener('resize', onHoverDebounced)
    }
  }, [])

  return (
    <div className={styles.hero} ref={heroRef}>
      {hasMounted && (
        <div className={styles.iconLayer}>
          {icons.map(({ size, type, icon }, i) => {
            const rows = Math.ceil(Math.sqrt(iconCount))
            const cols = Math.ceil(iconCount / rows)

            const cellWidth = width / cols
            const cellHeight = height / rows

            const row = Math.floor(i / cols)
            const col = i % cols

            const xOffset = Math.random() * (cellWidth - 75)
            const yOffset = Math.random() * (cellHeight - 75)

            const baseX = col * cellWidth
            const baseY = row * cellHeight

            const xPos = baseX + xOffset
            const yPos = baseY + yOffset

            return (
              <span
                key={i}
                ref={(refItem) =>
                  (iconsRef.current[i] = {
                    refItem,
                    initialPositions: {
                      xPos,
                      yPos,
                    },
                    size,
                  })
                }
                className={`${styles.icon} ${styles[type]} ${styles[size]}`}
                style={{
                  transform: `translateX(${xPos}px) translateY(${yPos}px)`,
                }}
              >
                {icon && icon}
              </span>
            )
          })}
        </div>
      )}
      <div className={styles.heroText}>
        <h1>
          Grow your <br /> <span>Frontend Skills</span>
        </h1>
        <h3>
          with <span>React</span>, <span>Angular</span>, <span>Vue</span>, <span>Typescript</span>, <span>Redux</span>,{' '}
          <span>Node</span>, <span>GraphQL</span>,<span>CSS</span>, <span>HTML</span>, <span>Webpack</span>,{' '}
          <span>Rollup</span>, <span>ESLint</span>, <span>Prettier</span>, <span>Stylelint</span>,<span>PostCSS</span>,{' '}
          <span>Styled Components</span>, <span>Emotion</span>, <span>Material UI</span>, <span>Ant Design</span>,{' '}
          <span>Bootstrap</span>, <span>Foundation</span>,<span>React Native</span>, <span>Flutter</span>,{' '}
          <span>Python</span>, <span>Go</span>,<span>JavaScript</span>, and <span>NPM</span>
        </h3>
      </div>
    </div>
  )
}

export default DynamicBackground
