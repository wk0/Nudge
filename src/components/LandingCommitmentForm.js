import React, { Component } from 'react'
//import { Link, Redirect } from 'react-router'
import Button from 'material-ui/Button';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { toCommitForm } from '../actions/index';

import { withRouter } from 'react-router' 

import getWeb3 from "./../util/web3/getWeb3"

const styles = {
  formDiv : {
    display:"flex", 
    flexDirection:"row", 
    justifyContent:"center", 
    padding:'8px', 
    backgroundColor:"primary" 
  },
  wantTo : {
    marginRight: '12px', 
    fontSize:'18px', 
    paddingTop:'5px'
  },
  goButton : {
    fontFamily:'Oswald', 
    fontWeight:'bold', 
    backgroundColor:'secondary'
  }
}

class LandingCommitmentForm extends Component {
  constructor(props){
    super(props);

    this.state = { 
      term: 'run a marathon', 
      userAddr: ''
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  componentDidMount(){
    getWeb3.then((web3) => {
      if(web3){
        //console.log(web3.payload.web3Instance)
        web3.payload.web3Instance.eth.getAccounts((err, res) => {
          if(!err){
            this.setState({userAddr: res[0]})
          }
        });
      }
    })
  }

  onInputChange(event) {
    this.setState({term : event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();
    //push to the real form
    this.props.toCommitForm(this.state.term, this.state.userAddr);
    this.props.router.push('/commitment')
  }
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div style={styles.formDiv}>
          <div style={styles.wantTo}> I want to</div>
          <input value={this.state.term} onChange={this.onInputChange}/>
          <Button variant="raised" type="submit" color="primary" style={styles.goButton}>Go</Button>
        </div>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ toCommitForm }, dispatch);
}

export default withRouter(connect(null, mapDispatchToProps)(LandingCommitmentForm));
