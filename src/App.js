import React, { Component } from 'react'
import { BrowserRouter, Match, Miss, Link } from 'react-router'
import Search from './Search'
import Checkout from './Checkout'
import Confirmation from './Confirmation'
import './styles.css'
import searchQuery from './searchQuery.json'
import trains from './trains.json'
import priceTypes from './priceTypes.json'

export default class App extends Component {

	constructor() {
		super()
		this.state = {
			trains,
			searchQuery,
			priceTypes
		}
	}

	getSearchQuery() {
		return this.state.searchQuery
	}

	getPriceTypes() {
		return this.state.priceTypes
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

	selectTrainHandler(selectedTrainPrice) {
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
		const trains = [...this.getTrains()].map(train => {
			if (train.direction === direction && train.selectedPrice) {
				return { ...train, selectedPrice: null }
			}
			return train
		})

		this.setState({ trains })
	}

	render() {

		const data = {
			searchQuery: this.getSearchQuery(),
			trains: this.getTrains(),
			outboundTrain: this.getSelectedOutboundTrain(),
			inboundTrain: this.getSelectedInboundTrain(),
			outboundTrains: this.getOutboundTrains(),
			inboundTrains: this.getInboundTrains(),
			priceTypes: this.getPriceTypes()
		}
		const selectTrainHandler = this.selectTrainHandler.bind(this)
		const clearSelectionHandler = this.clearSelectionHandler.bind(this)

		const searchRoute = () => {
			return <Search { ...data } selectTrainHandler={ selectTrainHandler } clearSelectionHandler={ clearSelectionHandler } />
		}

		const checkoutRoute = () => {
			return <Checkout { ...data } />
		}

		const confirmationRoute = () => {
			return <Confirmation { ...data } />
		}

		const NoRoute = (match) => {
			return <p>Got nothing for you at <i>{ match.location.pathname }</i>. Do a pretend <Link to="/search">train search</Link>.</p>
		}

		return <BrowserRouter>
			<Match exactly pattern="/search" component={ searchRoute } />
			<Match exactly pattern="/checkout" render={ checkoutRoute } />
			<Match exactly pattern="/confirmation" render={ confirmationRoute } />
			<Miss component={ NoRoute } />
		</BrowserRouter>
	}
}
