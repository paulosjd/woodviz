import React, {Component} from 'react';
import {connect} from "react-redux";
import {setHoverHold, setSelectedHold} from '../store/actions/board'
import svgHoldPaths from './svg_hold_paths'

class Board extends Component {

    handleHoldHover(holdInd) {
        this.props.setHoverHold({hoverHoldX: holdInd % this.props.xCoords.length,
                hoverHoldY: parseInt(holdInd / this.props.xCoords.length)})
    }

    handleHoldClick(holdInd) {
        const [xKey, yKey] = [holdInd % this.props.xCoords.length, parseInt(holdInd / this.props.xCoords.length)];
        const isSel = this.holdIsSelected(xKey, yKey);
        this.props.setSelectedHold({selectedHoldX: isSel ? null : xKey, selectedHoldY: isSel ? null : yKey})
    }

    holdIsHovered(xKey, yKey) {
        return this.props.currentAction === 'setup' && this.props.hoverHoldX === xKey &&
            this.props.hoverHoldY === yKey
    }

    holdIsSelected(xKey, yKey) {
        return this.props.currentAction === 'setup' && this.props.selectedHoldX === xKey &&
            this.props.selectedHoldY === yKey
    }

    render() {
        const [xCoords, yCoords] = [this.props.xCoords, this.props.yCoords];
        const [boardWidth, boardHeight] = [400, 500];
        const grid = [];
        yCoords.forEach((yVal, yInd) => {
            xCoords.forEach((xyVal, xInd) => {
                grid.push({x: xyVal, y: yVal, holdKeyX: xInd, holdKeyY: yInd})
            });
        });

        // TODO  clear holds button (bottom left ?), alongside hide unset holds button

        const holdSetBool = Object.keys(this.props.holdSet).length > 0;
        const boardFillColor = holdSetBool ? '#B8B8B8' : 'grey';

        return (
            <svg width={boardWidth} height={boardHeight} className='board'>
                <rect
                    width={boardWidth} height={boardHeight}
                    stroke='#3333cc' fill={boardFillColor}
                />
                { grid.map((obj, ind) => {
                    const {x, y, holdKeyX, holdKeyY} = obj;
                    let holdMarker;
                    const svgDataInd = this.props.holdSet[''.concat(holdKeyX, holdKeyY)];
                    if (svgDataInd) {
                        const svgt = `${x + svgHoldPaths[svgDataInd].xOffset},${y + svgHoldPaths[svgDataInd].yOffset}`;
                        holdMarker = (
                            <React.Fragment>
                                <g
                                    transform={`translate(${svgt})scale(0.100000,-0.100000)`}
                                    fill="#353434" stroke="none"
                                >
                                {svgHoldPaths[svgDataInd].pathDs.map((d, i) => (
                                    <path
                                        key={i} d={d}
                                        onClick={() => this.handleHoldClick(ind)}
                                        onMouseOver={() => this.handleHoldHover(ind)}
                                        onMouseLeave={() => this.props.setHoverHold(
                                            {hoverHoldX: null, hoverHoldY: null}
                                        )}
                                    />

                                ))}
                            </g>
                        //    #470487 purple
                            </React.Fragment>
                        )
                    } else {
                        holdMarker = (
                            <React.Fragment>
                                <circle
                                    cx={x} cy={y} key={ind + 'a'} stroke='#006600'
                                    r={this.props.currentAction === 'setup' ? "5" : "3"}
                                    fill={this.props.currentAction === 'problems' ? '#f6ffdf' : '#dcffbc'}
                                    onClick={() => this.handleHoldClick(ind)}
                                    onMouseOver={() => this.handleHoldHover(ind)}
                                    onMouseLeave={() => this.props.setHoverHold(
                                        {hoverHoldX: null, hoverHoldY: null}
                                    )}
                                />
                                <circle
                                    cx={x} cy={y}  key={ind + 'b'} r="5"
                                    stroke={boardFillColor} fill='none' strokeWidth='2'
                                    onClick={() => this.handleHoldClick(ind)}
                                    onMouseOver={() => this.handleHoldHover(ind)}
                                    onMouseLeave={() => this.props.setHoverHold(
                                        {hoverHoldX: null, hoverHoldY: null}
                                    )}
                                />
                            </React.Fragment>
                        )
                    }
                    let selectdMark;
                    const holdIsSelected = this.holdIsSelected(holdKeyX, holdKeyY);
                    if (holdIsSelected) {
                        selectdMark = (
                            <circle
                                cx={x} cy={y} key={'outline' + ind}
                                r="12" stroke='black' strokeWidth='2' fill='none'
                            />
                        );
                        if (svgDataInd) {
                            selectdMark = (
                                <rect width={26} height={26} x={x - 13} y={y - 13} stroke='green' fill='none'/>
                            )
                        }
                    }
                    let hoveredMark;
                    if (this.holdIsHovered(holdKeyX, holdKeyY)) {
                        if (!holdIsSelected) {
                            hoveredMark = (
                                <circle cx={x} cy={y} key={'hover' + ind}
                                        r="8" stroke='goldenrod' fill='none' strokeWidth='2' />
                            );
                        }
                        if (svgDataInd) {
                            hoveredMark = (
                                <rect width={26} height={26} x={x - 13} y={y - 13}
                                      stroke={!holdIsSelected ? '#626b82' : 'green'} fill='none' />
                            )
                        }
                    }

                    return (
                        <React.Fragment key={'frag' + ind}>
                            { selectdMark }
                            { hoveredMark }
                            { holdMarker }
                        </React.Fragment>
                    )})
                }
            </svg>
        );
    }

}

const mapStateToProps = ({activity, auth, board}) => {
    return {
        isAuth: !!auth.user_id,
        currentAction: activity.current,
        username: auth.username,
        xCoords: board.xCoords,
        yCoords: board.yCoords,
        hoverHoldX: board.hoverHoldX,
        hoverHoldY: board.hoverHoldY,
        selectedHoldX: board.selectedHoldX,
        selectedHoldY: board.selectedHoldY,
        holdSet: board.holdSet,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setHoverHold: (val) => dispatch(setHoverHold(val)),
        setSelectedHold: (val) => dispatch(setSelectedHold(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)