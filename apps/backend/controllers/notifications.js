const { getNotification, getNotifications, updateNotifications } = require('../services/notifications');
const { getLikeXNotification } = require('../services/likeXNotification');
const { getCommentXNotification } = require('../services/commentXNotification');


async function getUserNotifications(req, res) {
    const userNotifications = await getNotifications({sentTo: req.user.id});
    userNotifications.sort((a,b) => b.createdAt - a.createdAt);
    const unread = userNotifications.filter((item) => !item.isRead);
    let notifications = [];
    if(unread.length < 10) {
        let read = userNotifications.filter((item) => item.isRead);
        read = read.slice(0, 10-unread.length);
        notifications = [...unread, ...read];
    } else {
        notifications = [...unread]
    }

    res.json(notifications);
}

async function getNumOfUnread(req, res) {
    const userNotifications = await getNotifications({sentTo: req.user.id});
    const unread = userNotifications.reduce((counter, notification) => !notification.isRead ? counter += 1 : counter, 0);
    res.json(unread);
}

async function deleteNotification(req, res) {
    const notification = await getNotification(req.params.notificationId);
    if(notification){
        await notification.remove();
        if(notification.type === 'comment'){
            const commentXNotification = await getCommentXNotification({notification: notification._id});
            await commentXNotification.remove();
        } else if(notification.type === 'like'){
            const likeXNotification = await getLikeXNotification({notification: notification._id});
            await likeXNotification.remove();
        }
        res.json(notification._id);
    } else {
        res.status(404).json({message: 'notification not found'});
    }
}

async function updateNotificationsToRead(req, res) {
    const updatedNotifications = await updateNotifications({sentTo: req.user.id} ,{isRead: true});
    res.json(updatedNotifications);
}


module.exports = {
    getUserNotifications,
    deleteNotification,
    getNumOfUnread,
    updateNotificationsToRead
}