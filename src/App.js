import React, { Component } from 'react'
import trains from './trains.json'
import Trains from './Trains'
import './styles.css'

class App extends Component {

	getOutboundTrains() {
		return trains.filter(train => train.direction === 'outbound')
	}

	getInboundTrains() {
		return trains.filter(train => train.direction === 'inbound')
	}

	render() {
		return <div>
			<h1>Outbound</h1>
			<Trains direction="outbound" trains={ this.getOutboundTrains() } />
			<h1>Inbound</h1>
			<Trains direction="inbound" trains={ this.getInboundTrains() } />
		</div>
	}
}

export default App
