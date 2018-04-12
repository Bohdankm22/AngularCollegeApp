// Load the 'users' controller
const users = require('../../app/controllers/users.server.controller');

// Define the routes module' method
module.exports = function(app) {

    app.route('/display')
        .get(users.display);
    // Set up the 'users' base routes
	app.route('/users')
	   .post(users.create)
	   .get(users.list);

	// Set up the 'users' parameterized routes 
	app.route('/users/:userId')
	   .get(users.read)
	   .put(users.update)
    // Set up the 'userId' parameter middleware
    app.param('userId', users.userByID);
    //
    //update from edit .ejs page
    app.route('/edit').post(users.updateByUsername);
    //display the document in edit_ejs page
    app.route('/read_user').post(users.userByUsername);
    app.route('/delete_user').get(users.showDeletePage);
    //
    app.route('/delete').delete(users.deleteByUserName);



	
};