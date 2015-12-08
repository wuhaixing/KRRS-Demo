import React from 'react'
import ReactDOM from 'react-dom'
import {List,Map,fromJS} from 'immutable'
import ReactTestUtils from 'react-addons-test-utils'
import { Results } from '../../../client/components/Results'
import {expect} from 'chai'

const {renderIntoDocument, scryRenderedDOMComponentsWithClass} = ReactTestUtils

describe('Results',() => {

	it('renders teams with score or zero',() => {
		const pair = fromJS([{id:1,name:'BGFC',tally:3},{id:2,name:'BJGA'}])

		const component = renderIntoDocument(
			<Results pair={pair}/>
			)

		const teams = scryRenderedDOMComponentsWithClass(component,'team')
		const [bgfc, bjga] = teams.map(e => e.textContent)

		expect(teams.length).to.equal(2)
		expect(bgfc).to.contain('BGFC')
		expect(bgfc).to.contain('3')
		expect(bjga).to.contain('BJGA')
		expect(bjga).to.contain('0')
	})
})