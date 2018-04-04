import Commitment from './Commitment'
import { connect } from 'react-redux'

// May still need this even with data function to refresh component on updates for this contract.
const mapStateToProps = state => {
  return {
    accounts: state.accounts
  }
}

const CommitmentContainer = connect(mapStateToProps, {})(Commitment);
export default CommitmentContainer
