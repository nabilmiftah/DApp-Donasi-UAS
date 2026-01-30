// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract DonationContract {
    address public owner;
    uint256 public totalDonations;

    struct Donor {
        address addr;
        uint256 amount;
    }

    Donor[] public donors;

    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    function donate() public payable {
        require(msg.value > 0, "Donation must be greater than 0");
        donors.push(Donor(msg.sender, msg.value));
        totalDonations += msg.value;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getDonorCount() public view returns (uint256) {
        return donors.length;
    }
}