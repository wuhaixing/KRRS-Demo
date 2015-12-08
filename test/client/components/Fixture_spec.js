import {List,Map,fromJS} from 'Immutable'
import React from 'react'
import ReactDOM from 'react-dom'
import ReactTestUtils from 'react-addons-test-utils'
import {Fixture} from '../../../client/components/Fixture'
import {expect} from 'chai'


const {renderIntoDocument, scryRenderedDOMComponentsWithTag, Simulate} = ReactTestUtils

describe('Fixture',() => {

  //   it('renders as a pure component', () => {
  //   	const pair = [{_id:1,name:'BGFC'},
		// 			  {_id:2,name:'BJGA'}]
		// const component = renderIntoDocument(
		// 	<Fixture pair={pair} />
		// 	)

		// let firstButton = scryRenderedDOMComponentsWithTag(component,'button')[0]
		// expect(firstButton.textContent).to.contain('BGFC')

		// pair[0] = {_id:3,name:'GZHD'} 
		// component.setProps({pair:pair})
		// firstButton = scryRenderedDOMComponentsWithTag(component,'button')[0]
		// expect(firstButton.textContent).to.contain('BGFC')
  //   })

	it('renders a pair of buttons',() => {
		
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

		const pair = state.getIn(['fixture','pair'])
		expect(pair.size).to.equal(2)
		const component = renderIntoDocument(
			<Fixture pair={pair} />
			)

		const buttons = scryRenderedDOMComponentsWithTag(component,'button')

		expect(buttons.length).to.equal(2)
		expect(buttons[0].textContent).to.equal('Thinkmill')
		expect(buttons[1].textContent).to.equal('Prismatik')
	})

	it('invokes callback when a button is clicked', () => {
		let shotedWith
		const pair = fromJS([ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
			           { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ])

		const goal = (team) => shotedWith = team

		const component = renderIntoDocument(
			<Fixture pair={pair} 
					 goal={goal}/>
			)		

		const buttons = scryRenderedDOMComponentsWithTag(component,'button')
		Simulate.click(buttons[0])
		expect(shotedWith).to.equal('56600b471a1a84bdce0ba807')
	})

	it('just renders winner when there is one', () => {
		const component = renderIntoDocument(
			<Fixture winner={{_id:1,name:'BGFC'}}/>
			)
		const buttons = scryRenderedDOMComponentsWithTag(component,'button')
		expect(buttons.length).to.equal(0)

		const winner = ReactDOM.findDOMNode(component.refs.winner)
		expect(winner).to.be.ok
		expect(winner.textContent).to.contain('BGFC')

	})
})