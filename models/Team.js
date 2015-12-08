import keystone from 'keystone'
import transform  from 'model-transform'
const Types = keystone.Field.Types

var Team = new keystone.List('Team', {
	autokey: { from: 'name', path: 'key', unique: true },
});

Team.add({
	name: { type: String, required: true, index: true },
	website: { type: Types.Url, index: true }
});

Team.relationship({ ref: 'User', path: 'users', refPath: 'Team' });

transform.toJSON(Team);
Team.defaultColumns = 'name, website';
Team.register();
