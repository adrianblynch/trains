import React, { Component } from 'react'
import FormattedDate from './FormattedDate'
import './TrainsHeader.css'

export default class TrainsHeader extends Component {

	render() {
		const { direction, date, from, to, priceTypes } = this.props
		return <div>
			<h2>
				{ direction }
				<br />
				{ `${from} to ${to}` }
				<br />
				<FormattedDate dateString={ date } />
			</h2>
			<ul className="trains-header__types">
				<li>Ticket type:</li>
				{ priceTypes.map(priceType => (<li className="" key={ priceType }>{ priceType }</li>)) }
			</ul>
		</div>
	}
}
