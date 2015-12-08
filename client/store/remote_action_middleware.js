export default socket =>store => next => action => {
	if(action.isRemote) {
		console.log(action)
		console.log(store.getState().toJS())
		socket.emit('action', action)		
	}
	return next(action)
}