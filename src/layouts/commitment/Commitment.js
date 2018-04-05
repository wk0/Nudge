import React, { Component } from 'react'
import { connect } from 'react-redux'
import CommitmentForm from './../../components/CommitmentForm'
import Paper from 'material-ui/Paper';

class Commitment extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g" >
          <div className="pure-u-1-1 header">
            <Paper elevation={4}>
              <br/>
              <h1>New Commitment</h1>
              <br/>
              <CommitmentForm/>
            </Paper>
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
