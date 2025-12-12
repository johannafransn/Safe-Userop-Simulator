// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity ^0.8.19;

import {Script, console} from "forge-std/Script.sol";

contract DebugCalldataBaseSepolia is Script {
    // These can be changed for different scenarios  
    address constant TARGET_ADDRESS = 0xD8B69128AC5f926214aDaFd6da709e8205937f22; // the Safe address on Base Sepolia
    address constant CALLER_ADDRESS = 0x75cf11467937ce3F2f357CE24ffc3DBF8fD5c226; // ERC4337 entry point - may need to be different for Base Sepolia
    
    function setUp() public {}

    function run() public {
        // Fork Base Sepolia chain
        string memory baseSepoliaRPC = "https://sepolia.base.org/";
        uint256 baseSepoliaFork = vm.createSelectFork(baseSepoliaRPC);
        
        // how to handle Metri calldata: replace 541d63c8 with 5229073f and call from 4337 module
        bytes memory calldata_ = hex"5229073f000000000000000000000000036cbd53842c5426634e7929541ec2318f3dcf7e0000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000008000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000044a9059cbb00000000000000000000000016285f27e7af01c1c9518c2a97c37be2aeab419b000000000000000000000000000000000000000000000000000000000010c8e000000000000000000000000000000000000000000000000000000000";
       
        console.log("Simulating call to:", TARGET_ADDRESS);
        console.log("From address:", CALLER_ADDRESS);
        console.log("Calldata:");
        console.logBytes(calldata_);

        // Simulate the call
        vm.prank(CALLER_ADDRESS);
        (bool success, bytes memory returnData) = TARGET_ADDRESS.call(calldata_);

        console.log("\nExecution result:");
        console.log("Success:", success);
        if (!success) {
            console.log("Revert data:");
            console.logBytes(returnData);
        }
    }
}
