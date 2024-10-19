const express = require('express');
const { authenticate } = require('../middleware/authenticate ');
const { enrollCourse, completeLesson } = require('../controller/enrollmentController');

const router = express.Router();

/**
 * @swagger
 * /enrollment/{courseId}:
 *   post:
 *     summary: Enroll a user in a course
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course to enroll in
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progress:
 *                 type: integer
 *                 description: The progress of the user in the course (default is 0)
 *     responses:
 *       201:
 *         description: User successfully enrolled in the course
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: User successfully enrolled in the course
 *                 enrollment:
 *                   type: object
 *                   description: Enrollment details
 *       404:
 *         description: Course not found
 *       400:
 *         description: User is already enrolled in this course
 *       500:
 *         description: Server error
 */
router.post('/:courseId', authenticate, enrollCourse);

/**
 * @swagger
 * /enrollment/complete/{courseId}/{lessonId}:
 *   put:
 *     summary: Mark a lesson as completed for a user
 *     tags: [Enrollment]
 *     parameters:
 *       - in: path
 *         name: courseId
 *         required: true
 *         description: The ID of the course
 *         schema:
 *           type: string
 *       - in: path
 *         name: lessonId
 *         required: true
 *         description: The ID of the lesson to mark as completed
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               completed:
 *                 type: boolean
 *                 description: Indicates if the lesson is completed
 *               completionDate:
 *                 type: string
 *                 format: date-time
 *                 description: The date and time the lesson was completed
 *     responses:
 *       200:
 *         description: Lesson marked as completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 message:
 *                   type: string
 *                   example: Lesson completed successfully
 *       404:
 *         description: Course or lesson not found
 *       500:
 *         description: Server error
 */
router.put('/complete/:courseId/:lessonId', authenticate, completeLesson);

module.exports = router;
