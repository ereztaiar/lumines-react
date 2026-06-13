import {useEffect} from 'react';

const useKey = (callbackDown = () => { }, callbackUp = () =>{}) =>{

    const keyDownHandler = ({ key, repeat, code }) => {
        callbackDown(key, repeat, code);
    };
    const keyUpHandler = ({ key, code }) => {
        callbackUp(key, code);
    };



    useEffect(()=>{
        window.addEventListener('keydown', keyDownHandler);
        window.addEventListener('keyup', keyUpHandler);


        return () => {
            window.removeEventListener('keydown', keyDownHandler);
            window.removeEventListener('keyup', keyUpHandler);

        }
    })
};

export default useKey;