import {expect} from 'chai'
import {List,Map,fromJS,is} from 'immutable'
import {setTeams,next,goal} from '../../routes/services/league'

describe('League logic', () => {

  describe('setTeams' ,() => {

    it('add teams to state', () => {

      const state = Map()
      const teams = [{id:0,name:'BeiKongYanJing'},{id:1,name:'BeiJingGuoAn'},{id:2,name:'BeiJingLiGong'}]
      const nextState = setTeams(state,teams)

      expect(nextState).to.equal(fromJS({
          teams:[{id:0,name:'BeiKongYanJing'},{id:1,name:'BeiJingGuoAn'},{id:2,name:'BeiJingLiGong'}]
        }))     
    })
  })

  describe('next' ,() => {
    it('takes the next two teams under fixture', () => {
      const state = fromJS({
        teams: [{id:0,name:'BeiKongYanJing'},{id:1,name:'BeiJingGuoAn'},{id:2,name:'BeiJingLiGong'}]
      })

      const nextState = next(state)

      expect(nextState).to.equal(fromJS({
          fixture: {
            pair: [{id:0,name:'BeiKongYanJing'},{id:1,name:'BeiJingGuoAn'}]
          },
          teams : [{id:2,name:'BeiJingLiGong'}]
        }))
    })

    it('put winners of current fixture back to teams', () => {
      const state = fromJS({
          fixture: {
            pair: [{id:0,name:'BeiKongYanJing',tally:3},{id:1,name:'BeiJingGuoAn',tally:2}]
          },
          teams: [{id:2,name:'BeiJingLiGong'},{id:3,name:'ShangHaiShenXin'},{id:4,name:'GuangZhouHengDa'}]
        })

      const nextState = next(state)

      expect(nextState).to.equal(fromJS({
          fixture: {
            pair: [{id:2,name:'BeiJingLiGong'},{id:3,name:'ShangHaiShenXin'}]
          },
          teams: [{id:4,name:'GuangZhouHengDa'},{id:0,name:'BeiKongYanJing'}]
        }))
    })

    it('marks winner when just one team left', () => {
      const state = fromJS({
        fixture: {
          pair: [{id:0,name:'BeiKongYanJing',tally:3},{id:1,name:'BeiJingGuoAn',tally:2}]
        },
        teams: []
      })

      const nextState = next(state)

      expect(nextState).to.equal(fromJS({
        winner: {id:0,name:'BeiKongYanJing'}
      }))

    })
  })

  describe('goal', () => {
    it('creates a tally for the team has goal',() => {
      const state = fromJS(
            { 
              fixture: 
                 { pair: 
                    [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807' },
                      { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ] 
                 } 
            }
        )
        
        const nextState = goal(state,'56600b471a1a84bdce0ba807')

        expect(nextState).to.equal(fromJS(
              {  fixture: 
                   { pair: 
                      [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807',tally:1 },
                        { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808' } ]
                   } 
              }     
        ))
   
    })

    it('adds to existing tally for the teams got a goal', () => {
      const state = fromJS(              
              { 
               fixture: 
                 { pair: 
                    [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807',tally:1 },
                      { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808',tally:2 } ]
                 } 
              })

      const nextState = goal(state,'56600b471a1a84bdce0ba807')

      expect(nextState).to.equal( fromJS(              
              { 
               fixture: 
                 { pair: 
                    [ { name: 'Thinkmill', _id: '56600b471a1a84bdce0ba807',tally:2 },
                      { name: 'Prismatik', _id: '56600b471a1a84bdce0ba808',tally:2 } ]
                 } 
              }))
    })

  })
})