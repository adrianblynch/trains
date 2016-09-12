import React, { Component } from 'react'
import './Basket.css'

export default class Basket extends Component {

	renderPrice(count, passengerType, priceType, price) {
		return <li>
			{ count } x { passengerType } { priceType } (£{ price }) tickets - £{ count * price }
		</li>
	}

	renderLeg(origin, destination, date, train, passengerTypes, adults, juniors) {
		return <div>
			<p> { origin } to { destination }</p>
			<p>{ date } 12:00 - 13:00</p>
			<ul>
				{ this.renderPrice(adults, 'adult', train.selectedPrice, train.prices[train.selectedPrice].adult) }
				{ this.renderPrice(juniors, 'junior', train.selectedPrice, train.prices[train.selectedPrice].junior) }
			</ul>
		</div>
	}

	renderPrompt(direction) {
		return <p>Please choose your { direction } train</p>
	}

	render() {
		const {
			searchQuery: { origin, destination, outboundDate, inboundDate, adults, juniors },
			outboundTrain,
			inboundTrain,
			passengerTypes
		} = this.props

		return <div>
			<h3>Outbound</h3>
			{
				outboundTrain ?
				this.renderLeg(origin, destination, outboundDate, outboundTrain, passengerTypes, adults, juniors) :
				this.renderPrompt('outbound')
			}
			<h3>Inbound</h3>
			{
				inboundTrain ?
				this.renderLeg(destination, origin, inboundDate, inboundTrain, passengerTypes, adults, juniors) :
				this.renderPrompt('inbound')
			}
		</div>
	}
}
