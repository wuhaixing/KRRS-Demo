import {expect} from 'chai'
import {List,Map} from 'immutable'

describe('immutability', () => {

  describe('a number', () => {

    function increment(currentState) {
      return currentState + 1
    }

    it('is immutable', () => {
      let state = 42
      let nextState = increment(state)

      expect(nextState).to.equal(43)
      expect(state).to.equal(42)
    })

  })

  describe('A List' , () => {
    function addTeam(currentState,team) {
      return currentState.push(team)
    }

    it('is immutable', () => {
      let state = List.of('BeiKongYanJing','BeiJingGuoAn')
      let nextState = addTeam(state,'BeiJingLiGong')

      expect(nextState).to.equal(
        List.of('BeiKongYanJing','BeiJingGuoAn','BeiJingLiGong')
        )
      expect(state).to.equal(
        List.of('BeiKongYanJing','BeiJingGuoAn')
        )
    })
  })

  describe('A Tree' ,() => {
    function addTeam(currentState,team) {
      // return currentState.set(
      //   'teams',
      //   currentState.get('teams').push(team)
      //   )
      return currentState.update('teams', teams => teams.push(team))
    }

    it('is immutable', () => {

      let state = Map({
        teams : List.of('BeiKongYanJing','BeiJingGuoAn')
      })

      let nextState = addTeam(state,'BeiJingLiGong')

      expect(nextState).to.equal(Map({
          teams : List.of('BeiKongYanJing','BeiJingGuoAn','BeiJingLiGong')
        }))

      expect(state).to.equal(Map({
          teams : List.of('BeiKongYanJing','BeiJingGuoAn')
        }))      
    })
  })

})