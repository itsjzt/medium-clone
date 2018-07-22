const express = require('express');
const router = express.Router();
const { catchErrors } = require('../handlers/errorHandler');
const { addComment } = require('../controllers/commentController');
const pc = require('../controllers/postController');
const uc = require('../controllers/userController');

router.get('/', catchErrors(pc.feed));
router.get('post/p/:url', catchErrors(pc.findPostByURL));
router.get('post/submit', pc.writePost);
router.get('post/clap/:postId', catchErrors(pc.clapPost));
router.post('post/submit', catchErrors(pc.submitPost));
router.post('comment/:postid', catchErrors(addComment));

// All routes are relative to /users/
// router.get('users/follow/:me/:tofollow', catchErrors(uc.followUser));
// router.get('users/unfollow/:me/:tofollow', catchErrors(uc.unfollowUser));
// router.get(
//   'users/editusername/:oldname/:newname',
//   catchErrors(uc.editUsername)
// );
router.get('users/i/:username', catchErrors(uc.findUserByUsername));
router.get('users/logout', uc.logout);

module.exports = router;
