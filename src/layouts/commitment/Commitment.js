import React, { Component } from 'react'

class Commitment extends Component {
  constructor(props){
    super(props)
  }

  render() {
    console.log("In commitment")
    console.log(this.props)
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Commitment</h1>
            <br/>
          </div>

        </div>
      </main>
    )
  }
}

export default Commitment
