import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper';

class MyCommitments extends Component {
  render() {
    return (
      <main className="container">
        <div className="pure-g" >
          <div className="pure-u-1-1 header">
            <Paper elevation={4}>
              <br/>
              <h1>My Commitments</h1>
              <br/>
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

export default connect(mapStateToProps, {})(MyCommitments);