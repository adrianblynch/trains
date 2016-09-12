import React, { Component } from 'react'
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

	getOutboundTrains() {
		return this.state.trains.filter(train => train.direction === 'outbound')
	}

	getInboundTrains() {
		return this.state.trains.filter(train => train.direction === 'inbound')
	}

	getSelectedOutboundTrain() {
		return this.getOutboundTrains().filter(train => train.selectedPrice !== null)[0]
	}

	getSelectedInboundTrain() {
		return this.getInboundTrains().filter(train => train.selectedPrice !== null)[0]
	}

	trainPriceHandler(selectedTrainPrice) {
		const [direction, trainId, price] = selectedTrainPrice.split('_') // outbound_1_awesome
		const trains = [...this.state.trains].map(train => {
			if (train.direction === direction) {
				return { ...train, selectedPrice: train.id === parseInt(trainId, 10) ? price : null }
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
			<h1>Trains</h1>
			<h2>Basket</h2>
			<Basket
				searchQuery={ this.getSearchQuery() }
				passengerTypes={ this.getPassengerTypes() }
				outboundTrain={ this.getSelectedOutboundTrain() }
				inboundTrain={ this.getSelectedInboundTrain() }
			/>
			{
				this.renderTrainsHeader(
					"Outbound",
					this.getSearchQuery().outboundDate,
					this.getSearchQuery().origin,
					this.getSearchQuery().destination
				)
			}
			<Trains
				direction="outbound"
				priceTypes={ this.getPriceTypes() }
				trains={ this.getOutboundTrains() }
				trainPriceHandler={ this.trainPriceHandler.bind(this) }
			/>
			{
				this.renderTrainsHeader(
					"Inbound",
					this.getSearchQuery().inboundDate,
					this.getSearchQuery().destination,
					this.getSearchQuery().origin
				)
			}
			<Trains
				direction="inbound"
				priceTypes={ this.getPriceTypes() }
				trains={ this.getInboundTrains() }
				trainPriceHandler={ this.trainPriceHandler.bind(this) }
			/>
		</div>
	}
}

export default App
