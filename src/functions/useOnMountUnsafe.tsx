import React, { useRef, EffectCallback, useEffect} from "react"


export function useOnMountUnsafe(effect: EffectCallback) {
    const initialized = useRef(false)
  
    useEffect(() => {
      if (!initialized.current) {
        initialized.current = true
        effect()
      }
    }, [])
}