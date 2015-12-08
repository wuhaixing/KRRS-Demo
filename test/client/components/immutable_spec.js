import {expect} from 'chai'
import {List,Map,fromJS} from 'immutable'

describe('Immutable libarary', () => {
	describe('fromJS' ,() => {

	    it('supports nested object from socket.io', () => {

			const state = fromJS({ 
					teams: 
					   [ { name: 'Yahoo', _id: '56600b491a1a84bdce0ba809' },
					     { name: 'Facebook', _id: '56600b491a1a84bdce0ba80a' },
					     { name: 'Twitter', _id: '56600b491a1a84bdce0ba80b' },
					     { name: 'Microsoft', _id: '56600b491a1a84bdce0ba80c' } ],
					fixture: 
					   { pair: 
					      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
					        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] } 
					    })

	        //expect(state.hasIn(['fixture','pair'])).to.be.ok
	        let pair = state.getIn(['fixture','pair'])
	      	expect(pair.size).to.equal(2)
	        expect(pair.get(0).get('name')).to.equal('Thinkmill')
		    expect(pair.get(1).get('name')).to.equal('Prismatik')
	    })

	    it('supports findIndex', () => {
 			const state = fromJS({ 
					fixture: 
					   { pair: 
					      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
					        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] } 
				    }) 
 			let index = state.getIn(['fixture','pair']).findIndex( 
 				team => team.get('_id') === '56600b471a1a84bdce0ba807')
 			expect(index).to.equal(0) 			
	    })

    	it('supports updateIn', () => {
 			const state = fromJS({ 
					fixture: 
					   { pair: 
					      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
					        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] } 
				    })  
			const nextState = state.updateIn(
				['fixture','pair',0,'tally'],
				0,
				tally => tally + 1
				) 	
			expect(nextState).to.equal(fromJS({ 
					fixture: 
					   { pair: 
					      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807',tally:1 },
					        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] } 
				    }) )	
    	})


  })
})