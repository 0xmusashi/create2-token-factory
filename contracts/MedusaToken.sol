// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract MedusaToken is ERC20, Ownable {
    uint256 private constant TOTAL_SUPPLY = 666420911201000000000000000000;
    uint256 public immutable tokenID;
    address private medusa = 0x5AE19D2143d0faF684Ebe0ec0F6B2E074AA42069;

    constructor(uint256 _tokenID) ERC20("MEDUSA", "MEDUSA") Ownable(medusa) {
        _mint(medusa, TOTAL_SUPPLY);
        tokenID = _tokenID;
    }
}
