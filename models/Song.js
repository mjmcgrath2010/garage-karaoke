const keystone = require('keystone');

/**
 * Song Model
 * ==========
 */
const Song = new keystone.List('Song', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

Song.add({
	title: { type: String, required: true, initial: true },
	artist: { type: String, required: true, initial: true },
	diskNumber: { type: String, required: true, initial: true },
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
Song.defaultColumns = 'title, artist, diskNumber';
Song.register();
