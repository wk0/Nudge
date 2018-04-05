import React, { Component } from "react";

import Button from "material-ui/Button";
import { Field, reduxForm } from "redux-form";

import { connect } from "react-redux";

//For date picker
//import MomentUtils from 'material-ui-pickers/utils/moment-utils';
//import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
//import DatePicker from 'material-ui-pickers/DatePicker';
//import moment from 'moment'

const styles = {
  goButton : {
    fontFamily:'Oswald', 
    fontWeight:'bold', 
    backgroundColor:'secondary'
  }
}

class CommitmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      commitment: this.props.commitment,
      userAddr: "",
    };

  }

  // TODO : Edit to be material ui complient
  renderField(field) {
    // also pulls off touched and error from meta,
    // so can now use meta instead of field.meta.touched
    const { meta: { touched, error } } = field;
    const className = `form-group ${touched && error ? "has-danger" : ""}`;

    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );
  }

  /*
  renderDatePicker(field) {
    const {input, placeholder, defaultValue, meta: {touched, error} } = field;
    
    return ( 
      <div>
        <DatePicker {...input} dateForm="MM/DD/YYYY" selected={input.value ? moment(input.value) : null} />
        {touched && error && <span>{error}</span>}
      </div>
    );
  }
  */

  handleSubmit(values) {
    // print the form values to the console
    console.log(values);
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      //<MuiPickersUtilsProvider utils={MomentUtils}>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div>
            <label htmlFor="commitment">Commitment</label>
            <Field name="commitment" component={this.renderField} type="text" />
          </div>
          <div>
            <label htmlFor="userAddress">My Address</label>
            <Field name="userAddress" component={this.renderField} type="text" />
          </div>
          <div>
            <label htmlFor="deadline">By</label>
            <Field name="deadline" component={this.renderField} type="date" />
          </div>


          <br />
          <Button variant="raised" color="primary" type="submit" style={styles.goButton}>Submit</Button>
        </form>
      //</MuiPickersUtilsProvider>
    );
  }
}

function validate(values) {
  // runs when user submits the form, and other times
  //console.log("running validators")
  const errors = {};

  // Validate the inputs from 'values'
  if (!values.commitment) {
    errors.commitment = "Enter a commitment!";
  }

  if (!values.userAddress) {
    errors.userAddress = "Enter your Ethereum Address!"
  }

  //if (!_web3.utils.isAddress(values.userAddress)){
  //  errors.userAddress = "Not a valid Ethereum Address"
  //}

  //console.log('inside validate', this.state)
  //console.log(this.state.web3.isAddress(values.userAddress));

  // If errors is empty, the form is fine to submit
  // If errors has *any* properties, redux form assumes form is invalid
  return errors;
}
function mapStateToProps(state) {
  // This initialized the form values
  return {
    initialValues: {
      commitment: state.commitment[0],
      userAddress: state.commitment[1]
    }
  };
}

CommitmentForm = reduxForm({
  // a unique name for the form
  validate,
  form: "mainCommitment"
})(CommitmentForm);

export default connect(mapStateToProps, {})(CommitmentForm);
