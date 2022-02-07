import './MainMenuBtn.css'
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import { loggedInUserState } from '../../store/users';
import { useRecoilValue } from 'recoil';

export default function MainMenuBtn({open, handleClick}) {
    const loggedInUser = useRecoilValue(loggedInUserState);

    return(
        <IconButton
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            >
            <Avatar alt="Kuala" src={loggedInUser.thumbnail} variant="circular" />
        </IconButton>
    )
}