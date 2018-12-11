var keystone = require('keystone');
var Songs = keystone.list('Song');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'songs';
	locals.socketIO = 'socketIO';

	Songs.model.find({}, function (err, songs) {
		if (songs) {
			locals.songs = songs;
		}
		// Render the view
		view.render('songs');
	});
};
