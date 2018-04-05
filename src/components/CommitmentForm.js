import React, { Component } from "react";

import Button from "material-ui/Button";
import TextField from 'material-ui/TextField';
import { Field, reduxForm } from "redux-form";

import { connect } from "react-redux";

//For date picker
//import MomentUtils from 'material-ui-pickers/utils/moment-utils';
//import MuiPickersUtilsProvider from 'material-ui-pickers/utils/MuiPickersUtilsProvider';
//import DatePicker from 'material-ui-pickers/DatePicker';
//import moment from 'moment'

const styles = {
  formContainer : {
    padding: '12px',
    //backgroundColor: "#ffffe5"
  },
  goButton : {
    fontFamily:'Oswald', 
    fontWeight:'bold', 
    backgroundColor:'secondary'
  },
  labels : {
    paddingRight:"8px"
  }, 
  pair : {
    display: "flex",
    justifyContent: "space-between"
  },
  textField: {
    width: '60%'
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

  renderField(field) {
    // also pulls off touched and error from meta,
    // so can now use meta instead of field.meta.touched
    const { meta: { touched, error } } = field;

    return (
      <TextField 
        error={touched && error ? true : false}
        label={field.label}
        {...field.input} 
        style={styles.textField}
        helperText={touched ? error : ""}
      />
    );
  }

  /*
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control" type="text" {...field.input} />
        <div className="text-help">{touched ? error : ""}</div>
      </div>
    );

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
      <div style={styles.formContainer}>
        <form onSubmit={handleSubmit(this.handleSubmit)}>
          <div style={styles.pair}>
            <label style={styles.labels} htmlFor="commitment">Commitment</label>
            <Field name="commitment" component={this.renderField} type="text" />
          </div>

          <div style={styles.pair}>
            <label style={styles.labels} htmlFor="deadline">By (DD/MM/YY)</label>
            <Field name="deadline" component={this.renderField} type="date" />
          </div>

          <div style={styles.pair}>
            <label style={styles.labels} htmlFor="userAddress">My Address</label>
            <Field name="userAddress" component={this.renderField} type="text" />
          </div>

          <div style={styles.pair}>
            <label style={styles.labels} htmlFor="modAddress">Moderator Address</label>
            <Field name="modAddress" component={this.renderField} type="text" />
          </div>

          <div style={styles.pair}>
            <label style={styles.labels} htmlFor="altAddress">Alternative Payout Address</label>
            <Field name="altAddress" component={this.renderField} type="text" />
          </div>          

          <br />
          <Button variant="raised" color="primary" type="submit" style={styles.goButton}>Submit</Button>
        </form>
      </div>
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

  if (!values.deadline ) {
    errors.deadline = "Enter a deadline"
  }

  if (!values.userAddress) {
    errors.userAddress = "Enter your Ethereum Address!"
  }

  if (!values.modAddress) {
    errors.modAddress = "Enter a moderator Ethereum Address!"
  }

  if (!values.altAddress) {
    errors.altAddress = "Enter an alternative payout Ethereum Address!"
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
