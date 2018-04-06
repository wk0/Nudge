import _ from 'lodash';
import React, { Component } from 'react'
import { connect } from 'react-redux'
import List, { ListItem, ListItemText } from 'material-ui/List';

class Receipt extends Component {
  constructor(props){
    super(props);
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
        <List>
          {this.renderItem("Commitment", contractTerms.commitment)}
          {this.renderItem("Deadline", contractTerms.deadline)}
          {this.renderItem("User Address", contractTerms.userAddress)}
          {this.renderItem("Moderator Address", contractTerms.modAddress)}
          {this.renderItem("Alternative Payout Address", contractTerms.altAddress)}
        </List>
      );
    }
    

    return (
      <main className="container">
        <div className="pure-g" >
          <div className="pure-u-1-1 header">
              <h1>Commitment Receipt</h1>
              <br/>
              <br/>
          </div>
          <div className="pure-u-1-1">
            {body}
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
