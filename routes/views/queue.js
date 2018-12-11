var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var io = keystone.get('io');
	var session = keystone.get('keystone.uid');
	console.log(session)
	// // Share session between express and socketio
	// io.use(function(socket, next){
	// 	session(socket.handshake, {}, next);
	// });

	// Socketio connection
	io.on('connect', function(socket){
		console.log('--- User connected');

		// Set session variables in route controller
		// which is going to load the client side socketio
		// in this case, ./routes/index.js
		// console.log(socket.handshake.session);
		// socket.emit('msg', socket.handshake.session.message);


		socket.on('disconnect', function(){
			console.log('--- User disconnected');
		});
	});

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'queue';
	
	view.render('queue');
};
