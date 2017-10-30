module.exports = {
    rpc: 'http://10.231.8.69:443',
    accounts: [{
        address: "0xb8a7483ace529de28d1d9f8860a298d94e451892",
        privateKey: "7337912aa62e810e59bc5a7de90f56287cf84dc8c0d83db2582393be1ed9c9f8",
        password: "Innov@teD@ily1"
    }],
    RealEstate: {
        address: "0x8092a9bcd9d4b34102b32cc95601433a0ded42ec",
        contract_name: "RealEstate",
        abi: [{ "constant": false, "inputs": [{ "name": "_id", "type": "int256" }, { "name": "_data", "type": "string" }], "name": "addProperty", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_id", "type": "int256" }], "name": "deleteProperty", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [], "name": "kill", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "int256" }], "name": "properties", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "newOwner", "type": "address" }], "name": "changeOwner", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_id", "type": "int256" }, { "name": "_data", "type": "string" }], "name": "editProperty", "outputs": [], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }, { "payable": true, "type": "fallback" }, { "anonymous": false, "inputs": [{ "indexed": false, "name": "_id", "type": "int256" }, { "indexed": false, "name": "_data", "type": "string" }, { "indexed": false, "name": "_status", "type": "string" }, { "indexed": false, "name": "_time", "type": "uint256" }], "name": "propertyEvent", "type": "event" }]
    }
}