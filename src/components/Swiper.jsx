import React, {useState, useEffect} from 'react';

const MAX_WIDTH = 12.5;
const MAX_TICK = 160;

const Swiper = props => {

    const {
        tick,
        deleted,
        score = false,
        styles: {
            swiperStyle
        }
    } = props;

    const [style, setStyle] = useState({
        left: "0%",
        width: `${MAX_WIDTH}%`,
        transform: `translateX(-100%)`
    });

    useEffect(() => {
        const left = (100 * tick) / MAX_TICK;
        setStyle({
            ...style,
            left: `${left}%`
        })

        return () => {

        }
    }, [tick]);

    return (
        <div id={swiperStyle.swiper} style={style}>
            {score && <div className={swiperStyle.deleted}>
                <div className={swiperStyle.score}>{deleted}</div>
                <svg version="1.1" id={swiperStyle.arrow} xmlns="http://www.w3.org/2000/svg"
                     xmlnsXlink="http://www.w3.org/1999/xlink" height={"25"} width={"15"}>
                    <polygon points={"0,0 15,12.5 0,25"} style={{fill: "black", stroke: "#fa7f03", strokeWidth: 2}}/>
                </svg>
            </div>}
        </div>
    );
}

export default Swiper;