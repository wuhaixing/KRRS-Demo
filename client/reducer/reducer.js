import {Map} from 'immutable'

function goal(state,teamId) {
	let index = state.getIn(['fixture','pair']).findIndex( 
 				team => team.get('id') === teamId)
	console.log(`get ${teamId} at ${index}`)

	if(index === -1) return state

	return state.updateIn(
		['fixture','pair',index,'tally'],
		0,
		tally => tally + 1
		)
}

export default function(state = Map(),action) {
	switch(action.type) {
		case "SET_STATE" : 
			return state.mergeDeep(action.state)
		case "GOAL" :
			return goal(state,action.team)
		default:
			return state
	}
}