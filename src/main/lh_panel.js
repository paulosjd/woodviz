import React, {Component} from 'react';
import {connect} from "react-redux";
import {Col} from 'reactstrap';
import {setShowRegForm, focusUsernameInput} from "../store/actions/auth";
import {setAction} from "../store/actions/activity";
import ActionItems from './panel_items/action_items'

class LeftHandPanel extends Component {

    render() {
        const intro = (
            <React.Fragment>
                <p style={{fontSize: 'small'}}>
                    <span className='link-text' onClick={() => this.props.setShowReg(true)}>Register</span> {'or '}
                    <span className='link-text' onClick={this.props.usernameFocus}> login</span>
                </p>
                <div className='bottom20'>
                    <span className='link-text small-font' data-field='username' onClick={this.props.helpClickHandler}>
                        Username reminder
                    </span>{'. '}
                    <span className='link-text small-font' data-field='password' onClick={this.props.helpClickHandler}>
                        Password reset
                    </span>.
                </div>
            </React.Fragment>
        );

        return (
            <Col xs={this.props.xs}>
                { intro }
                {/*{ this.state.selectedItem && (*/}
                {/*<button className='lg-back-btn' onClick={() => this.setSelectedItem('')} >Back</button>) }*/}
                <ActionItems
                    currentAction={this.props.currentAction}
                    setAction={this.props.setAction}
                />
            </Col>
        );
    }
}

const mapStateToProps = ({activity}) => {
    return {
        currentAction: activity.current,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        usernameFocus: () => dispatch(focusUsernameInput(true)),
        setShowReg: val => dispatch(setShowRegForm(val)),
        setAction: val => dispatch(setAction(val)),
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(LeftHandPanel);