import React, { Component } from 'react'
import { Link, Redirect } from 'react-router'
import Button from 'material-ui/Button';


class LandingCommitmentForm extends Component {
  constructor(props){
    super(props);

    this.state = { 
      term: 'run a marathon', 
      redirect: false
    };
  }

  onInputChange(term) {
    this.setState({term});
  }

  _handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      console.log(this.state.term)
      this.setState({redirect:true})
    }
  }
  
  render() {
    if (this.state.redirect){
      <Redirect to='commitment'/>
    }

    const commitLink = props => <Link to="/commitment" {...props} />

    return (
      <div style={{display:"flex", flexDirection:"row", justifyContent:"center", padding:'8px', backgroundColor:"primary" }}>
        <div style={{marginRight: '12px', fontSize:'18px', paddingTop:'5px'}}> I want to</div>
        <input value={this.state.term} onChange={event => this.onInputChange(event.target.value)} onKeyPress={this._handleKeyPress}/>
        <Button component={commitLink} color="inherit" style={{fontFamily:'Oswald', fontWeight:'bold', backgroundColor:'secondary'}}>Go!</Button>
      </div>

    )
  }
}

export default LandingCommitmentForm;