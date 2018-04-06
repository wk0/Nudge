import _ from 'lodash';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import List, { ListItem, ListItemText } from 'material-ui/List';
import Paper from 'material-ui/Paper';
import Button from "material-ui/Button";

const styles = {
  button : {
    fontFamily:'Oswald', 
    fontWeight:'bold',    
    margin: '12px'
  },
  container: {
    padding: '12px'
  }
}

class Receipt extends Component {
  constructor(props){
    super(props);
  
    //this.handleSubmit = this.handleSubmit.bind(this);

    this.onCancel = this.onCancel.bind(this);
    this.onConfirm = this.onConfirm.bind(this);
  }
  
  renderItem(label, item){
    if (item == null){
      item = "N/A"
    } 
    return (
      <ListItem>
        <ListItemText primary={label} secondary={item}/>
      </ListItem>
    );
  }

  onConfirm(){
    console.log("confirmed")
  }

  onCancel(){
    console.log("cancelled")
    //this.props.toCommitForm(this.state.term, this.state.userAddr);
    this.props.router.push('/')
  }

  render() {
    const contractTerms = this.props.state.commitment[0]
    console.log(contractTerms)

    var body;
    if (contractTerms === undefined ){
      body = (
        <List>
          <ListItem>
            <ListItemText primary="Commitment" secondary="undefined"/>
          </ListItem>
        </List>
      )
    }
    else {
      body = ( 
        <div style={styles.container}>
          <List>
            {this.renderItem("Commitment", contractTerms.commitment)}
            {this.renderItem("Deadline", contractTerms.deadline)}
            {this.renderItem("User Address", contractTerms.userAddress)}
            {this.renderItem("Moderator Address", contractTerms.modAddress)}
            {this.renderItem("Alternative Payout Address", contractTerms.altAddress)}
          </List>
          <br/>
          <div>
            <Button variant="raised" color="primary" style={styles.button} onClick={this.onConfirm}>Confirm</Button>
            <Button variant="raised" color="secondary" style={styles.button} onClick={this.onCancel}>Cancel</Button>
          </div>
        </div>
      );
    }
    

    return (
      <main className="container">
        <div className="pure-g" >
          <div className="pure-u-1-1 header">
            <Paper elevation={4}>
              <br/>
              <h1>Commitment Receipt</h1>
              <br/>
              {body}
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

export default connect(mapStateToProps, {})(Receipt);
