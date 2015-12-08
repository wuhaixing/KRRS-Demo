import {setTeams,next,goal,INITIAL_STATE,ACTIONS} from './league'

export default function reducer(state = INITIAL_STATE,action) {
	switch(action.type) {
		case ACTIONS.SET_TEAMS :
			return setTeams(state,action.teams)
		case ACTIONS.NEXT :
			return next(state)
		case ACTIONS.GOAL : 
			return goal(state,action.team)
		default:
			return state
	}
}