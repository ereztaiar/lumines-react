import {useEffect} from 'react';

const useKey = (callbackDown = () => { }, callbackUp = () =>{}) =>{

    const keyDownHandler = ({ key }) => {
        callbackDown(key);
    };
    const keyUpHandler = ({ key }) => {
        callbackUp(key);
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