import {useRecoilState, useRecoilValue } from 'recoil';
import { isAccountPopupDisplayed} from '../../store/components';
import Popup from '../Shared/Popup';
import UserAccountContent from './UserAccountContent';
import CircularProgress from '@mui/material/CircularProgress';
import { accountDataState } from '../../store/users';


export default function UserAccountPopup() {
    const [isPopupDisplayed, setIsPopupDisplayed] = useRecoilState(isAccountPopupDisplayed);
    const accountData = useRecoilValue(accountDataState);


    if(!isPopupDisplayed){
        return null;
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500,
        height: 400,
        bgcolor: 'background.paper',
        border: '1px solid #000',
        boxShadow: 24,
        padding: '4px 32px 32px 32px',
        textAlign: 'center'
      };

    return(
        <Popup 
            style={style}
            onClose={() => setIsPopupDisplayed(false)}
            isDisplayed={isPopupDisplayed}
            content= {accountData.fullname === '' ? <CircularProgress/> : <UserAccountContent accountData={accountData}/>}
            title='My Account'
        />
    )
}