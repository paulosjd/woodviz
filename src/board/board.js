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

        return (
            <svg width={boardWidth} height={boardHeight} className='board'>
                <rect width={boardWidth} height={boardHeight} stroke='#3333cc' fill='grey'/>
                {grid.map((obj, ind) => {
                    const {x, y, holdKeyX, holdKeyY} = obj;
                    const svgHoldTranslate = `${x + svgHoldPaths[12].xOffset},${y + svgHoldPaths[12].yOffset}`;
                    return (
                        <React.Fragment key={'frag' + ind}>
                            { this.holdIsSelected(holdKeyX, holdKeyY) && (
                                <circle
                                    cx={x} cy={y} key={'outline' + ind}
                                    r="12" stroke='black' strokeWidth='2' fill='none'
                                />) }
                            { this.holdIsHovered(holdKeyX, holdKeyY) && !this.holdIsSelected(holdKeyX, holdKeyY) && (
                                <circle
                                    cx={x} cy={y} key={'hover' + ind}
                                    r="8" stroke='goldenrod' fill='none' strokeWidth='2'
                                />) }
                            <circle
                                cx={x} cy={y} key={ind}
                                r="5" fill='#00cc00' stroke=":#006600"
                                onClick={() => this.handleHoldClick(ind)}
                                    onMouseOver={() => this.handleHoldHover(ind)}
                                    onMouseLeave={() => this.props.setHoverHold(
                                        {hoverHoldX: null, hoverHoldY: null}
                                        )}
                            />
                            <g transform={`translate(${svgHoldTranslate}) scale(0.100000,-0.100000)`}
                               fill="#000000" stroke="none">
                                {svgHoldPaths[12].pathDs.map((d, i) => (
                                    <path key={i} onMouseOver={() => console.log('mouseover1')} d={d} />)
                                )}
                            </g>
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