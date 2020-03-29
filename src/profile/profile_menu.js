import React, {useState} from 'react';
import { Modal, Alert } from 'reactstrap';
import { Formik, Field } from 'formik';
import ProfileSettings from './profile_settings'
import { ProfileInfo } from '../schemas/profile'

const ProfileMenu = ({ toggle, isOpen, handleSave, profileData, setShowSettings, showSettings, postNewEmail,
                         confirmAccountDelete, requestVerificationEmail, verificationEmailSent, handleLogout }) => {

    const updateSuccess = profileData.profileUpdateSuccess;
    const updateFailure = profileData.profileUpdateFailure;
    const [emailEditMode, setEmailEditMode] = useState(false);
    const [showDelConfirm, setShowDelConfirm] = useState(false);

    if (showDelConfirm) {
        return (
            <Modal isOpen={showDelConfirm} toggle={() => setShowDelConfirm(!showDelConfirm)} className='max-width-250'>
                <h5 className='acc-del-text'>Confirm profile deletion</h5>
                <div className='left-28'>
                    <button type="button" className='del-acc-btn'
                            onClick={() => {confirmAccountDelete(); handleLogout()}}
                    >OK</button>
                    <button type="button" className='del-acc-btn' onClick={()=> setShowDelConfirm(false)}
                    >Cancel</button>
                </div>
            </Modal>
        );
    }

    let settingsArea;
    if (!showSettings) {
        settingsArea = (<span role="img" aria-label="palette" className='right-18 csr-pt'
                              onClick={() => setShowSettings(true)}>&#x2699; Profile settings</span>)
    } else {
        settingsArea = (
            <ProfileSettings
                email={profileData.email}
                isVerified={profileData.is_verified}
                editMode={emailEditMode}
                setEditMode={setEmailEditMode}
                postNewEmail={postNewEmail}
            />)
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle} className="max-width-320">
            <Formik
                enableReinitialize
                initialValues={{
                    birthYear: profileData.birth_year,
                    gender: profileData.gender,
                    height: profileData.height
                }}
                validationSchema={ProfileInfo}
                onSubmit={(val) => handleSave(val)}
            >
                {props => {
                    const startYear = new Date().getFullYear() - 98;
                    const years = Array.from(new Array(80),(val, index) => index + startYear);
                    const heights = Array.from(new Array(90),(val, index) => index + 130);
                    return (
                        <div className="card">
                            <form onSubmit={props.handleSubmit}>
                                <label htmlFor="birthYear" >Year of birth</label>
                                <Field component="select" name="birthYear" selected={props.values.birthYear}
                                       className="profile-edit-field">
                                    <option value="0"> </option>
                                    {years.map((year, index) => {
                                        return <option key={`year${index}`} value={year}>{year}</option>
                                    })}
                                </Field>
                                <label htmlFor="gender" >Gender</label>
                                <Field component="select" selected={props.values.gender} name="gender"
                                       className="profile-edit-field">
                                    <option value=""> </option>
                                    <option value="m">Male</option>
                                    <option value="f">Female</option>
                                </Field>
                                <label htmlFor="height" >Height (cm)</label>
                                <Field component="select" selected={props.values.height} name="height"
                                       className="profile-edit-field">
                                    <option value="0"> </option>
                                    {heights.map((height, index) => {
                                        return <option key={`height${index}`} value={height}>{height}</option>
                                    })}
                                </Field>
                                <button type="submit" className="form-submit top-10 bottom-14">Save changes</button>
                            </form>
                            { ( updateSuccess || updateFailure ) && (
                                <Alert className="profile-edit-alert" color={updateSuccess ? "info" : "warning"}
                                >{updateSuccess ? 'Successfully saved!' : 'Sorry, please try again later'}</Alert> ) }
                            { settingsArea }
                            { showSettings && !profileData.is_verified && (
                                    <Alert className="warn-not-verified" color="warning">Account not verified
                                        <span style={{float:'right'}}>
                                            <a onClick={requestVerificationEmail} className='send-ver'
                                            >Resend verification email</a>
                                        </span>
                                    </Alert> )}
                            { showSettings && verificationEmailSent && (
                                <Alert className="email-sent" color="success">Profile verification email sent</Alert> )}
                            { showSettings && (
                                <p className="del-acc" onClick={() => setShowDelConfirm(true)}>Delete my profile</p> )}
                        </div>
                    );
                }}
            </Formik>
        </Modal>
    );
};
export default ProfileMenu;