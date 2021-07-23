import {useEffect, useState} from "react";
import * as defaultSkin from 'Skins/default';
import * as purple from 'Skins/purple';
import * as yellow from 'Skins/yellow';
import useKey from "Hooks/useKey";

const skins = [
    defaultSkin,
    purple,
    yellow
];

const useSkin = props => {

    const {score = 0} = props;
    const [skinIndex, setSkinIndex] = useState(0);
    const [skin, setSkin] = useState(skins[0]);


    useKey((key) => {
        if (key === 's') {
            setSkinIndex(skinIndex + 1);
        }
    });

    useEffect(() => {
        const newSkin = skins[skinIndex % skins.length];
        setSkin(
            newSkin
        );
    }, [skin, skinIndex]);


    useEffect(() => {
            if (score % 10) {
                setSkinIndex(skinIndex + 1);
            }
        },
        [score])

    return {
        skin
    }
};

export default useSkin;