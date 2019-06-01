import { useEffect, useState, useRef } from 'react'
import { transformSeconds } from 'helper'

export const useInterval = (callback, active = false) => {
    const [isActive, setActive] = useState(active)
    const state = isActive ? 'running' : 'stopped'
    const callbackRef = useRef();

    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (isActive) {
            const id = setInterval(() => {
                if (state === 'running') {
                    callbackRef.current()
                }
            }, 1000);
            return () => clearInterval(id)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isActive])

    return { isActive, setActive, state }
}

export const useTimer = (active = false, elapsedSeconds = 0) => {
    const [seconds, setSeconds] = useState(elapsedSeconds)
    const { isActive, setActive, state } = useInterval(() => {
        setSeconds(previous => previous + 1)
    }, active);
    const enhancedState = (!isActive && seconds > 0 ? 'paused' : state);

    const toggle = (fn) => {
        setActive(isActive => {
            const newState = !isActive;
            fn && fn(newState)
            return newState
        })
    }

    const stop = (fn) => {
        fn && fn(seconds)
        setActive(false)
        setSeconds(0)
    }

    return {
        timer: transformSeconds(seconds),
        toggle,
        stop,
        state: enhancedState,
        totalSeconds: seconds
    };
}
