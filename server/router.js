const router = require('express').Router();
const authMiddleware = require('./middlewares/auth');
const { register, login, logout } = require('./controllers/auth/auth');
const {
  createMeet,
  getMyMeets,
  getJoinedMeets,
  getJoinMeets,
  joinAMeet,
  leaveAMeet,
  deleteMeet,
} = require('./controllers/meets/meets');
const {
  searchUser,
  removeFriend,
  addFriend,
} = require('./controllers/friends/search');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
router.post('/create/meet', authMiddleware, createMeet); // create a meet
router.get('/my/meets', authMiddleware, getMyMeets); // show meets created by user
router.get('/joined/meets', authMiddleware, getJoinedMeets); // show meets join
router.get('/join/meets', authMiddleware, getJoinMeets); // show meets to be joined
router.post('/join/meets', authMiddleware, joinAMeet); // join a meet
router.delete('/delete/meet', authMiddleware, deleteMeet);
router.post('/search/users', authMiddleware, searchUser); // show meets to be joined
router.post('/search/addFriend', authMiddleware, addFriend); // adds friend
router.delete('/search/removeFriend', authMiddleware, removeFriend); // removes friend
router.delete('/leave/meets', authMiddleware, leaveAMeet); // removes friend
router.get('/logout', authMiddleware);

module.exports = router;
