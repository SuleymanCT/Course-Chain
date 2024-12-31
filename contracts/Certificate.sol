// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/// @title Certificate NFT Contract for Course Completion
/// @dev ERC721 token that mints non-transferable course certificates
contract Certificate is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIds;

    mapping(address => mapping(uint256 => bool)) public hasCertificate;

    // Events
    event CertificateMinted(address indexed user, uint256 indexed courseId, uint256 tokenId);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    /// @notice nokta
    /// @param user nokta
    /// @param courseId nokta
    /// @param tokenURI nokta
    function mintCertificate(
        address user,
        uint256 courseId,
        string memory tokenURI
    ) external onlyOwner returns (uint256) {
        require(!hasCertificate[user][courseId], "Certificate already issued for this course");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        // Mint the NFT certificate
        _safeMint(user, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        
        hasCertificate[user][courseId] = true;

        emit CertificateMinted(user, courseId, newTokenId);
        return newTokenId;
    }

    /// @notice Override required for ERC721URIStorage
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /// @notice Override required for ERC721URIStorage
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /// @notice Override required for ERC721Enumerable and ERC721URIStorage
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        require(from == address(0) || to == address(0), "Certificates are non-transferable");
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /// @notice Override required for ERC721Enumerable
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}