import React, { Component } from 'react'
import { Link, Redirect } from 'react-router'
import Button from 'material-ui/Button';


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
    };

    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({term : event.target.value})
  }

  onFormSubmit(event) {
    event.preventDefault();
    //fetch weather data here
    //this.props.fetchWeather(this.state.term);
    //this.setState({term: ''});
    console.log("formSubmit", this.state.term);
  }
  
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div style={styles.formDiv}>
          <div style={styles.wantTo}> I want to</div>
          <input value={this.state.term} onChange={this.onInputChange}/>
          <Button type="submit" color="inherit" style={styles.goButton}>Go!</Button>
        </div>
      </form>
    );
  }
}

export default LandingCommitmentForm;
