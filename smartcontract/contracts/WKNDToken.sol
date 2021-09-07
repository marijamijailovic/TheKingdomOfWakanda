//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract WKNDToken is ERC20 {
    constructor(uint256 _initialSupply) ERC20("Wakanda Token", "WKND") {
        _mint(msg.sender, _initialSupply);
    }

    function decimals() public view virtual override returns (uint8) {
        return 0;
    }

    function burn(address _address, uint256 amount) public {
        require(_address != address(0), "Could not be zero address");
        require(amount > 0, "Could not burn zero tokens");
        _burn(_address, amount);
    }
}
