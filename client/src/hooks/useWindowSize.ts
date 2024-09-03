'use client'
import { useEffect, useState } from 'react'

const browser = typeof window !== 'undefined'

const useWindowSize = (): number => {
  const [width, setWidth] = useState<number>(browser ? window.innerWidth : 0)

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth || 0)
    }

    handleResize()
    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return width
}

export default useWindowSize
