const express = require('express')
const roleMiddleware = require('../middlewares/roleMiddleware');
const {checkCourseAccess} = require('../middlewares/courseMiddleware');
const {checkLessonAccess} = require('../middlewares/lessonMiddleware');
const courseController = require('../controllers/courseController');
const lessonController = require('../controllers/lessonController');
const ROLES = require('../utils/ROLES');

const router = express.Router();

router.get('/', courseController.getAll)

router.post('/create', roleMiddleware([ROLES.ADMIN]), courseController.create);
router.get('/:courseId', checkCourseAccess, courseController.get);
router.post('/:courseId/buy', courseController.buy);
router.post('/:courseId/lesson/create', roleMiddleware([ROLES.ADMIN]), lessonController.create)
router.get('/:courseId/lesson/:lesson_number', checkCourseAccess, checkLessonAccess, lessonController.getOne)

module.exports = router;