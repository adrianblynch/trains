import React, { Component } from 'react'
import './TrainPrice.css'

export default class TrainPrice extends Component {

	render() {
		console.log(JSON.stringify(this.props, null, 2))
		return <div className="train-price">
			{ this.props.type }<br />
			<input type="radio" /><br />
			£{ this.props.adult }
		</div>
	}
}
