import React,{Component,PropsType} from 'react'

export default class Winner extends Component {
	render() {
		return <div>Winner is {this.props.winner.name}!</div>
	}
}