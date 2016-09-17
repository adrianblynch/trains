import React, { Component } from 'react'
import TrainsHeader from './TrainsHeader'
import Trains from './Trains'
import Basket from './Basket'

export default class TrainSearch extends Component {

	clearSelectionHandler(direction) {
		const trains = [...this.props.trains].map(train => {
			if (train.direction === direction && train.selectedPrice) {
				return { ...train, selectedPrice: null }
			}
			return train
		})

		this.setState({ trains })
	}

	clearSelectionClick(direction) {
		return () => {
			this.clearSelectionHandler(direction)
		}
	}

	render() {

		const {
			outboundTrains,
			inboundTrains,
			priceTypes,
			searchQuery: {
				outboundDate,
				inboundDate,
				origin,
				destination
			},
			selectTrainHandler
		} = this.props

		return <div>
			<TrainsHeader
				direction="Outbound"
				date={ outboundDate }
				from={ origin }
				to={ destination }
			/>
			<Trains
				direction="outbound"
				priceTypes={ priceTypes }
				trains={ outboundTrains }
				selectTrainHandler={ selectTrainHandler }
			/>
			<button onClick={ this.clearSelectionClick('outbound') }>Clear selection</button>
			<TrainsHeader
				direction="Inbound"
				date={ inboundDate }
				from={ destination }
				to={ origin }
			/>
			<Trains
				direction="inbound"
				priceTypes={ priceTypes }
				trains={ inboundTrains }
				selectTrainHandler={ selectTrainHandler }
			/>
			<button onClick={ this.clearSelectionClick('inbound') }>Clear selection</button>
			<Basket page="search" { ...this.props } />
		</div>
	}
}
