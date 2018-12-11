var keystone = require('keystone');
var Party = keystone.list('Party');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	var io = keystone.get('io');

	Party.model.find({}, function (err, party) {
		
		if (err) {
			// locals.section is used to set the currently selected
			// item in the header navigation.
			locals.section = 'queue';
			view.render('queue');
			console.log(err);
		}
		
		if (party && party.length) {
			locals.party = party[0]['id'];
			// Socketio connection
			io.on('connect', function(socket) {
				console.log('--- User connected');
				
				socket.on('addToQueue', function(msg){
					console.log('message: ' + msg);
				});
				
				socket.on('disconnect', function(){
					console.log('--- User disconnected');
				});

				socket.emit('partyId', locals.party);
			});
		}
		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'queue';
		view.render('queue');
	});
};
