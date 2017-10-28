module.exports = {
    rpc: 'http://10.231.8.69:443',
    accounts: [{
        address: "0xb8a7483ace529de28d1d9f8860a298d94e451892",
        privateKey: "7337912aa62e810e59bc5a7de90f56287cf84dc8c0d83db2582393be1ed9c9f8",
        password: "Innov@teD@ily1"
    }],
    RealEstate: {
        address: "0x6512e694a1f4ea95145673e0301df9efb1e28c08",
        contract_name: "RealEstate",
        abi: [{ "constant": false, "inputs": [{ "name": "_id", "type": "int256" }, { "name": "_data", "type": "string" }], "name": "addProperty", "outputs": [], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_id", "type": "int256" }], "name": "deleteProperty", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [{ "name": "", "type": "int256" }], "name": "properties", "outputs": [{ "name": "", "type": "string" }], "payable": false, "type": "function" }, { "constant": false, "inputs": [{ "name": "_id", "type": "int256" }, { "name": "_data", "type": "string" }], "name": "editProperty", "outputs": [], "payable": false, "type": "function" }, { "constant": true, "inputs": [], "name": "_length", "outputs": [{ "name": "", "type": "int256" }], "payable": false, "type": "function" }, { "inputs": [], "payable": false, "type": "constructor" }]
    }
}