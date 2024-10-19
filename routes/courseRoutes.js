const express = require("express");
const router = express.Router();
const { IsAdmin, authenticate } = require("../middleware/authenticate ");
const {
  createCourse,
  updateCourse,
  deleteCourse,
  getAllCourses,
  getCourseById,
} = require("../controller/courseController");

/**
 * @swagger
 * tags:
 *   name: Courses
 *   description: Course management operations
 */

/**
 * @swagger
 * /api/courses:
 *   post:
 *     summary: Create a new course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Course Title"
 *               description:
 *                 type: string
 *                 example: "Course Description"
 *               lessons:
 *                 type: array
 *                 items:
 *                   type: string
 *                   example: "lessonId1"
 *               createdBy:
 *                 type: string
 *                 example: "adminUserId"
 *     responses:
 *       201:
 *         description: Course created successfully
 *       403:
 *         description: User is not authorized to create a course
 */

router.post("/", authenticate, IsAdmin, createCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   put:
 *     summary: Update an existing course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the course to update
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Updated Course Title"
 *               description:
 *                 type: string
 *                 example: "Updated Course Description"
 *     responses:
 *       200:
 *         description: Course updated successfully
 *       404:
 *         description: Course not found
 *       403:
 *         description: User is not authorized to update this course
 */

router.put("/:id", authenticate, IsAdmin, updateCourse);

/**
 * @swagger
 * /api/courses/{id}:
 *   delete:
 *     summary: Delete a course
 *     tags: [Courses]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the course to delete
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course deleted successfully
 *       404:
 *         description: Course not found
 *       403:
 *         description: User is not authorized to delete this course
 */

router.delete("/:id", authenticate, IsAdmin, deleteCourse);

/**
 * @swagger
 * /api/courses:
 *   get:
 *     summary: Get all courses
 *     tags: [Courses]
 *     responses:
 *       200:
 *         description: A list of courses
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   lessons:
 *                     type: array
 *                     items:
 *                       type: string
 *                   createdBy:
 *                     type: string
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 */

router.get("/", getAllCourses);

/**
 * @swagger
 * /api/courses/{id}:
 *   get:
 *     summary: Get a course by ID
 *     tags: [Courses]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the course to retrieve
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Course details
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 lessons:
 *                   type: array
 *                   items:
 *                     type: string
 *                 createdBy:
 *                   type: string
 *       404:
 *         description: Course not found
 */

router.get("/:id", getCourseById);

module.exports = router;
