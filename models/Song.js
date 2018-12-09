var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Song Model
 * ==========
 */
var Song = new keystone.List('Song', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

Song.add({
	title: { type: String, required: true, index: true, initial: true },
	artist: { type: String, required: true, index: true, initial: true },
	diskNumber: { type: String, required: true, index: true, initial: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Song.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Song.defaultColumns = 'Title, Artist, Disk Number';
Song.register();
