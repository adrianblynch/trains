import React, { Component } from 'react'
// import Train from './Train'
import './Trains.css'

export default class Trains extends Component {

	trainPriceValue(trainId, priceType) {
		return `${this.props.direction}_${trainId}_${priceType}`
	}

	trainPriceName() {
		return `trainPrice_${this.props.direction}`
	}

	trainPriceOnClick(trainId, priceType) {
		this.props.trainPriceHandler(this.trainPriceValue(trainId, priceType))
	}

	render() {
		return <ul className="trains">
			{
				this.props.trains.map(train =>
					<li key={ train.id } className={ train.selectedPrice !== null ? 'train train--selected' : 'train' }>
						<div className="train__details">
							<span>{ train.departure }</span>
							<span>-------</span>
							<span>{ train.arrival }</span>
						</div>
						<ul className="train__prices">
							{
								this.props.priceTypes.map(priceType => <li key={ priceType } className="train-price">
									<div className="train-price__hitarea" onClick={ this.trainPriceOnClick.bind(this, train.id, priceType) }>
										<span className="train-price__type">{ priceType }</span>
										<span className="train-price__input">
											<input
												type="radio"
												name={ this.trainPriceName() }
												value={ this.trainPriceValue(train.id, priceType) }
												checked={ train.selectedPrice === priceType }
											/>
										</span>
										<span className="train-price__display-price">
											£{ train.prices[priceType].adult } (£{ train.prices[priceType].junior })
										</span>
									</div>
								</li>)
							}
						</ul>
					</li>
				)
			}
		</ul>
	}
}
