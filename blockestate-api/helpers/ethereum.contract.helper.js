const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const solc = require('solc');
const _ = require('lodash');
const SolidityFunction = require('web3/lib/web3/function');
const Config = require("../config/ethereum");


// create web3 instance
const web3 = new Web3();
web3.setProvider(new web3.providers.HttpProvider(Config.rpc));

// account constants
const fromAccount = Config.accounts[0].address;
const privateKey = Config.accounts[0].privateKey;

module.exports = {

    compileContract: () => {
        let compiledContract = solc.compile(contract, 1);
        let abi = compiledContract.contracts[name].interface;
        let contractObj = web3.eth.contract(JSON.parse(abi));
        let code = compiledContract.contracts[name].bytecode;
        return ({
            compiled: compiledContract,
            abi: abi,
            bytecode: code,
            contract: contractObj,
            contractData: contractObj.new.getData({
                data: '0x' + code
            })
        });
    },

    deployContract: () => {
        let compiledContract = compileContract(contract, name);
        let rawTx = {
            nonce: web3.toHex(web3.eth.getTransactionCount(fromAccount)),
            gasPrice: web3.toHex(web3.eth.gasPrice),
            gasLimit: web3.toHex(3500000),
            from: fromAccount,
            data: compiledContract.contractData
        };
        let tx = new Tx(rawTx);
        tx.sign(privateKey);
        let serializedTx = tx.serialize();

        let hash = web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'));

        let receipt = null;
        while (receipt === null) {
            receipt = web3.eth.getTransactionReceipt(hash);
        }

        return {
            th: hash,
            ad: receipt.contractAddress,
            abi: compiledContract.abi
        };
    },

    readContract: (params, contractAddress, abi, funcName) => {
        let contract = web3.eth.contract(abi).at(contractAddress);
        return contract[funcName].call.apply(this, params);
    },

    readContractArray: (count, contractAddress, abi, funcName) => {
        let contract = web3.eth.contract(abi).at(contractAddress);
        let response = [];
        for (let index = 0; index < req.params.length; index++) {
            response.push(contract[req.params.function](req.params.id, index));
        }
        return response;
    },

    writeContract: (fromAccount, privateKey, amount, contractAddress, abi, funcName, params) => {
        let tx = new Tx({
            nonce: web3.toHex(web3.eth.getTransactionCount(fromAccount)),
            gasPrice: web3.toHex(web3.eth.gasPrice),
            gasLimit: web3.toHex(2999844),
            to: contractAddress,
            from: fromAccount,
            value: web3.toHex(amount),
            data: new SolidityFunction('', _.find(abi, { name: funcName }), '').toPayload(params).data
        });
        tx.sign(new Buffer(privateKey, 'hex'));
        let serializedTx = tx.serialize();
        let hash = web3.eth.sendRawTransaction("0x" + serializedTx.toString('hex'));
        return hash;
    },

    addProperty: (contractAddress, abi, functionName, params, cb) => {
        web3.personal.unlockAccount(web3.eth.coinbase, Config.accounts[0].password, 15000);
        let contract = web3.eth.contract(abi).at(contractAddress);
        contract[functionName](params[0], params[1], {
            from: web3.eth.coinbase,
            value: 0,
            gas: 2999844
        }, cb);
    },

    getEvents: (abi, contractAddress, fromAccount, eventName, cb) => {
        let contract = web3.eth.contract(abi).at(contractAddress);

        var event = contract[eventName]({ from: web3.eth.coinbase }, {
            fromBlock: 0,
            toBlock: 'latest'
        });

        event.get(cb);
    }
};