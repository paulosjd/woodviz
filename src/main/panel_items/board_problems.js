import React, {Component} from 'react';
import {connect} from "react-redux";

class BoardProblems extends Component {

    // Show board holds num e.g. 8 X 10   select (with number of problems for each) ?? so if change grid know where have gone

    render() {
        return (
            <h4>Foo</h4>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

const mapDispatchToProps = dispatch => {
    return {

    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(BoardProblems);