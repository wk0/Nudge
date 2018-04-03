pragma solidity ^0.4.18;

import './BaseNudge.sol';

contract StandardNudge is BaseNudge {  
  string public commitment;
  string public proof;
  bool public verdict;
  uint public deadline;
  bool public proofProvided = false;

  event DeadlineProvided(uint _deadline);
  event VerdictDecided(bool verdict, address payout);
  event ProofHasBeenProvided(string proof);
  event NoProofProvided(uint time); 

  // Constructor 
  function StandardNudge(address _nudgeStaff, address _user, address _moderator, address _alternativePayout, string _commitment, uint _durationMinutes) BaseNudge(_nudgeStaff, _user, _moderator, _alternativePayout) public payable {
    contractAddress = this;
    nudgeStaff = _nudgeStaff;
    user = _user;
    moderator = _moderator;
    
    alternativePayout = _alternativePayout;
    commitment = _commitment;

    // calculate deadline
    deadline = now + (_durationMinutes * 1 minutes);
        
    DeadlineProvided(deadline);
    currentState = State.AWAITING_COMPLETION;
  }

  // The user provides proof (url to image, string explination, etc)
  function proveCommitment(string _proof) onlyUser inState(State.AWAITING_COMPLETION) public {
    require(now <= deadline);
        
    proof = _proof;
    proofProvided = true;
    ProofHasBeenProvided(proof);
        
    currentState = State.AWAITING_JUDGING;
  }
    
  // called by moderator if deadline passes and no proof was provided
  function noProofAfterDeadline() onlyModerator inState(State.AWAITING_COMPLETION) public {
    // 1) check conditions
    require(now >= deadline);
    require(!proofProvided);
        
    // 2) update state
    verdict = false;
    NoProofProvided(now);
    VerdictDecided(verdict, alternativePayout);
    currentState = State.FAILURE;
        
    // 3) interact with address
    alternativePayout.transfer(contractAddress.balance);
  }
    
  // the moderator makes a verdict if the proof in proveCommitment() was valid
  function didCompleteCommitment(bool _verdict) onlyModerator inState(State.AWAITING_JUDGING) public {
    // 1) check conditions
    require(now >= deadline);
        
    // 2) update state
    verdict = _verdict;
    if (verdict) {
      // User succedeed, they get their money back
      currentState = State.SUCCESS;
      VerdictDecided(verdict, user);
    } else {
      // User failed, they lose the money and it is sent to alternativePayout
      currentState = State.FAILURE;
      VerdictDecided(verdict, alternativePayout);
    }
        
    // 3) interact with address
    if (verdict) {
      user.transfer(contractAddress.balance);
    } else {
      alternativePayout.transfer(contractAddress.balance);
    }
  }
}
