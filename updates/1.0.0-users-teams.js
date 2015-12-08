exports.create = {
	User: [
		{
			name: { first: 'Admin', last: 'User' },
			email: "user@keystonejs.com",
			password: "admin",
			isAdmin: true
		},
		{
			name: { first: 'Jed', last: 'Watson' },
			email: "jed@keystonejs.com",
			password: "admin",
			team: "tm",
			isAdmin: true
		},
		{
			name: { first: 'Joss', last: 'Mackison' },
			email: "joss@keystonejs.com",
			password: "admin",
			team: "tm",
			isAdmin: true
		}
	],
	Team: [
		{
			__ref: "tm",
			name: 'Thinkmill',
			website: 'http://www.thinkmill.com.au'
		},
		{
			__ref: "pk",
			name: 'Prismatik',
			website: 'http://www.prismatik.com.au'
		},
		{
			__ref: "yahoo",
			name: 'Yahoo',
			website: 'http://www.yahoo.com'
		},
		{
			__ref: "fb",
			name: 'Facebook'
		},
		{
			__ref: "tw",
			name: 'Twitter',
			website: 'http://www.twitter.com'
		},
		{
			__ref: "ms",
			name: 'Microsoft',
			website: 'http://www.microsoft.com'
		},
	],
};
