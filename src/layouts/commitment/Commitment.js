import React, { Component } from 'react'
import { connect } from 'react-redux'

class Commitment extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const commitment = this.props.state.commitment[0];
    console.log(commitment)
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>Commitment</h1>
            <br/>
            <h3>{commitment}</h3>

          </div>
        </div>
      </main>
    );
  }
}
const mapStateToProps = state => {
  return {state}
}

export default connect(mapStateToProps, {})(Commitment);
