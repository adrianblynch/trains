import React, { Component } from 'react'
import './Basket.css'

export default class Basket extends Component {

	renderLeg(direction, train) {
		return <div className="basket-leg">
			{ train ? this.renderTrain(train) : `Please choose your ${direction} train` }
		</div>
	}

	renderTrain(train) {
		return <div>
			{ train.departure } - { train.arrival }
			{ this.renderPrices(train.prices) }
		</div>
	}

	renderPrices(prices) {
		return JSON.stringify(prices, null, 2)
	}

	render() {
		return <div>
			{ this.renderLeg('Outbound', this.props.outboundTrain) }
			{ this.renderLeg('Inbound', this.props.inboundTrain) }
		</div>
	}
}
