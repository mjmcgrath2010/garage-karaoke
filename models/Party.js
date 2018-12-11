var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * Party Model
 * ==========
 */
var Party = new keystone.List('Party', {
	autokey: { path: 'slug', from: 'title', unique: true },
	map: { name: 'title' },
	defaultSort: '-createdAt',
});

Party.add({
	title: { type: String, required: true, index: true, initial: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true },
});

// Provide access to Keystone
Party.schema.virtual('canAccessKeystone').get(function () {
	return this.isAdmin;
});


/**
 * Registration
 */
Party.defaultColumns = 'title';
Party.register();
