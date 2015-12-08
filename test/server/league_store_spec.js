import {expect} from 'chai'
import {Map,fromJS,is} from 'immutable'
import makeStore from '../../routes/services/league_store'

describe('league store', () => {
	it('is a Redux store configured with the correct reducer', () => {
		const store = makeStore()
		expect(store.getState()).to.equal(Map())

		store.dispatch({type: 'SET_TEAMS',teams: [{id:0,name:'BeiKongYanJing'}]})

		expect(
			is( store.getState(),fromJS({teams: [{id:0,name:'BeiKongYanJing'}]}) )
		).to.equal(true)
	})
})