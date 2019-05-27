import { useEffect, useState, useRef } from 'react'

const formatSeconds = (s) => {
    const minutes = Math.floor(s / 60) % 60;
    const hours = Math.floor(s / 3600);
    const seconds = s % 60;
    return { hours, minutes, seconds };
}

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

    const reset = () => {
        setActive(false)
        setSeconds(0)
    }

    return {
        timer: formatSeconds(seconds),
        toggle,
        reset,
        state
    };
}
