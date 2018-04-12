// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
const CourseSchema = new Schema({
    courseCode: String,
    courseName: String,
    section: String,
    semester: Number
});

// Create the 'findOneByUsername' static method
CourseSchema.statics.findOneByCourseCode = function(courseCode, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
        courseCode: courseCode
	}, callback);
};

// Create the 'Course' model out of the 'CourseSchema'
mongoose.model('Course', CourseSchema);