// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract AccessKey is ERC721Enumerable {
    mapping(uint256 => string) private _accessURIs;

    constructor() ERC721("AccessKey", "AKY") {}

    function mintAccessKey(address to, uint256 tokenId, string memory accessURI) public {
        _mint(to, tokenId);
        _accessURIs[tokenId] = accessURI;
    }

    function getAccessURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Token does not exist");
        return _accessURIs[tokenId];
    }
}
