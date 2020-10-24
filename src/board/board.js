import React, {Component} from 'react';
import {connect} from "react-redux";
import {setHoverHold, setSelectedHold, setSelectedHoldList} from '../store/actions/board'
import {setTempLists} from '../store/actions/profile'
import {holdAsStr, dimHoldAsStr} from '../utils/general'
import svgHoldPaths from './svg_hold_paths'

class Board extends Component {

    handleHoldHover(holdInd) {
        this.props.setHoverHold({hoverHoldX: holdInd % this.props.xCoords.length,
                hoverHoldY: parseInt(holdInd / this.props.xCoords.length)})
    }

    handleHoldClick(holdInd) {
        const [xKey, yKey] = [holdInd % this.props.xCoords.length, parseInt(holdInd / this.props.xCoords.length)];
        const isSel = this.holdIsSelected(xKey, yKey);
        const inHoldSet = Object.keys(this.props.holdSet).includes(holdAsStr(xKey, yKey));

        if (this.props.currentAction === 'add' && inHoldSet) {
            const selHolds = this.props.selectedHoldXList.map(
                (v, i) => holdAsStr(v, this.props.selectedHoldYList[i])
            );
            if (!selHolds.includes(holdAsStr(xKey, yKey))) {
                this.props.setSelectedHoldList({
                    selectedHoldXList: [...this.props.selectedHoldXList, dimHoldAsStr(xKey)],
                    selectedHoldYList: [...this.props.selectedHoldYList, dimHoldAsStr(yKey)]
                })
            }
        }
        if (this.props.showProblemEdit && this.props.currentAction === 'problems' && this.props.selectedProblem) {
            let [xHolds, yHolds] = [
                this.props.selectedProblem.x_holds, this.props.selectedProblem.y_holds
            ];
            if (this.props.tempXList.length > 0) {
                [xHolds, yHolds] = [this.props.tempXList, this.props.tempYList]
            }
            let ind = 0;
            for (let val of xHolds) {
                if (val === dimHoldAsStr(xKey) && yHolds[ind] === dimHoldAsStr(yKey)) {
                    let newX = xHolds.filter((v, i) => i !== ind);
                    let newY = yHolds.filter((v, i) => i !== ind);
                    this.props.setTempLists({tempXList: newX, tempYList: newY});
                    return
                }
                ind++;
            }
            let newX = [...xHolds];
            newX.push(dimHoldAsStr(xKey));
            let newY = [...yHolds];
            newY.push(dimHoldAsStr(yKey));
            this.props.setTempLists({tempXList: newX, tempYList: newY});
        }
        this.props.setSelectedHold({selectedHoldX: isSel ? null : xKey, selectedHoldY: isSel ? null : yKey})
    }

    holdIsHovered(xKey, yKey) {
        if (this.props.selectedProblem && this.props.showProblemEdit) {
            return this.props.hoverHoldX === xKey && this.props.hoverHoldY === yKey
        }
        return ['setup', 'add'].includes(this.props.currentAction) && this.props.hoverHoldX === xKey &&
            this.props.hoverHoldY === yKey
    }

    holdIsSelected(xKey, yKey) {
        if (this.props.currentAction === 'add' || this.props.selectedProblem) {
            let ind = 0;
            let [xList, yList] = [this.props.selectedHoldXList, this.props.selectedHoldYList];
            if (this.props.selectedProblem) {
                [xList, yList] = [this.props.selectedProblem.x_holds, this.props.selectedProblem.y_holds]
                if (this.props.tempXList.length > 0) {
                    [xList, yList] = [this.props.tempXList, this.props.tempYList]
                }
            }
            for (let val of xList) {
                if (val === dimHoldAsStr(xKey) && yList[ind] === dimHoldAsStr(yKey)) {
                    return true
                }
                ind++;
            }
        }
        return this.props.currentAction === 'setup' && parseInt(this.props.selectedHoldX) === xKey &&
            parseInt(this.props.selectedHoldY) === yKey
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
        const holdSetBool = Object.keys(this.props.holdSet).length > 0;
        const boardFillColor = holdSetBool ? '#B8B8B8' : 'grey';
        const isEdit = this.props.showProblemEdit;

        return (
            <svg width={boardWidth} height={boardHeight} className='board' id='profile_board'>
                <rect
                    width={boardWidth} height={boardHeight}
                    stroke='#3333cc' fill={boardFillColor}
                />
                { grid.map((obj, ind) => {
                    const {x, y, holdKeyX, holdKeyY} = obj;
                    let holdMarker;
                    const svgDataInd = this.props.holdSet[holdAsStr(holdKeyX, holdKeyY)];
                    if (svgDataInd || svgDataInd === 0) {
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
                        if (this.props.currentAction === 'setup') {
                            selectdMark = (
                                <circle
                                    cx={x} cy={y} key={'outline' + ind}
                                    r="12" stroke='black' strokeWidth='2' fill='none'
                                />
                            );
                        }
                        if (svgDataInd || svgDataInd === 0) {
                            selectdMark = (
                                <rect width={26} height={26} x={x - 13} y={y - 13} stroke='green' fill='none'/>
                            )
                        }
                    }
                    let hoveredMark;
                    if (this.holdIsHovered(holdKeyX, holdKeyY)) {
                        if (!holdIsSelected && this.props.currentAction === 'setup') {
                            hoveredMark = (
                                <circle cx={x} cy={y} key={'hover' + ind}
                                        r="8" stroke='goldenrod' fill='none' strokeWidth='2' />
                            );
                        }
                        if (svgDataInd || svgDataInd === 0) {
                            let strokeColor = holdIsSelected ? 'green' : '#626b82';
                            if (isEdit) {
                                strokeColor = holdIsSelected ? 'orangered' : '#4A5FC2'
                            }
                            hoveredMark = (
                                <rect width={26} height={26} x={x - 13} y={y - 13} stroke={strokeColor} fill='none' />
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

const mapStateToProps = ({activity, auth, board, profile}) => {
    let selectedProblem;
    if (activity.selectedProblemId) {
        const flatProblems = Object.values(board.problems).flat();
        const ind = flatProblems.findIndex(obj => obj.id === activity.selectedProblemId);
        selectedProblem = flatProblems[ind]
    }
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
        selectedHoldXList: board.selectedHoldXList,
        selectedHoldYList: board.selectedHoldYList,
        holdSet: board.holdSet,
        problems: board.problems,
        grades: board.grades,
        selectedProblem: selectedProblem,
        showProblemEdit: activity.showProblemEdit,
        tempXList: profile.tempXList,
        tempYList: profile.tempYList
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setHoverHold: (val) => dispatch(setHoverHold(val)),
        setSelectedHold: (val) => dispatch(setSelectedHold(val)),
        setSelectedHoldList: (val) => dispatch(setSelectedHoldList(val)),
        setTempLists: (val) => dispatch(setTempLists(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Board)