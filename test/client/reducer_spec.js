import {Map,fromJS} from 'immutable'
import reducer from '../../client/reducer/reducer'
import {expect} from 'chai'

describe('reducer', () => {
	it('handles SET_STATE', () => {
		const state = Map()

		const action = {
			type: 'SET_STATE',
			state: { teams: 
						   [ { name: 'Yahoo', _id: '56600b491a1a84bdce0ba809' },
						     { name: 'Facebook', _id: '56600b491a1a84bdce0ba80a' },
						     { name: 'Twitter', _id: '56600b491a1a84bdce0ba80b' },
						     { name: 'Microsoft', _id: '56600b491a1a84bdce0ba80c' } ],
						  fixture: 
						   { pair: 
						      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
						        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] 
						   } 
					}
		}
		
		const nextState = reducer(state,action)

		expect(nextState).to.equal(fromJS(
			{ teams: 
				   [ { name: 'Yahoo', _id: '56600b491a1a84bdce0ba809' },
				     { name: 'Facebook', _id: '56600b491a1a84bdce0ba80a' },
				     { name: 'Twitter', _id: '56600b491a1a84bdce0ba80b' },
				     { name: 'Microsoft', _id: '56600b491a1a84bdce0ba80c' } ],
				  fixture: 
				   { pair: 
				      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
				        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] 
				   } 
			})) 						
	})

	it('handles GOAL by set tally',() => {
		const state = fromJS(
					{ teams: 
						   [ { name: 'Yahoo', _id: '56600b491a1a84bdce0ba809' },
						     { name: 'Facebook', _id: '56600b491a1a84bdce0ba80a' },
						     { name: 'Twitter', _id: '56600b491a1a84bdce0ba80b' },
						     { name: 'Microsoft', _id: '56600b491a1a84bdce0ba80c' } ],
					  fixture: 
						   { pair: 
						      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
						        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] 
						   } 
					}
			)
		const action = {type: 'GOAL',team: '56600b471a1a84bdce0ba807'}

		const nextState = reducer(state,action)

		expect(nextState).to.equal(fromJS(
					{ teams: 
						   [ { name: 'Yahoo', _id: '56600b491a1a84bdce0ba809' },
						     { name: 'Facebook', _id: '56600b491a1a84bdce0ba80a' },
						     { name: 'Twitter', _id: '56600b491a1a84bdce0ba80b' },
						     { name: 'Microsoft', _id: '56600b491a1a84bdce0ba80c' } ],
					   fixture: 
						   { pair: 
						      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807',tally:1 },
						        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ]
						   } 
					}			
		))
	})
})