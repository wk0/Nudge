pragma solidity ^0.4.18;

// Needed to handle accidental sending of tokens, 
// will be needed in the future to support tokens
contract Token {
    function transfer(address _to, uint _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint _value) public returns (bool success);
    function approve(address _spender, uint _value) public returns (bool success);
}