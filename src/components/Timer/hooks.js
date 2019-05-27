import { useEffect, useState, useRef } from 'react'
import { transformSeconds } from 'helper'

export const useTimer = (active = false, elapsedSeconds = 0) => {
    const [seconds, setSeconds] = useState(elapsedSeconds)
    const [isActive, setActive] = useState(active)
    const intervalRef = useRef()
    const state = isActive ? 'running' : seconds > 0 ? 'paused' : 'stopped'

    useEffect(() => {
        if (isActive) {
            intervalRef.current = setInterval(() => {
                if (state === 'running') {
                    setSeconds(previous => previous + 1)
                }
            }, 1000);
            return () => {
                clearInterval(intervalRef.current)
            }
        }
        clearInterval(intervalRef.current)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive])

    const toggle = () => {
        setActive(isActive => !isActive)
    }

    const stop = () => {
        setActive(false)
        setSeconds(0)
    }

    return {
        timer: transformSeconds(seconds),
        toggle,
        stop,
        state,
        totalSeconds: seconds
    };
}
