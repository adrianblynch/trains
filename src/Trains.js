import React, { Component } from 'react'
import Train from './Train'
import './Trains.css'

export default class Trains extends Component {

	render() {
		return <ul className="trains">
			{ this.props.trains.map(train => <li className="trains__item" key={ train.id }>
				<Train { ...train } direction={ this.props.direction } />
			</li>) }
		</ul>
	}
}
