import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommitmentForm from './../../components/CommitmentForm'

class Commitment extends Component {
  constructor(props){
    super(props)
  }

  render() {
    const commitment = this.props.state.commitment[0];
    return (
      <main className="container">
        <div className="pure-g">
          <div className="pure-u-1-1 header">
            <h1>New Commitment</h1>
            <br/>
            <CommitmentForm/>
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
