import { useEffect, useState, useRef, useCallback } from 'react'

export function useEnhancedTimer(initialValue = 0, active = false, ms = 1000) {
    const initialState = active ? 'running' : 'stopped'
    const [count, setCount] = useState(initialValue);
    const [state, setState] = useState(initialState);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        console.log('start')
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount(c => c + 1);
        }, ms);
        setState('running');
    }, [ms]);

    const pause = useCallback(() => {
        console.log('pause');
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setState('paused');
    }, []);

    const stop = useCallback((onStop) => {
        console.log('stop');
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCount((currentCount) => {
            onStop && onStop(currentCount)
            return 0
        });
        setState('stopped');
    }, []);

    const toggle = useCallback(() => {
        console.log('toggle', state)
        if (state === 'running') {
            pause();
        } else {
            start();
        }
    }, [pause, start, state]);

    useEffect(() => {
        if (initialState === 'running') {
            start();
        }
    }, [initialState, start]);

    return { count, toggle, start, pause, stop, state };
}

export function useCombinedTimer(active, onReset, elapsedSeconds = 0, elapsedBreakSeconds = 0) {
    const { count: workCount, toggle: toggleWork, stop: stopWork, state: workState } = useEnhancedTimer(elapsedSeconds, active)
    const { count: breakCount, toggle: toggleBreak, stop: stopBreak } = useEnhancedTimer(elapsedBreakSeconds)
    const isInit = useRef(!active);
    const isWorking = workState === 'running';
    const isPaused = workState === 'paused';
    const counter = isWorking ? workCount : isPaused ? breakCount : 0

    const toggle = useCallback(() => {
        console.log('onToggle');
        if (isInit.current) {
            isInit.current = false
            toggleWork();
        } else {
            toggleWork();
            toggleBreak();
        }
    }, [toggleWork, toggleBreak]);

    const stop = useCallback(() => {
        console.log('onStop');
        stopWork((workSecond) => {
            stopBreak((breakSeconds) => {
                onReset(workSecond, breakSeconds)
            });
        });
    }, [stopWork, stopBreak, onReset]);

    return { counter, toggle, stop, workState, isWorking, isPaused };
}