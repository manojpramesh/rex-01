const ethereumHelper = require('../helpers/ethereum.contract.helper');
const config = require('../config/ethereum');

module.exports = {

    getProperty: (params) => {
        return ethereumHelper.readContract(params, config.RealEstate.address, config.RealEstate.abi, 'properties');
    },

    addProperty: (params) => {
        return ethereumHelper.writeContract(config.accounts[0].address,
            config.accounts[0].privateKey,
            0,
            config.RealEstate.address,
            config.RealEstate.abi,
            'addProperty',
            params);
    },

    editProperty: (params) => {
        return ethereumHelper.writeContract(config.accounts[0].address,
            config.accounts[0].privateKey,
            0,
            config.RealEstate.address,
            config.RealEstate.abi,
            'editProperty',
            params);
    },

    deleteProperty: (params) => {
        return ethereumHelper.writeContract(config.accounts[0].address,
            config.accounts[0].privateKey,
            0,
            config.RealEstate.address,
            config.RealEstate.abi,
            'deleteProperty',
            params)
    },

    getEvents: (cb) => {
        ethereumHelper.getEvents(config.RealEstate.abi,
            config.RealEstate.address,
            config.accounts[0].address,
            "propertyEvent",
            cb);
    }
}