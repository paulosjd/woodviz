import React, {useState} from 'react';
import {Row, Col} from 'reactstrap';
import {xCoordsMap, yCoordsMap} from "../../store/constants/board";

const BoardPointsForm = ({xPtNum, yPtNum, updateBoardPoints}) => {

    const [xNum, setXNum] = useState(xPtNum);
    const [yNum, setYNum] = useState(yPtNum);

    return (
        <Row>
            <Col xs={8}>
                <div className='hold-nums'>
                    <label>Holds wide: </label>
                    <select
                        onChange={e => setXNum(e.target.value)}
                        value={xNum}
                    >
                        {Object.keys(xCoordsMap).map(x => {
                            return <option key={x} value={x}>{x}</option>;
                        })}
                    </select>
                    { xNum !== xPtNum && (
                        <label className='revert-symbol' onClick={() => setXNum(xPtNum)}>{'\ud83d\udd04'}</label>) }
                </div>
                <div className='hold-nums'>
                    <label>Holds high: </label>
                    <select
                        onChange={e => setYNum(e.target.value)}
                        value={yNum}
                        style={{marginLeft: 16}}
                    >
                        {Object.keys(yCoordsMap).map(x => {
                            return <option key={x} value={x}>{x}</option>;
                        })}
                    </select>
                    { yNum !== yPtNum && (
                        <label className='revert-symbol' onClick={() => setYNum(yPtNum)}>{'\ud83d\udd04'}</label>) }
                </div>
            </Col>
            <Col xs={4} className='pad-left-0'>
                { (yNum !== yPtNum || xNum !== xPtNum) && (
                    <button
                        onClick={() => updateBoardPoints({xNum, yNum})}
                        className='board-setup-btn'
                    >Save
                    </button>
                )}
            </Col>
        </Row>
    )
};

export default BoardPointsForm