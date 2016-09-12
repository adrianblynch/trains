import React, { Component } from 'react'
import TrainPrice from './TrainPrice'

export default class TrainPrices extends Component {

	constructor() {
		super()
		this.priceTypes = ['normal', 'über', 'awesome']
	}

	render() {
		return <div>
			{this.priceTypes.map(priceType =>
				<TrainPrice
					key={ priceType }
					type={ priceType }
					{ ...this.props[priceType] }
					trainId={ this.props.trainId }
					direction={ this.props.direction }
					trainPriceHandler={ this.props.trainPriceHandler }
					selected={ this.props.selectedPrice === priceType }
				/>
			)}
		</div>
	}
}
