import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import Winner from './Winner'
import * as actionCreators from '../actions/action_creators'

export class Results extends Component {

	render() {
		let teams = this.props.pair ? 
					this.props.pair.map( team =>
				        <div key={team.get('id')} className="team">
				          <h1>{team.get('name')}</h1>
				          <div key={team.get('id')} className="goalCount">
				            {team.get('tally') ? team.get('tally') : 0}
				          </div>
				        </div>
				    ) :
				    <h1>There is no teams in fixture!</h1>
		return (
			this.props.winner ?
			    <Winner ref="winner" winner={this.props.winner} /> :
				<div className='results'>
					{teams}
				    <div className="management">
				        <button ref="next"
				                className="next"
				                onClick={this.props.next}>
				          <h1>Next</h1>
				        </button>
				      </div>
			    </div>
		)
	}
}

function mapStateToProps(state) {
  return {
    pair: state.getIn(['fixture', 'pair']),
    winner: state.get('winner')
  }
}

export const ResultsContainer = connect(mapStateToProps,actionCreators)(Results)