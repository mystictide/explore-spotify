import React, { Component } from 'react'

export class loading extends Component {
  render() {
    return (
        <div className='loading'><div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div></div>
    )
  }
}

export default loading