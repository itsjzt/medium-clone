const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandler');
const { addComment } = require('../controllers/commentController');
const pc = require('../controllers/postController');
const uc = require('../controllers/userController');

router.get('/', catchErrors(pc.feed));
router.get('p/:url', catchErrors(pc.findPostByURL));
router.get('editor', pc.writePost);
router.post('editor', catchErrors(pc.submitPost));
router.get('clap/:postId', catchErrors(pc.clapPost));
router.post('comment/:postid', catchErrors(addComment));

// All routes are relative to /users/
// router.get('users/follow/:me/:tofollow', catchErrors(uc.followUser));
// router.get('users/unfollow/:me/:tofollow', catchErrors(uc.unfollowUser));
// router.get(
//   'users/editusername/:oldname/:newname',
//   catchErrors(uc.editUsername)
// );
router.get('i/:username', catchErrors(uc.findUserByUsername));
router.get('logout', uc.logout);

module.exports = router;
