import React,{ Component,PropTypes } from 'react'
//import PureComponent from './PureComponent'
//import {PureRenderMixin} from 'react-addons-pure-render-mixin'
//import reactMixin from 'react-mixin'
import {connect} from 'react-redux'
import Winner from './Winner'
import Goal from './Goal'
import * as actionCreators from '../actions/action_creators'

export class Fixture extends Component {
  render() {
    return (    	
    	<div className="fixture">
    	  {this.props.winner ?  <Winner ref="winner" winner={this.props.winner}/> : <Goal {...this.props}/>}
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

export const FixtureContainer = connect(mapStateToProps,actionCreators)(Fixture)