const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandler');
const { addComment } = require('../controllers/commentController');
const pc = require('../controllers/postController');
const uc = require('../controllers/userController');

router.get('/', catchErrors(pc.feed));
router.get('/page/:page', catchErrors(pc.feed));
router.get('/login', uc.login);
router.get('/p/:url', catchErrors(pc.findPostByURL));
router.get('/editor', uc.isLoggedIn, pc.writePost);
router.post('/editor', uc.isLoggedIn, catchErrors(pc.submitPost));
router.get('/like/:posturl', uc.isLoggedIn, catchErrors(pc.likePost));
router.post('/comment/:postid', uc.isLoggedIn, catchErrors(addComment));
router.get('/settings', uc.isLoggedIn, uc.editUser);
router.post('/settings', uc.isLoggedIn, catchErrors(uc.submitUser));
router.get('/i/:username', catchErrors(uc.findUserByUsername));
router.get('/follow/:username', uc.isLoggedIn, catchErrors(uc.followUser));
router.get('/unfollow/:username', uc.isLoggedIn, catchErrors(uc.unfollowUser));
router.get('/logout', uc.isLoggedIn, uc.logout);

module.exports = router;
