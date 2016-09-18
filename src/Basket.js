import React, { Component } from 'react'
import Link from 'react-router/Link'
import './Basket.css'
import FormattedDate from './FormattedDate'

export default class Basket extends Component {

	render() {

		const {
			searchQuery: { origin, destination, outboundDate, inboundDate, adults, juniors },
			outboundTrain,
			inboundTrain
		} = this.props
		const link = this.props.page === 'search' ?
			<Link to="/checkout"><button>Proceed to checkout</button></Link> :
			<Link to="/confirmation"><button>Confirmation</button></Link>
		const outboundLeg = outboundTrain ?
			<Leg
				origin={ origin }
				destination={ destination }
				date={ outboundDate }
				train={ outboundTrain }
				adults={ adults }
				juniors={ juniors }
			/> :
			<Prompt direction="outbound" />
		const inboundLeg = inboundTrain ?
			<Leg
				origin={ destination }
				destination={ origin }
				date={ inboundDate }
				train={ inboundTrain }
				adults={ adults }
				juniors={ juniors }
			/> :
			<Prompt direction="inbound" />

		return <div className="basket">
			<h2 className="basket__header">Basket</h2>
			<section className="basket-leg">
				<h3 className="basket-leg__header">Outbound</h3>
				{ outboundLeg }
			</section>
			<section className="basket-leg">
				<h3 className="basket-leg__header">Inbound</h3>
				{ inboundLeg }
			</section>
			<Total
				origin={ origin }
				destination={ destination }
				outboundTrain={ outboundTrain }
				inboundTrain={ inboundTrain }
				adults={ adults }
				juniors={ juniors }
			/>
			<section className="basket__proceed">
				{ link }
			</section>
		</div>
	}
}

const Prompt = ({ direction }) => (<p>Please choose your { direction } train</p>)

const LegTotal = ({ total }) => (<li className="basket-prices__sub-total">£{ total }</li>)

const Price = ({ count, passengerType, priceType, price }) => (
	<li className="basket-price">
		<span>{ count } x { passengerType } { priceType } (£{ price }) tickets</span>
		<span className="basket-price__sub-total">£{ count * price }</span>
	</li>
)

const Total = ({ origin, destination, outboundTrain, inboundTrain, adults, juniors }) => {

	const getLegTotal = (train, adults, juniors) => {
		const selectedPrices = train.prices[train.selectedPrice]
		const adultCost = selectedPrices.adult * adults
		const juniorCost = selectedPrices.junior * juniors
		return adultCost + juniorCost
	}

	const outboundTotal = outboundTrain ? getLegTotal(outboundTrain, adults, juniors) : 0
	const inboundTotal = inboundTrain ? getLegTotal(inboundTrain, adults, juniors) : 0
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

const Leg = ({ origin, destination, date, train, adults, juniors }) => {
	const total = (adults * train.prices[train.selectedPrice].adult) + (juniors * train.prices[train.selectedPrice].junior)

	return <div>
		<p> { origin } to { destination }</p>
		<p><FormattedDate dateString={ date } /> { train.departure } - { train.arrival }</p>
		<ul className="basket-prices">
			<Price
				passengerType="adult"
				count={ adults }
				priceType={ train.selectedPrice }
				price={ train.prices[train.selectedPrice].adult }
			/>
			<Price
				passengerType="junior"
				count={ juniors }
				priceType={ train.selectedPrice }
				price={ train.prices[train.selectedPrice].junior }
			/>
			<LegTotal total={ total } />
		</ul>
	</div>
}
