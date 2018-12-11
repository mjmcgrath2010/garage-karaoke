var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var io = keystone.get('io');


	// Socketio connection
	io.on('connect', function(socket){
		console.log('--- User connected');

		socket.on('disconnect', function(){
			console.log('--- User disconnected');
		});
	});

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'queue';
	locals.socketIO = 'socketIO';
	
	view.render('queue');
};
