var keystone = require('keystone');
var Queue = keystone.list('Queue');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	
	Queue.model.find({}, function(err, docs) {
		if (err) {
			console.log(err);
		}
		
		if (docs && docs.length) {
			locals.queue = docs;
			locals.isAdmin = req.user && req.user.isAdmin || false;
		}
		
		console.log(docs)

		// locals.section is used to set the currently selected
		// item in the header navigation.
		locals.section = 'queue';
		view.render('queue');
		
	});
};
