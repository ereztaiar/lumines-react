import {useEffect, useContext} from 'react';
import context from "../context";


const useTimer = (callback = () => null, timeout) => {


    const {paused} = useContext(context);

    useEffect(() => {
        if (!paused) {
            const interval = setInterval(callback, timeout);
            return () => {
                clearInterval(interval);
            };
        }
    });

};

export default useTimer;