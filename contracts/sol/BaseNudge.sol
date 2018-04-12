pragma solidity ^0.4.18;

// Needed to handle accidental sending of tokens, 
// will be needed in the future to support tokens
contract Token {
    function transfer(address _to, uint _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint _value) public returns (bool success);
    function approve(address _spender, uint _value) public returns (bool success);
}
// Explinations:
// --- 
// external functions can read directly from calldata, cheaper
// they cannot be called from within the contract though
// 
// public functions write to memory, and can be called from within
// the contract 
// ---

contract BaseNudge {
  enum State {AWAITING_COMMITMENT, AWAITING_COMPLETION, AWAITING_JUDGING, SUCCESS, FAILURE}
  State public currentState;

  event SelfDestruct(address _contract, State _state);

  address public contractAddress; 
  address public user;
  address public nudgeStaff;
  address public moderator;
  address public alternativePayout;
  
  modifier onlyNudgeStaff() {
    require(msg.sender == nudgeStaff);
    _;
  }
  
  modifier onlyUser() {
    require(msg.sender == user);
    _;
  }

  modifier onlyModerator() {
    require(msg.sender == moderator);
    _;
  }

  modifier inState(State expectedState){
    require(currentState == expectedState);
    _;
  }

  // Can change user and as a result the beneficiary if the original user succeeds 
  function setUser(address _newUser) onlyUser external {
    user = _newUser;
  }

  function setNudgeStaff(address _newNudgeStaff) onlyNudgeStaff external {
    nudgeStaff = _newNudgeStaff;
  }

  // Constructor 
  function BaseNudge(address _nudgeStaff, address _user, address _moderator, address _alternativePayout) public payable {
    contractAddress = this;
    nudgeStaff = _nudgeStaff;
    user = _user;
    moderator = _moderator;
    alternativePayout = _alternativePayout;
  }

  // Ensure payout has already occured
  function destroy() onlyNudgeStaff public {
    require(currentState == State.SUCCESS || currentState == State.FAILURE);
    SelfDestruct(contractAddress, currentState);
    selfdestruct(nudgeStaff);
  }

  // Fallback function http://solidity.readthedocs.io/en/develop/contracts.html#fallback-function
  // if someone .sends() to this contract without data, will hit this function
  function() public payable { }

  // In case someone sends a token to our contract, nudgeStaff can remove it
  //  the tokens would otherwise be trapped forever
  function transferToken(Token _tokenContract, address _transferTo, uint256 _value) onlyNudgeStaff external {
       _tokenContract.transfer(_transferTo, _value);
  }
  function transferTokenFrom(Token _tokenContract, address _transferTo, address _transferFrom, uint256 _value) onlyNudgeStaff external {
    _tokenContract.transferFrom(_transferTo, _transferFrom, _value);
  }
  function approveToken(Token _tokenContract, address _spender, uint256 _value) onlyNudgeStaff external {
    _tokenContract.approve(_spender, _value);
  }
}
