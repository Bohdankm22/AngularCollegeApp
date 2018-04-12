// Load the Mongoose module and Schema object
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define a new 'UserSchema'
const StudentSchema = new Schema({
    studentNumber: String,
    firstName: String,
    lastName: String,
    address: String,
    city: String,
    phoneNumber:String,
    email: {
        type: String,
        // Set an email index
        index: true,
        // Validate the email format
        match: /.+\@.+\..+/
    },
    program: String,
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password.length >= 6,
        'Password Should Be Longer'
        ]
    }
});

// Set the 'fullname' virtual property
StudentSchema.virtual('fullName').get(function() {
	return this.firstName + ' ' + this.lastName;
}).set(function(fullName) {
	var splitName = fullName.split(' ');
	this.firstName = splitName[0] || '';
	this.lastName = splitName[1] || '';
});

// Create the 'findOneByUsername' static method
StudentSchema.statics.findOneByUsername = function(username, callback) {
	// Use the 'findOne' method to retrieve a user document
	this.findOne({
		username: new RegExp(username, 'i')
	}, callback);
};

// Create the 'authenticate' instance method
StudentSchema.methods.authenticate = function(password) {
	return this.password === password;
};

// Configure the 'UserSchema' to use getters and virtuals when transforming to JSON
StudentSchema.set('toJSON', {
	getters: true,
	virtuals: true
});

// Create the 'Student' model out of the 'StudentSchemaSchema'
mongoose.model('Student', StudentSchema);