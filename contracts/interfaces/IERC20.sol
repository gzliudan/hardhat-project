// SPDX-License-Identifier: MIT

pragma solidity ^0.8.23;

import { IERC20 as OpenzeppelinIEC20 } from "@openzeppelin/contracts/token/ERC20/IERC20.sol";

interface IERC20 is OpenzeppelinIEC20 {
    function decimals() external view returns (uint8);
}
