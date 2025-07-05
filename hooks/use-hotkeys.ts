"use client"

import { useEffect, useCallback } from "react"

type HotkeyCallback = (event: KeyboardEvent) => void

export function useHotkeys(keys: string[][], callback: HotkeyCallback) {
  const memoizedCallback = useCallback(callback, [callback])

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      for (const hotkey of keys) {
        const isPressed = hotkey.every((key) => {
          if (key.toLowerCase() === "ctrl") return event.ctrlKey
          if (key.toLowerCase() === "shift") return event.shiftKey
          if (key.toLowerCase() === "alt") return event.altKey
          return event.key.toLowerCase() === key.toLowerCase()
        })

        if (isPressed) {
          event.preventDefault()
          memoizedCallback(event)
          return
        }
      }
    }

    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [keys, memoizedCallback])
}
