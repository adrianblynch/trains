import React, { Component } from 'react'
import fecha from 'fecha'

export default class FormattedDate extends Component {

	render() {
		const [year, month, day] = this.props.dateString.split('-')
		return <span>{ fecha.format(new Date(year, month, day), 'ddd Do MMM YYYY') }</span>
	}
}
