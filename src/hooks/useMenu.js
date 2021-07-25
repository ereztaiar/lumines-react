import {useState} from "react";

const useMenu = props => {
    const [menuActive , setMenuActive] = useState(true);

    return [
        menuActive
    ];
}

export default useMenu;