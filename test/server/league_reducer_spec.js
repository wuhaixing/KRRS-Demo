import {Map,fromJS,is} from 'immutable'
import {expect} from 'chai'
import reducer from '../../routes/services/league_reducer'

describe('reducer', () => {

	it('handles SET_TEAMS', () => {
		const state = Map()

		const action = {type: 'SET_TEAMS',teams: [{id:0,name:'BeiKongYanJing'}]}
		
		const nextState = reducer(state,action)

		expect(nextState).to.equal(fromJS({teams: [{id:0,name:'BeiKongYanJing'}]})) 						
	})

	it('has default state', () => {
		const action = {type: 'SET_TEAMS',teams: ['BeiKongYanJing']}
		const nextState = reducer(undefined,action)

		expect(nextState).to.equal(fromJS({
			teams: ['BeiKongYanJing']
		}))						
	})

	it('handles NEXT', () => {
		const state = fromJS({
	        teams: [{id:0,name:'BeiKongYanJing'},{id:1,name:'BeiJingGuoAn'},{id:2,name:'BeiJingLiGong'}]
	      })

		const action = {type: 'NEXT'}

		const nextState = reducer(state,action)

	    expect(nextState).to.equal(fromJS({
	          fixture: {
	            pair: [{id:0,name:'BeiKongYanJing'},{id:1,name:'BeiJingGuoAn'}]
	          },
	          teams : [{id:2,name:'BeiJingLiGong'}]
	        }))
	})

	it('handles GOAL', () => {

      const state = fromJS({ 
              fixture: 
                 { pair: 
                    [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
                      { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] 
                 } 
            })

		const action = {type: 'GOAL',team:'56600b471a1a84bdce0ba807'}

		const nextState = reducer(state,action)

        expect(nextState).to.equal(fromJS(
              {  fixture: 
                   { pair: 
                      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807',tally:1 },
                        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ]
                   } 
              }     
        ))

	})

	it/*.only*/('can be used with reduce', () => {
		const actions = [
			{type: 'SET_TEAMS',teams: [{_id:0,name:'BeiKongYanJing'},{_id:1,name:'BeiJingGuoAn'},{_id:2,name:'BeiJingLiGong'}]},
			{type: 'NEXT'},
			{type: 'GOAL',team:0},
			{type: 'GOAL',team:1},
			{type: 'GOAL',team:0},
			{type: 'NEXT'},
			{type: 'GOAL',team:0},
			{type: 'GOAL',team:2},
			{type: 'GOAL',team:0},
			{type: 'NEXT'}
		]

		const finalState = actions.reduce(reducer, Map())

	    expect(finalState).to.equal(fromJS({winner: {_id:0,name:'BeiKongYanJing'}}))
	})
})