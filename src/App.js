import React, { Component } from 'react'
import TrainsHeader from './TrainsHeader'
import Trains from './Trains'
import Basket from './Basket'
import './styles.css'
import trains from './trains.json'
import priceTypes from './priceTypes.json'
import passengerTypes from './passengerTypes.json'
import searchQuery from './searchQuery.json'

class App extends Component {

	constructor() {
		super()
		this.state = {
			trains,
			searchQuery,
			priceTypes,
			passengerTypes
		}
	}

	getSearchQuery() {
		return this.state.searchQuery
	}

	getPriceTypes() {
		return this.state.priceTypes
	}

	getPassengerTypes() {
		return this.state.passengerTypes
	}

	getTrains() {
		return this.state.trains
	}

	getOutboundTrains() {
		return this.getTrains().filter(train => train.direction === 'outbound')
	}

	getInboundTrains() {
		return this.getTrains().filter(train => train.direction === 'inbound')
	}

	getSelectedOutboundTrain() {
		return this.getOutboundTrains().filter(train => train.selectedPrice !== null)[0]
	}

	getSelectedInboundTrain() {
		return this.getInboundTrains().filter(train => train.selectedPrice !== null)[0]
	}

	trainPriceHandler(selectedTrainPrice) {
		const [direction, trainId, price] = selectedTrainPrice.split('_') // outbound_1_awesome
		const trains = [...this.getTrains()].map(train => {
			if (train.direction === direction) {
				return { ...train, selectedPrice: train.id === parseInt(trainId, 10) ? price : null }
			}
			return train
		})

		this.setState({ trains })
	}

	clearSelectionHandler(direction) {
		console.log(direction)
		const trains = [...this.getTrains()].map(train => {
			if (train.direction === direction && train.selectedPrice) {
				return { ...train, selectedPrice: null }
			}
			return train
		})

		this.setState({ trains })
	}

	renderTrainsHeader(direction, date, from, to) {
		return <h2>
			{ `${direction} ${date} ${from} to ${to}` }
		</h2>
	}

	render() {

		return <div>
			<TrainsHeader
				direction="Outbound"
				date={ this.getSearchQuery().outboundDate }
				from={ this.getSearchQuery().origin }
				to={ this.getSearchQuery().destination }
			/>
			<Trains
				direction="outbound"
				priceTypes={ this.getPriceTypes() }
				trains={ this.getOutboundTrains() }
				trainPriceHandler={ this.trainPriceHandler.bind(this) }
			/>
			<button onClick={this.clearSelectionHandler.bind(this, 'outbound')}>Clear selection</button>
			<TrainsHeader
				direction="Inbound"
				date={ this.getSearchQuery().inboundDate }
				from={ this.getSearchQuery().destination }
				to={ this.getSearchQuery().origin }
			/>
			<Trains
				direction="inbound"
				priceTypes={ this.getPriceTypes() }
				trains={ this.getInboundTrains() }
				trainPriceHandler={ this.trainPriceHandler.bind(this) }
			/>
			<button onClick={this.clearSelectionHandler.bind(this, 'inbound')}>Clear selection</button>
			<Basket
				searchQuery={ this.getSearchQuery() }
				passengerTypes={ this.getPassengerTypes() }
				outboundTrain={ this.getSelectedOutboundTrain() }
				inboundTrain={ this.getSelectedInboundTrain() }
			/>
		</div>
	}
}

export default App
