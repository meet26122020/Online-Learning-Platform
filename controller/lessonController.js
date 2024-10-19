const Lesson = require('../models/lessonModel');

// Create Lesson
exports.createLesson = async (req, res) => {
    try {
        const { title, content } = req.body;

        // Create new lesson
        const lesson = new Lesson({ title, content });

        await lesson.save();

        return res.status(201).json({
            success: true,
            message: 'Lesson created successfully',
            data: lesson
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error creating lesson',
            error: error.message
        });
    }
};

// Get all Lessons
exports.getAllLessons = async (req, res) => {
    try {
        const lessons = await Lesson.find();

        return res.status(200).json({
            success: true,
            message: 'Lessons retrieved successfully',
            data: lessons
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error retrieving lessons',
            error: error.message
        });
    }
};

// Update Lesson by ID
exports.updateLesson = async (req, res) => {
    try {
        const { title, content } = req.body;

        const lesson = await Lesson.findByIdAndUpdate(
            req.params.id,
            { title, content },
            { new: true, runValidators: true }
        );

        if (!lesson) {
            return res.status(404).json({
                success: false,
                message: 'Lesson not found'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Lesson updated successfully',
            data: lesson
        });
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Error updating lesson',
            error: error.message
        });
    }
};
