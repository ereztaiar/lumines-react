import {useState} from "react";
import useKey from "Hooks/useKey";

const SPLASH = {
    ACTIVE: true,
    DISABLED: false
}

const useSplash = props =>{
    const [splash, setSplash] = useState(SPLASH.ACTIVE);
    useKey(key =>{
        if(key === ' '){
            setSplash(SPLASH.DISABLED)
        }
    });

    return [
        splash
    ]
};

export default useSplash;
