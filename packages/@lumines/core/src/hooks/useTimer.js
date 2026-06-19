import {useEffect, useRef, useContext} from 'react';
import context from "../context";


const useTimer = (callback = () => null, timeout) => {

    const {paused} = useContext(context);

    const callbackRef = useRef(callback);
    useEffect(() => {
        callbackRef.current = callback;
    }, [callback]);

    useEffect(() => {
        if (!paused) {
            const interval = setInterval(() => callbackRef.current(), timeout);
            return () => {
                clearInterval(interval);
            };
        }
    }, [timeout, paused]);

};

export default useTimer;