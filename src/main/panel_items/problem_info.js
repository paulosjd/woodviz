import React from "react";

const ProblemInfo = ({problem, grade}) => {

    return (
        <React.Fragment>
            <div className='top30 left125'>
                <span>{problem.name}</span>
            </div>
            <table className='prob-info'>
                <tbody>
                <tr className="no-border">
                    <td>Grade</td>
                    <td>{grade}</td>
                </tr>
                </tbody>
            </table>
        </React.Fragment>
    )
};

export default ProblemInfo;
