import {useEffect, useState} from "react";
import * as defaultSkin from 'Skins/default';
import * as purple from 'Skins/purple';
import * as yellow from 'Skins/yellow';
import * as midnightNeon from 'Skins/midnight-neon';
import * as cherryBlossom from 'Skins/cherry-blossom';
import useKey from "@lumines/core/src/hooks/useKey";// todo: replace with context

const skins = [
    defaultSkin,
    purple,
    yellow,
    midnightNeon,
    cherryBlossom,
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
    }, [skinIndex]);


    useEffect(() => {
            if (score > 0 && score % 100 === 0) {
                setSkinIndex(prev => prev + 1);
            }
        },
        [score])

    return {
        skin
    }
};

export default useSkin;