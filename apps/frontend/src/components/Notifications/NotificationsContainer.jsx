import { useEffect, useState, useCallback } from 'react';
import NotificationBtn from "./NotificationBtn";
import NotificationsMenu from "./NotificationsMenu";
import { useFetch } from '../../store/fetch';


export default function NotificationsContainer({isDisplayed}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsList, setNotificationsList] = useState([]);
    const [unreadNotifications, setUnreadNotifications] = useState(null);
    const fetch = useFetch();
    const open = Boolean(anchorEl);

    const onDelete = useCallback(async (notificationId) => {
            const indexOfDeleted = notificationsList.findIndex(notification => notification._id === notificationId);
            const newArr = [...notificationsList];
            newArr.splice(indexOfDeleted, 1);
            setNotificationsList(newArr);
            await fetch(`/notifications/${notificationId}`, {}, 'DELETE');
    }, [notificationsList])

    useEffect(async () => {
        if(isDisplayed) {
            const unread = await fetch('/unreadNotifications', {}, 'GET');
            if(unread) {
                setUnreadNotifications(unread);
            }
        }
    }, [isDisplayed])

    useEffect(async () => {
        if(open){
            const notifications = await fetch('/notifications', {}, 'GET');
            if(notifications) {
                setNotificationsList(notifications);
            }
            await fetch('/notifications', {}, 'PUT');
            setUnreadNotifications(null);
        }
    }, [open]);

    const handleClick = useCallback((event) => {
        setAnchorEl(event.currentTarget);
    },[]);

    const handleClose = () => {
        setAnchorEl(null);
    };

    if(!isDisplayed){
        return null;
    }

    return(
        <div className="notifications-container">
            <NotificationBtn open={open} unreadNotifications={unreadNotifications} handleClick={handleClick} />
            {notificationsList.length === 0 ? null : <NotificationsMenu anchorEl={anchorEl} open={open} handleClose={handleClose} notificationsList={notificationsList} onDelete={onDelete} />}
        </div>
    )
}