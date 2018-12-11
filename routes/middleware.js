/**
 * This file contains the common middleware used by your routes.
 *
 * Extend or replace these functions as your application requires.
 *
 * This structure is not enforced, and just a starting point. If
 * you have more middleware you may want to group it as separate
 * modules in your project's /lib directory.
 */
var _ = require('lodash');
var keystone = require('keystone');


/**
	Initialises the standard view locals

	The included layout depends on the navLinks array to generate
	the navigation in the header, you may wish to change this array
	or replace it with your own templates / logic.
*/
exports.initLocals = function (req, res, next) {
	res.locals.navLinks = [
		{ label: 'Home', key: 'home', href: '/' },
		{ label: 'Songs', key: 'songs', href: '/songs' },
		{ label: 'Queue', key: 'queue', href: '/song-queue' },
	];
	res.locals.user = req.user;
	next();
};

exports.socketIO = function (req, res, next) {
	var Party = keystone.list('Party');
	var Queue = keystone.list('Queue');
	var io = keystone.get('io');
	
	if (keystone.get('ioConnected') === true) {
		return next();
	}
	
	Party.model.find({}, function (err, party) {
		
		if (err) {
			console.log(err);
			next();
		}

		if (party && party.length) {
			res.locals.party = party[0]['id'];
			// Socketio connection
			io.on('connect', function(socket) {
				keystone.set('ioConnected', true);
				
				socket.emit('partyId', res.locals.party);
				
				socket.on('addToQueue', function(msg){
					var data = msg;
					var song;
					
					if (!data.title, !data.artist, !data.name) {
						return;
					}
					
					song = new Queue.model({
						title: data.title,
						artist: data.artist,
						name: data.name,
					});
					
					song.save(function(err) {
						if (err) {
							socket.emit(err);
							next();
						}
						socket.emit('songAdded', data);
					});
				});

				socket.on('disconnect', function(){
					console.log('--- User disconnected');
				});
			});
		}
		next();
	});
};

/**
	Fetches and clears the flashMessages before a view is rendered
*/
exports.flashMessages = function (req, res, next) {
	var flashMessages = {
		info: req.flash('info'),
		success: req.flash('success'),
		warning: req.flash('warning'),
		error: req.flash('error'),
	};
	res.locals.messages = _.some(flashMessages, function (msgs) { return msgs.length; }) ? flashMessages : false;
	next();
};


/**
	Prevents people from accessing protected pages when they're not signed in
 */
exports.requireUser = function (req, res, next) {
	if (!req.user) {
		req.flash('error', 'Please sign in to access this page.');
		res.redirect('/keystone/signin');
	} else {
		next();
	}
};
