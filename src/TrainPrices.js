import React, { Component } from 'react'
import TrainPrice from './TrainPrice'

export default class TrainPrices extends Component {

	constructor() {
		super()
		this.types = ['normal', 'über', 'awesome']
	}

	render() {
		return <div>
			{this.types.map(type =>
				<TrainPrice
					type={ type }
					{ ...this.props[type] }
					trainId={ this.props.trainId }
					direction={ this.props.direction }
				/>
			)}
		</div>
	}
}
