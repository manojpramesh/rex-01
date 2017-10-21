var Migrations = artifacts.require("./Migrations.sol");

module.exports = function(deployer) {
    web3.personal.unlockAccount(web3.personal.listAccounts[0], "Innov@teD@ily1", 15000);
    deployer.deploy(Migrations);
};