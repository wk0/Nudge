import React, { Component } from 'react'
import logo from '../../logo.png'

import LandingCommitmentForm from '../../components/LandingCommitmentForm';

class Landing extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Nudge</h1>
            <p>A Decentralized Productivity App</p>
            <br/>
            <LandingCommitmentForm/>
          </div>
        </div>
      </main>
    )
  }
}

export default Landing
