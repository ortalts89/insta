import { useMemo } from 'react';
import Avatar from '@mui/material/Avatar';
import MenuItem from '@mui/material/MenuItem';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import { formatDate } from '../../compositions/date';

export default function Notification({notification, handleClose, onDelete}) {
   
    const date = useMemo(() => {
        return formatDate(notification.createdAt)
    }, [notification])

    return (
        <MenuItem>
            {!notification.isRead ? <FiberManualRecordIcon sx={{fontSize: 'small', marginRight: '10px', color: '#1976d2'}} /> : <div style={{width: '1.4em'}}></div> }
            <a href={`/profile/${notification.createdBy}`}>
                <Avatar src={notification.img} alt={notification.text} sx={{marginRight:'10px'}}/>
            </a>
            <a href={notification.url}>
                <div onClick={handleClose} className="notification-text">{notification.text}</div>
            </a>
            <div style={{ marginLeft: '10px', fontSize: '10px'}}>
                {date}
            </div>
            <IconButton aria-label="delete" size="small" sx={{marginLeft: "10px"}} onClick={() => onDelete(notification._id)}>
                    <CloseIcon fontSize={'12px'} />
            </IconButton>
        </MenuItem>
    )
}