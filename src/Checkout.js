import React, { Component } from 'react'
import Basket from './Basket'

export default class Checkout extends Component {

	render() {
		return <div>
			<h2>Checkout</h2>
			<form>
				<h3>Travel details go here</h3>
			</form>
			<Basket page="checkout" { ...this.props } />
		</div>
	}
}
