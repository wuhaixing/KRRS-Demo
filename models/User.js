import keystone from 'keystone'
import transform from 'model-transform'
const Types = keystone.Field.Types

var User = new keystone.List('User')

User.add({
	name: { type: Types.Name, required: true, index: true },
	email: { type: Types.Email, initial: true, required: true, index: true, unique: true },
	password: { type: Types.Password, initial: true },
	team: { type: Types.Relationship, ref: 'Team', index: true },
	address: { type: Types.Location, collapse: true },
}, 'Permissions', {
	isAdmin: { type: Boolean, label: 'Can access Keystone', index: true }
});

// Provide access to Keystone
User.schema.virtual('canAccessKeystone').get(function() {
	return this.isAdmin;
});

/**
 * PROTECTING THE DEMO USER
 * The following hooks prevent anyone from editing the main demo user itself,
 * and breaking access to the website cms.
 */

transform.toJSON(User);
User.defaultColumns = 'name, email, company, isAdmin';
User.register();
