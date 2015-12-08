import React from 'react'
import { render } from 'react-dom'
import Router,{Route,IndexRoute} from 'react-router'
import {Provider} from 'react-redux'
import {Map,fromJS} from 'immutable'
import {setState} from './actions/action_creators'
import makeStore from './store/store'
import App from './components/App'
import { FixtureContainer } from './components/Fixture'
import { ResultsContainer } from './components/Results'
import io from 'socket.io-client'

const routes = <Route component={App}>
			   	<Route path='/' component={FixtureContainer}/>
			   	<Route path='/results' component={ResultsContainer}/>
			   </Route>

const socket = io.connect()

const store = makeStore(socket)

socket.on('state', state => {
	console.log(state)
	store.dispatch(setState(fromJS(state)) )
})

render(
	<Provider store={store}>
	  <Router>{routes}</Router>
	</Provider>,
	document.getElementById('root')
)
