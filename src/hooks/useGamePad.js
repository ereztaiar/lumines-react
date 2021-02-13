import {useEffect} from 'react';

const useGamePad = (callback = () => { }) =>{

    const keyDownHandler = ({ key }) => {
        const gp = navigator.getGamepads()[0];
        for(let button of gp.buttons){
            if(button.pressed) {
                console.log(button.value)
            }
        }
        // console.log(
        //     gp.index, gp.id,
        //     gp.buttons.length, gp.axes.length);
        //callbackDown(key);
    };

    useEffect(()=>{
        window.addEventListener('gamepadconnected', keyDownHandler);
        return () => {
            window.removeEventListener('gamepadconnected', keyDownHandler);
        }
    })
};


export default useGamePad;