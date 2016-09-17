import React, { Component } from 'react'
import Link from 'react-router/Link'
import './Basket.css'
import FormattedDate from './FormattedDate'

export default class Basket extends Component {

	renderPrice(count, passengerType, priceType, price) {
		return <li className="basket-price">
			<span>{ count } x { passengerType } { priceType } (£{ price }) tickets</span>
			<span className="basket-price__sub-total">£{ count * price }</span>
		</li>
	}

	renderLegTotal(subTotal) {
		return <li className="basket-prices__sub-total">£{ subTotal }</li>
	}

	renderLeg(origin, destination, date, train, adults, juniors) {
		const subTotal = (adults * train.prices[train.selectedPrice].adult) + (juniors * train.prices[train.selectedPrice].junior)
		return <div>
			<p> { origin } to { destination }</p>
			<p><FormattedDate dateString={ date } /> { train.departure } - { train.arrival }</p>
			<ul className="basket-prices">
				{ this.renderPrice(adults, 'adult', train.selectedPrice, train.prices[train.selectedPrice].adult) }
				{ this.renderPrice(juniors, 'junior', train.selectedPrice, train.prices[train.selectedPrice].junior) }
				{ this.renderLegTotal(subTotal) }
			</ul>
		</div>
	}

	renderPrompt(direction) {
		return <p>Please choose your { direction } train</p>
	}

	getLegTotal(train, adults, juniors) {
		const selectedPrices = train.prices[train.selectedPrice]
		const adultCost = selectedPrices.adult * adults
		const juniorCost = selectedPrices.junior * juniors
		return adultCost + juniorCost

	}

	renderTotal(origin, destination, outboundTrain, inboundTrain, adults, juniors) {

		const outboundTotal = outboundTrain ? this.getLegTotal(outboundTrain, adults, juniors) : 0
		const inboundTotal = inboundTrain ? this.getLegTotal(inboundTrain, adults, juniors) : 0
		const total = outboundTotal + inboundTotal

		if (!total) {
			return null
		}

		return (
			<section className="basket__total">
				The total to get you from { origin } to { destination } and back again is... £{ total }
			</section>
		)
	}

	proceedOnClick() {
		alert('Routing to still come!')
	}

	render() {

		const {
			searchQuery: { origin, destination, outboundDate, inboundDate, adults, juniors },
			outboundTrain,
			inboundTrain
		} = this.props
		const link = this.props.page === 'search' ?
			<Link to="/checkout">
				<button>Proceed to checkout</button>
			</Link>
			:
			<Link to="/confirmation">
				<button>Confirmation</button>
			</Link>

		return <div className="basket">
			<h2 className="basket__header">Basket</h2>
			<section className="basket-leg">
				<h3 className="basket-leg__header">Outbound</h3>
				{
					outboundTrain ?
					this.renderLeg(origin, destination, outboundDate, outboundTrain, adults, juniors) :
					this.renderPrompt('outbound')
				}
			</section>
			<section className="basket-leg">
				<h3 className="basket-leg__header">Inbound</h3>
				{
					inboundTrain ?
					this.renderLeg(destination, origin, inboundDate, inboundTrain, adults, juniors) :
					this.renderPrompt('inbound')
				}
			</section>
			{ this.renderTotal(origin, destination, outboundTrain, inboundTrain, adults, juniors) }
			<section className="basket__proceed">
				{ link }
			</section>
		</div>
	}
}
