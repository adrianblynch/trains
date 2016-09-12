import React, { Component } from 'react'
import './TrainPrice.css'

export default class TrainPrice extends Component {

	getName() {
		return `${this.props.direction}`
	}

	getValue() {
		return `${this.props.direction}_${this.props.trainId}_${this.props.type}`
	}

	onClick(e) {
		this.props.trainPriceHandler(this.getValue())
	}

	render() {
		return <div className="train-price" onClick={ this.onClick.bind(this) }>
			{ this.props.type }<br />
			<input type="radio" name={ this.getName() } value={ this.getValue() } checked={ this.props.selected } /><br />
			£{ this.props.adult }
		</div>
	}
}
