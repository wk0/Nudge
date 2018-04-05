import React, { Component } from 'react'
//import { Link, Redirect } from 'react-router'
import Button from 'material-ui/Button';
import { Field, reduxForm } from 'redux-form'

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { withRouter } from 'react-router' 


class CommitmentForm extends Component {
  constructor(props){
    super(props)

    this.state = {
      commitment: this.props.commitment ? this.props.commitment : "run a mile"
    }
  } 

  handleSubmit(values) {
    // print the form values to the console
    console.log(values.commitment)
  }

  render() {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleSubmit)}>
        <div>
          <label htmlFor="commitment">Commitment</label>
          <Field name="commitment" component="input" type="text" value={this.state.commitment} />
        </div>
        <br/>
        <button type="submit">Submit</button>
      </form>
    )
  }
}

const validate = values => {
  const errors = {};
  return errors;
}

function mapStateToProps(state){
  return {
      initialValues: {commitment: state.commitment}
  }
}

CommitmentForm = reduxForm({
    // a unique name for the form
    form: 'mainCommitment',
    validate
})(CommitmentForm)

export default connect(mapStateToProps, {})(CommitmentForm);
