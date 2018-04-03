var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TutorialToken = artifacts.require("./TutorialToken.sol");
var ComplexStorage = artifacts.require("./ComplexStorage.sol");

//var BaseNudge = artifacts.require("./BaseNudge.sol")
var NudgeFactory = artifacts.require("./NudgeFactory.sol")
//var StandardNudge = artifacts.require("./StandardNudge.sol")
//var Token = artifacts.require("./Token.sol")

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);

  deployer.deploy(NudgeFactory);
};
