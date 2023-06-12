// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

// Deployed at this address: 0xaB720954D64F14ADb21311D81F65d5EB006446B6;

contract BuyMeACoffee {

    // event to emit when a message is sent with tip
    event NewCoffee(address indexed _sender, string name, string _message, uint256 _timestamp);

    // address of contract deloyer
    address payable owner;

    constructor() {
        // stores deployer as owner
        owner = payable(msg.sender);
    }

    // struct of BuyMeACoffe Tx
    struct BuyCoffee {
        address sender;
        string name;
        uint timestamp;
        string message;
    }

    // maps id to BuyCoffee struct
    mapping (uint => BuyCoffee) idToBuyCoffee;

    // id 
    uint public coffeeId;

    // buy coffee function
    function buyCoffee(string memory name, string memory message) public payable {
        require(msg.value > 0, "Tip must be greater than zero");

        coffeeId++;

        BuyCoffee storage coffee = idToBuyCoffee[coffeeId];
        coffee.message = message;
        coffee.name = name;
        coffee.sender = msg.sender;
        coffee.timestamp = block.timestamp;

        
        emit NewCoffee(msg.sender, name, message, block.timestamp);
    }

    // withdraw coffee tips
    function withdrawCoffeTips() public {
        require(owner.send(address(this).balance) );
    }

     // get all coffee
    function getAllCoffee(uint _id) public view returns(BuyCoffee[] memory c){
        require(_id <= coffeeId, "Non-existent id");
        c = new BuyCoffee[](_id);
        for(uint i = 0; i < _id; i++) {
            c[i] = idToBuyCoffee[i + 1];
        }
    }

}