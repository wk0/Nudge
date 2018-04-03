var SimpleStorage = artifacts.require("./SimpleStorage.sol");
var TutorialToken = artifacts.require("./TutorialToken.sol");
var ComplexStorage = artifacts.require("./ComplexStorage.sol");

var BaseNudge = artifacts.require("./Nudge/BaseNudge.sol")
var NudgeFactory = artifacts.require("./Nudge/NudgeFactory.sol")
var StandardNudge = artifacts.require("./Nudge/StandardNudge.sol")
var Token = artifacts.require("./Nudge/Token.sol")

module.exports = function(deployer) {
  deployer.deploy(SimpleStorage);
  deployer.deploy(TutorialToken);
  deployer.deploy(ComplexStorage);

  //deployer.deploy(BaseNudge);
  deployer.deploy(NudgeFactory);
  //deployer.deploy(StandardNudge);
  //deployer.deploy(Token);
};
