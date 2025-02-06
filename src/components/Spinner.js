import React, { Component } from 'react'
import loading from './Iphone-spinner-2.gif'

export default class Spinner extends Component {
  render() {
    return (
      <div className='text-center'>
        <img  src={loading} alt="Loading" />
      </div>
    )
  }
}
