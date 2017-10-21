pragma solidity^0.4.13;

contract RealEstate {
    
    address _owner;
    int public _length;
    mapping (int => string) properties;
    
    function RealEstate() public {
        _owner = msg.sender;
    }
    
    function addProperty(int _id, string _data) public {
        properties[_id] = _data;
    }
    
    function editProperty(int _id, string _data) public {
        properties[_id] = _data;
    }
    
    function deleteProperty(int _id) public {
        properties[_id] = "";
    }
}