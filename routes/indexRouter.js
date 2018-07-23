const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandler');
const { addComment } = require('../controllers/commentController');
const pc = require('../controllers/postController');
const uc = require('../controllers/userController');

router.get('/', catchErrors(pc.feed));
router.get('/login', uc.login);
router.get('/p/:url', catchErrors(pc.findPostByURL));
router.get('/editor', uc.isLoggedIn, pc.writePost);
router.post('/editor', uc.isLoggedIn, catchErrors(pc.submitPost));
router.get('/like/:posturl', uc.isLoggedIn, catchErrors(pc.clapPost));
router.post('/comment/:postid', uc.isLoggedIn, catchErrors(addComment));
router.get('/settings', uc.isLoggedIn, uc.editUser);
router.post('/settings', uc.isLoggedIn, catchErrors(uc.submitUser));

// All routes are relative to /users/
// router.get('users/follow/:me/:tofollow', catchErrors(uc.followUser));
// router.get('users/unfollow/:me/:tofollow', catchErrors(uc.unfollowUser));
// router.get(
//   'users/editusername/:oldname/:newname',
//   catchErrors(uc.editUsername)
// );
router.get('/i/:username', catchErrors(uc.findUserByUsername));
router.get('/logout', uc.isLoggedIn, uc.logout);

module.exports = router;
