import React, { Component } from 'react'
import TrainPrices from './TrainPrices'
import './Train.css'

export default class Train extends Component {

	render() {
		return <div className="train">
			<div className="train__details">
				<span className="train__departure">{ this.props.departure }</span>
				<span className="train__arrow">------></span>
				<span className="train__arrival">{ this.props.arrival }</span>
			</div>
			<div className="train__prices">
				<TrainPrices
					{ ...this.props.prices }
					direction={ this.props.direction }
					trainId={ this.props.trainId }
				/>
			</div>
		</div>
	}
}
