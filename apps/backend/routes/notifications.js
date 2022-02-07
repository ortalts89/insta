const {checkUser} = require('../middlewars/users.js');
const { getUserNotifications, getNumOfUnread, deleteNotification, updateNotificationsToRead} = require('../controllers/notifications');

module.exports = (app) => {
    app.use('/api/notifications', checkUser)
    app.get('/api/notifications', getUserNotifications);
    app.put('/api/notifications', updateNotificationsToRead);
    app.get('/api/unreadNotifications', checkUser, getNumOfUnread);
    app.delete('/api/notifications/:notificationId', deleteNotification)
}