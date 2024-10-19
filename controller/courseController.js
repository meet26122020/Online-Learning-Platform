const Course = require('../models/courseModel');

const Lesson = require('../models/lessonModel');

exports.createCourse = async (req, res) => {
    try {
        const { title, description, lessons } = req.body;

        // Validate that lessons exist in the database
        if (lessons && lessons.length > 0) {
            const foundLessons = await Lesson.find({ _id: { $in: lessons } });
            if (foundLessons.length !== lessons.length) {
                return res.status(400).json({
                    success: false,
                    message: 'Some lesson IDs provided do not exist'
                });
            }
        }

        // Create course with validated lesson IDs
        const course = await Course.create({
            title,
            description,
            lessons,
            createdBy: req.user._id
        });

        // Optionally populate the lessons in the response if you want the lesson details
        const populatedCourse = await Course.findById(course._id).populate('lessons', 'title content');

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            data: populatedCourse
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create course',
            error: error.message
        });
    }
};


// Get all courses
exports.getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find().populate('lessons');
        res.status(200).json({ success: true, message: 'Courses retrieved successfully', data: courses });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to retrieve courses', error: error.message });
    }
};

// Get a single course by ID
exports.getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).populate('lessons');
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.status(200).json({ success: true, message: 'Course retrieved successfully', data: course });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to retrieve course', error: error.message });
    }
};

// Update a course (Admin only)
exports.updateCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });

        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        if (req.body.lessons) {
            console.log('Updated Lesson IDs:', req.body.lessons);
        }

        res.status(200).json({ 
            success: true, 
            message: 'Course updated successfully', 
            data: course 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Failed to update course', 
            error: error.message 
        });
    }
};


// Delete a course (Admin only)
exports.deleteCourse = async (req, res) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }
        res.status(200).json({ success: true, message: 'Course deleted successfully' });
    } catch (error) {
        res.status(400).json({ success: false, message: 'Failed to delete course', error: error.message });
    }
};
