import LandingCommitmentForm from './LandingCommitmentForm'
import { connect } from 'react-redux'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts
  }
}

const LandingCommitmentFormContainer = connect(mapStateToProps, {})(LandingCommitmentForm);
export default LandingCommitmentFormContainer
