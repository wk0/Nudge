pragma solidity ^0.4.18;

import './StandardNudge.sol';
// Needed to handle accidental sending of tokens, 
// will be needed in the future to support tokens

contract NudgeFactory {
  // Generic Factory 
  // -----
  address public owner;
  bool public live = true;

  event FactoryLive(
    bool _live
  );

  modifier onlyOwner() {
    require(msg.sender == owner);
    _;
  }

  // Turn factory contract on or off
  function setLive(bool x) onlyOwner external {
    live = x;
    FactoryLive(live);
  }
  
  // Can change owner and as a result the nudgeStaff in subsequent contracts
  function setOwner(address _newOwner) onlyOwner external {
    owner = _newOwner;
  }

  function NudgeFactory() public {
    owner = msg.sender;
  }



  // -----


  // Base Nudge 
  // -----
  /*
  event NewBaseNudge(
    address _contractAddress
  );

  mapping (address => address[]) accountToBaseNudgeMap;
  address[] public allBaseNudgeContracts;

  // Shows ALL contracts produced by this Factory
  function getAllBaseNudgeContracts() external constant returns(address[] contracts) {
      return allBaseNudgeContracts;
  }

  function getBaseNudgeCountForAccount(address account) public constant returns(uint contractCount) {
    return accountToBaseNudgeMap[account].length;
  }
  
  function getBaseNudgeContractsForAccount(address account) public constant returns(address[] contractsForAccount) {
    return accountToBaseNudgeMap[account];
  }

  // deploy a new contract
  function newBaseNudge(address _user, address _moderator, address _alternativePayout) public payable returns(address newNudgeAddress) {
    require(live);
    
    // Note: Owner is set to the nudgeStaff within the Nudge Contract
    BaseNudge nudge = new BaseNudge(owner, _user, _moderator, _alternativePayout);
    nudge.transfer(msg.value);

    NewBaseNudge(nudge);
    
    // Poor redundancy, but needed global list for community page on the front end
    accountToBaseNudgeMap[msg.sender].push(nudge);
    allBaseNudgeContracts.push(nudge);

    return nudge;
  }
  */
  // -----


  // Standard Nudge 
  // -----
  event NewStandardNudge(
    address _contractAddress
  );

  mapping (address => address[]) accountToStandardNudgeMap;
  address[] public allStandardNudgeContracts;

  // Shows ALL contracts produced by this Factory
  function getAllStandardNudgeContracts() external constant returns(address[] contracts) {
      return allStandardNudgeContracts;
  }

  function getStandardNudgeCountForAccount(address account) public constant returns(uint contractCount) {
    return accountToStandardNudgeMap[account].length;
  }
  
  function getStandardNudgeContractsForAccount(address account) public constant returns(address[] contractsForAccount) {
    return accountToStandardNudgeMap[account];
  }

  // deploy a new contract
  function newStandardNudge(address _user, address _moderator, address _alternativePayout, string _commitment, uint _durationMinutes) public payable returns(address newNudgeAddress) {
    require(live);
    
    // Note: Owner is set to the nudgeStaff within the Nudge Contract
    StandardNudge nudge = new StandardNudge(owner, _user, _moderator, _alternativePayout, _commitment, _durationMinutes);
    nudge.transfer(msg.value);

    NewStandardNudge(nudge);
    
    // Poor redundancy, but needed global list for community page on the front end
    accountToStandardNudgeMap[msg.sender].push(nudge);
    allStandardNudgeContracts.push(nudge);

    return nudge;
  }
  // -----

  
  function destroy() onlyOwner public {
    require(!live);
    selfdestruct(owner);
  }


  // Safety Boilerplate for accidental funds / tokens 
  // -----
  // Fallback function http://solidity.readthedocs.io/en/develop/contracts.html#fallback-function
  // if someone .sends() to this contract without data, will hit this function
  function() public payable { }

  // In case someone sends a token to our contract, nudgeStaff can remove it
  //  the tokens would otherwise be trapped forever
  function transferToken(Token _tokenContract, address _transferTo, uint256 _value) onlyOwner external {
       _tokenContract.transfer(_transferTo, _value);
  }
  function transferTokenFrom(Token _tokenContract, address _transferTo, address _transferFrom, uint256 _value) onlyOwner external {
    _tokenContract.transferFrom(_transferTo, _transferFrom, _value);
  }
  function approveToken(Token _tokenContract, address _spender, uint256 _value) onlyOwner external {
    _tokenContract.approve(_spender, _value);
  }
  // -----
}