import Server from 'socket.io'

export function start(keystone) {	
	const Team = keystone.list('Team')
	const io = new Server().listen(keystone.httpServer)
	const store = keystone.get('store')

	if(!store.getState().get('teams')) {
		Team.model.find()
			.select('name')
			.exec(function(err, teams) {
				if (err) {
					console.log('Error finding teams: ', err)
				} else {
					store.dispatch({
						type: 'SET_TEAMS',
						teams: teams
					})
					store.dispatch({type: 'NEXT'})
				}			
			})			
	}
	

	store.subscribe(
	    () => io.emit('state', store.getState().toJS())
    )

	io.on('connection', (socket) => {
		socket.emit('state', store.getState().toJS())
		socket.on('action', store.dispatch.bind(store))
	})
}