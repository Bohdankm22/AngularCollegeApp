// Load the 'User' Mongoose model
const User = require('mongoose').model('User');

// 'create' controller method to create a new user
exports.create = function(req, res, next) {
	// Create a new instance of the 'User' Mongoose model
	const user = new User(req.body);

	// Use the 'User' instance's 'save' method to save a new user document
	user.save((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(user);
		}
	});
};

// 'list' controller method to display all users in raw json format
exports.list = function(req, res, next) {
	// Use the 'User' static 'find' method to retrieve the list of users
	User.find({}, (err, users) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(users);
		}
	});
};

// 'display' controller method to display all users in friendly format
exports.display = function (req, res, next) {
    // Use the 'User' static 'find' method to retrieve the list of users
    User.find({}, (err, users) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            res.render('listall', {
                title: 'List All Users',
                users: users
            });
        }
    });
};
//
// 'display' controller method to display all users in friendly format
exports.showDeletePage = function (req, res) {
    
    // Use the 'response' object to show the delete_user page
    res.render('delete_user', {
        title: 'Delete User' });
        
};

// 'read' controller method to display a user
exports.read = function(req, res) {
	// Use the 'response' object to send a JSON response
	res.json(req.user);
};

// 'update' controller method to update a user based on id
exports.update = function (req, res, next) {
    req.user=req.body //read the user from request's body
    console.log(req.user)
	// Use the 'User' static 'findByIdAndUpdate' method to update a specific user
	User.findByIdAndUpdate(req.user.id, req.body, (err, user) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			//res.json(user);
            res.redirect('/users') //display all users
		}
	})
};

//update a user by username
exports.updateByUsername = function (req, res, next) {
    req.user = req.body //read the user from request's body
    console.log(req.user)
    //initialize findOneAndUpdate method arguments
    var query = { "username": req.user.username };
    var update = req.body;
    var options = { new: true };

    // Use the 'User' static 'findOneAndUpdate' method to update a specific user by user name
    User.findOneAndUpdate(query, update, options, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Use the 'response' object to send a JSON response
            //res.json(user);
            res.redirect('/users') //display all users
        }
    })
};


// 'delete' controller method to delete a user
exports.delete = function(req, res, next) {
	// Use the 'User' instance's 'remove' method to delete user document
	req.user.remove((err) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Use the 'response' object to send a JSON response
			res.json(req.user);
		}
	})
};

//delete user by username
exports.deleteByUserName = function (req, res, next) {
    //
    console.log(req.body.username);
    User.findOneAndRemove({
        username: req.body.username
    }, function (err, user) {

        if (err) throw err;

        console.log("Success");

    });

    res.redirect('/display');


};
// 'userByID' controller method to find a user by its id or username
//  the code is using the username field instead of id
exports.userByID = function (req, res, next, username) {
	// Use the 'User' static 'findOne' method to retrieve a specific user
	User.findOne({
		username: username //using the username instead of id
	}, (err, user) => {
		if (err) {
			// Call the next middleware with an error message
			return next(err);
		} else {
			// Set the 'req.user' property
            req.user = user;
            console.log(user);
			// Call the next middleware
			next();
		}
	});
};

// 'userByUsername' controller method to find a user by its username
// and display the result in edit.ejs file
exports.userByUsername = function (req, res, next) {
    // Use the 'User' static 'findOne' method to retrieve a specific user
    var username = req.body.username;
    console.log(username)
    User.findOne({
        username: username //finding a document by username
    }, (err, user) => {
        if (err) {
            // Call the next middleware with an error message
            return next(err);
        } else {
            // Set the 'req.user' property
            req.user = user;
            //parse it to a JSON object
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser)
            //display edit page and pass user properties to it
            res.render('edit', { title: 'Edit user', user: jsonUser} );

            // Call the next middleware
            next();
        }
    });
};