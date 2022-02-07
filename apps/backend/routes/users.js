const {create, login, getUserAccount, logout, getCurrentUser, getUserProfileInfo} = require('../controllers/users');
const {checkUser} = require('../middlewars/users.js');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });


module.exports = (app) => {
    app.post('/api/register', upload.single('thumbnail'), create)
    app.post('/api/login', login)
    app.get('/api/users/account', checkUser, getUserAccount)
    app.get('/api/users/:userId/profile_info', checkUser, getUserProfileInfo)
    app.get('/api/logout', logout)
    app.get('/api/me',checkUser, getCurrentUser)
}