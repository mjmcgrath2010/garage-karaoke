var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Queue Model
 * ==========
 */
var Queue = new keystone.List('Queue', {
	autokey: { path: 'slug', from: 'title' },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

Queue.add({
	artist: { type: String, required: true, initial: true },
	title: { type: String, required: true, initial: true },
	name: { type: String, required: true, initial: true },
	disk: { type: String, required: true, initial: true }
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Queue.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Queue.defaultColumns = 'name, title, artist, disk';
Queue.register();
