import { useEffect, useState, useRef, useCallback } from 'react'

export function useTimer(initialValue = 0, initialState = 'stopped', ms = 1000) {
    const [count, setCount] = useState(initialValue);
    const [state, setState] = useState(initialState);
    const intervalRef = useRef(null);

    const start = useCallback(() => {
        if (intervalRef.current !== null) {
            return;
        }
        intervalRef.current = setInterval(() => {
            setCount(c => c + 1);
        }, ms);
        setState('running');
    }, [ms]);

    const pause = useCallback(() => {
        if (intervalRef.current === null) {
            return;
        }
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setState('paused');
    }, []);

    const stop = useCallback(() => new Promise((resolve) => {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setCount((currentCount) => {
            resolve(currentCount)
            return 0
        });
        setState('stopped');
    }), []);

    const toggle = useCallback(() => {
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

export function useCombinedTimer(activeMode, onReset, elapsedSeconds = 0, elapsedBreakSeconds = 0) {
    const isWorkMode = activeMode === 'work';
    const isBreakMode = activeMode === 'break';
    const { count: workCount, toggle: toggleWork, stop: stopWork, state: workState } = useTimer(elapsedSeconds, isWorkMode ? 'running' : isBreakMode ? 'paused' : 'stopped');
    const { count: breakCount, toggle: toggleBreak, stop: stopBreak } = useTimer(elapsedBreakSeconds, isBreakMode ? 'running' : 'stopped');
    const isInit = useRef(activeMode === null);
    const isWorking = workState === 'running';
    const isPaused = workState === 'paused';
    const counter = isWorking ? workCount : isPaused ? breakCount : 0

    const toggle = useCallback(() => {
        if (isInit.current) {
            isInit.current = false
            toggleWork();
        } else {
            toggleWork();
            toggleBreak();
        }
    }, [toggleWork, toggleBreak]);

    const stop = useCallback(async () => {
        const workSecond = await stopWork();
        const breakSeconds = await stopBreak();
        onReset(workSecond, breakSeconds)
    }, [stopWork, stopBreak, onReset]);

    return { counter, toggle, stop, workState, isWorking, isPaused };
}
