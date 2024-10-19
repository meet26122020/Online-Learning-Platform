const Enrollment = require('../models/enrollmentModel');
const Course = require('../models/courseModel');


exports.enrollCourse = async (req, res) => {
    const { courseId } = req.params;
    const userId = req.user._id;

    try {

        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ success: false, message: 'Course not found' });
        }

        const existingEnrollment = await Enrollment.findOne({ user: userId, course: courseId });
        if (existingEnrollment) {
            return res.status(400).json({ success: false, message: 'User is already enrolled in this course' });
        }

        const lessonCompletions = course.lessons.map(lesson => ({
            lesson: lesson,
            completed: false,
            completionDate: null
        }));

        const enrollment = new Enrollment({
            user: userId,
            course: courseId,
            lessonCompletions, 
            progress: 0 
        });

        await enrollment.save();

        res.status(201).json({ success: true, message: 'User successfully enrolled in the course', enrollment });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Server error', error: error.message });
    }
};


exports.completeLesson = async (req, res) => {
    const { courseId, lessonId } = req.params; 
    try {

        const enrollment = await Enrollment.findOne({
            user: req.user._id,
            course: courseId
        });

        if (!enrollment) {
            return res.status(404).json({ success: false, message: 'Enrollment not found' });
        }

        const lessonCompletion = enrollment.lessonCompletions.find(l => l.lesson.toString() === lessonId);
        if (lessonCompletion) {

            return res.status(400).json({ success: false, message: 'Lesson already completed' });
        }

        enrollment.lessonCompletions.push({
            lesson: lessonId,
            completed: true,
            completionDate: new Date()
        });

        await enrollment.save();

        res.status(200).json({ 
            success: true, 
            message: 'Lesson completed successfully', 
            data: enrollment 
        });
    } catch (error) {
        res.status(400).json({ 
            success: false, 
            message: 'Failed to complete lesson', 
            error: error.message 
        });
    }
};

