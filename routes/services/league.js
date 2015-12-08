import {List, Map,fromJS} from 'immutable'

export const INITIAL_STATE = Map()
export const ACTIONS = {
	SET_TEAMS: 'SET_TEAMS',
	NEXT: 'NEXT',
	GOAL: 'GOAL'
}

export function setTeams(state = INITIAL_STATE, teams) {
  return state.set('teams',fromJS(teams))
              //.set('initialTeams', list);
}

function getWinners(fixture) {
  if (!fixture) return []
  
  const [a, b] = fixture.get('pair')  
  const aGoals = a.get('tally', 0)
  const bGoals = b.get('tally', 0)
  if      (aGoals > bGoals)  return [a.remove('tally')]
  else if (aGoals < bGoals)  return [b.remove('tally')]
  else                       return [a.remove('tally'), b.remove('tally')]
}

export function next(state) {
  
  const teams = state.get('teams')
                     .concat(getWinners(state.get('fixture')))
  if(teams.size === 1) {
  	return state.remove('fixture')
  				.remove('teams')
  				.set('winner',teams.first())
  } else {
	  return state.merge({
	    fixture: Map({pair: teams.take(2)}),
	    teams: teams.skip(2)
	  })  	
  }

}

export function goal(state,teamId) {
  let index = state.getIn(['fixture','pair'])
                   .findIndex(team => team.get('id') === teamId)
  
  if(index === -1) {
    console.log(`can't find team of ${teamId}`)
    return state               
  }
  console.log(`find team of ${teamId} at ${index}`)
  return state.updateIn(
    ['fixture','pair',index,'tally'],
    0,
    tally => tally + 1
    )
}