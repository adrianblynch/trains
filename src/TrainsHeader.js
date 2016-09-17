import React, { Component } from 'react'
import FormattedDate from './FormattedDate'

export default class TrainsHeader extends Component {

	render() {
		const { direction, date, from, to } = this.props
		return <h2>
			{ direction }
			<br />
			{ `${from} to ${to}` }
			<br />
			<FormattedDate dateString={ date } />
		</h2>
	}
}
