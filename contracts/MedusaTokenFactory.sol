//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/utils/Create2.sol";
import "./MedusaToken.sol";

contract MedusaTokenFactory {
    address public latestTokenAddress;
    mapping(bytes32 => address) public deployedTokens;

    modifier isTokenNotDeployed(bytes32 _salt) {
        require(
            deployedTokens[_salt] == address(0),
            "Medusa token already deployed for this salt"
        );
        _;
    }

    function deployToken(
        bytes32 _salt,
        uint256 _tokenID
    ) external isTokenNotDeployed(_salt) returns (address) {
        latestTokenAddress = Create2.deploy(
            0,
            _salt,
            abi.encodePacked(
                type(MedusaToken).creationCode,
                abi.encode(_tokenID)
            )
        );

        deployedTokens[_salt] = latestTokenAddress;
        return latestTokenAddress;
    }

    function computeTokenAddress(
        bytes32 _salt,
        uint256 _tokenID
    ) public view returns (address) {
        return
            Create2.computeAddress(
                _salt,
                keccak256(
                    abi.encodePacked(
                        type(MedusaToken).creationCode,
                        abi.encode(_tokenID)
                    )
                )
            );
    }
}
