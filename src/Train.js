import React, { Component } from 'react'
import TrainPrices from './TrainPrices'
import './Train.css'

export default class Train extends Component {

	render() {
		return <li className={ this.props.selectedPrice !== null ? 'train train--selected' : 'train' }>
			<div className="train__details">
				<span className="train__departure">{ this.props.departure }</span>
				<span className="train__arrow"> ------ </span>
				<span className="train__arrival">{ this.props.arrival }</span>
			</div>
			<div className="train__prices">
				<TrainPrices
					{ ...this.props.prices }
					direction={ this.props.direction }
					trainId={ this.props.id }
					trainPriceHandler={ this.props.trainPriceHandler }
					selectedPrice={ this.props.selectedPrice }
				/>
			</div>
		</li>
	}
}
