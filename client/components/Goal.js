import React,{Component,PropTypes} from 'react'

export default class Goal extends Component {
	render() {	
	  	let teams = this.props.pair ?
	  				this.props.pair.map( team => /* This booldy '{' kill me...half day */
	  					<div key={team.get('id')}>
		  					<button key={team.get('id')}
		  							onClick= {() => this.props.goal(team.get('id'))}>
					          <h1>{team.get('name')}</h1>				          
					        </button>
					        <h2>{team.get('tally') ? team.get('tally') : 0}</h2>
				        </div>
				    /*}*/
	  				) :
	  				<h1>There is no teams in fixture!</h1>	  	
	    return (    	
	    	<div className="goal">
		      {teams}
		    </div>
		)
	}
}