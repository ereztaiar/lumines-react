import {useEffect, useState} from "react";
import * as defaultSkin from 'Skins/default';
import * as purple from 'Skins/purple';
import * as yellow from 'Skins/yellow';
import useKey from "./useKey";

const skins = [
    defaultSkin,
    purple,
    yellow
];

const useSkin = () => {
    const [skinIndex, setSkinIndex] = useState(0);
    const [skin, setSkin] = useState(skins[0]);

    useKey((key) => {
        if (key === 's') {
            setSkinIndex(skinIndex + 1);
        }
    });

    useEffect(() => {
        setSkin(
            skins[skinIndex % skins.length]
        );
    }, [skin, skinIndex]);

    return {
        skin
    }
};

export default useSkin;