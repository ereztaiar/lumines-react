import {useEffect, useRef} from 'react';

const useKey = (callbackDown = () => { }, callbackUp = () =>{}) =>{

    // Keep the latest callbacks in refs so the window listeners below can be
    // attached once on mount instead of being torn down and rebuilt on every
    // render. Re-subscribing every render raced with high-frequency renders
    // (e.g. a held movement key re-rendering ~every tick) and could land a
    // real keyup in the gap between removeEventListener and the next
    // addEventListener, silently dropping it.
    const callbackDownRef = useRef(callbackDown);
    const callbackUpRef = useRef(callbackUp);

    useEffect(() => {
        callbackDownRef.current = callbackDown;
    }, [callbackDown]);

    useEffect(() => {
        callbackUpRef.current = callbackUp;
    }, [callbackUp]);

    useEffect(()=>{
        const keyDownHandler = ({ key, repeat, code }) => {
            callbackDownRef.current(key, repeat, code);
        };
        const keyUpHandler = ({ key, code }) => {
            callbackUpRef.current(key, code);
        };

        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);


        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);

        }
    }, [])
};

export default useKey;
