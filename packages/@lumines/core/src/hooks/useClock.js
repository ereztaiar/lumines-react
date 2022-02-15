import {useEffect, useState, useContext} from 'react';

const MAX_TICK_COUNT = 16;

const useClock = () => {

    const [tickCount, setTickCount] = useState(0);


    useEffect(() => {

        const interval = setInterval(() => {
            const nextTick = (tickCount + 1) < MAX_TICK_COUNT ? tickCount + 1 : 0;
            setTickCount(nextTick);
        }, 1000);

        return () => {
            clearInterval(interval);
        }
    }, [tickCount])


    return [tickCount];

}

export default useClock;