import React, {useState} from 'react';
import svgHoldPaths from '../../board/svg_hold_paths'

const HoldSetupForm = ({selectedPanelHoldX, selectedPanelHoldY, setSelectedPanelHold, boardHoldIsSelected}) => {

    const [xHovInd, setXHoverInd] = useState(null);
    const [yHovInd, setYHoverInd] = useState(null);

    const xCoords = [16, 42, 69, 96, 123, 149, 176, 203, 230, 256, 283, 310, 337, 364];
    const yCoords = [16, 41, 66, 91, 116, 141, 167, 192, 217, 242, 267, 292, 318];
    const grid = [];
    yCoords.forEach((yVal, yInd) => {
        xCoords.forEach((xyVal, xInd) => {
            grid.push({x: xyVal, y: yVal, holdKeyX: xInd, holdKeyY: yInd})
        });
    });

    const holdIsSelected = (xKey, yKey) => {
        return selectedPanelHoldX === xKey && selectedPanelHoldY === yKey
    };

    const holdIsHovered = (xKey, yKey) => {
        return xHovInd === xKey && yHovInd === yKey
    };

    const handleSvgEvent = (event) => {
        if (event.type === 'mouseleave') {
            setXHoverInd(null);
            setYHoverInd(null);
            return
        }
        if (!boardHoldIsSelected) {
            return
        }
        let ctm = event.target.getScreenCTM();
        const [x, y] = [event.clientX - ctm.e, event.clientY - ctm.f];
        const unitWidth = event.target.clientWidth / xCoords.length;
        const unitHeight = event.target.clientHeight / yCoords.length;
        if (unitWidth && unitHeight) {
            const [xInd, yInd] = [parseInt(x / unitWidth), parseInt(y / unitHeight)];
            if (event.type === 'mousemove') {
                setXHoverInd(xInd);
                setYHoverInd(yInd);
            } else if (event.type === 'click') {
                setSelectedPanelHold({selectedPanelHoldX: xInd, selectedPanelHoldY: yInd})
            }
        }
    };

    return (
        <div className='all-holds'>
            <svg width={380} height={334}
                 onClick={handleSvgEvent}
                 onMouseLeave={handleSvgEvent}
                 onMouseMove={handleSvgEvent}
            >
                <rect width={380} height={334} stroke='#3333cc' fill='none'/>
                {grid.map((obj, ind) => {
                    if (!svgHoldPaths[ind]) {
                        return null;
                    }
                    const {x, y, holdKeyX, holdKeyY} = obj;
                    const svgHoldTranslate = `${x + svgHoldPaths[ind].xOffset},${y + svgHoldPaths[ind].yOffset}`;
                    return (
                        <React.Fragment key={'panelFrag' + ind}>
                            <g transform={`translate(${svgHoldTranslate}) scale(0.100000,-0.100000)`}
                               fill={boardHoldIsSelected ? "#000000" : 'grey'} stroke="none"
                            >
                                {svgHoldPaths[ind].pathDs.map((d, i) => (
                                    <path key={i} onMouseOver={() => console.log('mouseover1')} d={d} />)
                                )}
                            </g>
                            { holdIsSelected(holdKeyX, holdKeyY) && boardHoldIsSelected ? (
                                <rect width={26} height={26} x={x - 13} y={y - 13} stroke='green' fill='none'/> )
                            : holdIsHovered(holdKeyX, holdKeyY) && boardHoldIsSelected && (
                                <rect width={26} height={26} x={x - 13} y={y - 13} stroke='#a9bdd6' fill='none'/> ) }
                        </React.Fragment>

                    )})
                }
            </svg>
        </div>
    )
};

export default HoldSetupForm