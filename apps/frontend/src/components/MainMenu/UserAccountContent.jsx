import { useState, useCallback } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import FullName from "../GlobalFields/FullName";
import Email from "../GlobalFields/Email";
import Password from '../GlobalFields/Password';
import Thumbnail from '../GlobalFields/Thumbnail';


const ActionButton = styled(Button)({
    margin: '8px',
})

export default function UserAccountPopup({accountData}) {
    const [isDisabled, setIsDisabled] = useState(true);
    const [isEditDisplayed, setIsEditDisplayed] = useState(true);
    const [isSaveDisplayed, setIsSaveDisplayed] = useState(false);
    const [setToDefault, setSetToDefault] = useState(null);

    const onEditClick = useCallback(() => {
        setIsDisabled(false)
        setIsEditDisplayed(false)
        setIsSaveDisplayed(true)
        setSetToDefault(null)
    }, [])

    const onSaveClick = useCallback(() => {
        setIsDisabled(true)
        setIsEditDisplayed(true)
        setIsSaveDisplayed(false)
    }, [])

    const onCancelClick = useCallback(() => {
        setIsDisabled(true)
        setIsEditDisplayed(true)
        setIsSaveDisplayed(false)
        setSetToDefault(true);
    }, [])

    return(
        <div className="profile-popup-container">
            <form className="profile-form">
                <FullName setToDefault={setToDefault} disabled={isDisabled} value={accountData.fullname} />
                <Email setToDefault={setToDefault} disabled={isDisabled} value={accountData.email} />
                <Password setToDefault={setToDefault} disabled={isDisabled} value={accountData.password} />
                <Thumbnail setToDefault={setToDefault} disabled={isDisabled} value={accountData.password} />
                <div className='action-btn-container'>
                    {isEditDisplayed && <ActionButton variant="contained" onClick={onEditClick}>Edit</ActionButton>}
                    {isSaveDisplayed && <ActionButton variant="contained" onClick={onSaveClick}>Save</ActionButton>}
                    {isSaveDisplayed && <ActionButton variant="contained" onClick={onCancelClick}>Cancel</ActionButton>}
                </div>
            </form>
        </div>
    )
}