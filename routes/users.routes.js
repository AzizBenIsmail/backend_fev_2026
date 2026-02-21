var express = require('express');
var router = express.Router();
const userController = require('../controllers/user.controller');
const upload = require('../middlewares/uploadfile');
const logMiddleware = require('../middlewares/LogMiddleware');
const { rquireAuth } = require('../middlewares/authMiddleware');
/* GET users listing. */
router.get('/GetAllUsers', rquireAuth, logMiddleware, userController.getAllUsers);

router.get('/getMyProfile', rquireAuth, userController.getMyProfile);

router.post('/CreateUser', userController.createUser);

router.post('/CreateUserWithImage', upload.single('user_image'), logMiddleware, userController.createUserWithImage);

router.post('/CreateUserAdmin', userController.createUserAdmin);

router.post('/CreateUserModerateur', userController.createUserModerateur);

router.delete('/deleteUser/:id', userController.deleteUser);

router.put('/updateUser/:id', userController.updateUser);

router.post('/login', userController.login);

router.post('/logout',rquireAuth, userController.logout);

module.exports = router;
