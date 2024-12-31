// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract Marketplace is ERC721Enumerable, ERC721URIStorage, Ownable {
    struct Course {
        string uri;
        uint256 price;
        uint256 maxSupply;
        uint256 minted;
    }

    uint256 public currentCourseId;
    uint256 public currentTokenId;
    mapping(uint256 => Course) public courses;
    mapping(uint256 => address) public secondaryMarketSellers;
    mapping(uint256 => uint256) public secondaryMarketPrices;

    event CourseCreated(uint256 indexed courseId, string uri, uint256 price, uint256 maxSupply);
    event NFTMinted(uint256 indexed courseId, uint256 tokenId, address indexed owner);
    event NFTListedForSale(uint256 indexed tokenId, uint256 price, address indexed seller);
    event NFTSold(uint256 indexed tokenId, address indexed buyer, address indexed seller);

    constructor(string memory name, string memory symbol) ERC721(name, symbol) {}

    /// @notice 
    function _beforeTokenTransfer(
        address from,
        address to,
        uint256 tokenId
    ) internal override(ERC721, ERC721Enumerable) {
        super._beforeTokenTransfer(from, to, tokenId);
    }

    /// @notice 
    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    /// @notice Override for ERC721URIStorage
    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

    /// @notice Override for ERC721Enumerable
    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }

    function createCourse(string memory uri, uint256 price, uint256 maxSupply) public onlyOwner {
        require(maxSupply > 0, "Max supply must be greater than zero");
        require(price > 0, "Price must be greater than zero");
        require(bytes(uri).length > 0, "URI cannot be empty");

        currentCourseId++;
        courses[currentCourseId] = Course(uri, price, maxSupply, 0);

        emit CourseCreated(currentCourseId, uri, price, maxSupply);
    }

    // Kurs için NFT mint et
    function mintCourse(uint256 courseId) public payable {
        Course storage course = courses[courseId];
        require(course.maxSupply > 0, "Course does not exist");
        require(course.minted < course.maxSupply, "Max supply reached");
        require(msg.value == course.price, "Incorrect payment amount");

        uint256 tokenId = ++currentTokenId;
        course.minted++;

        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, course.uri); // URI'yi NFT'ye bağla

        emit NFTMinted(courseId, tokenId, msg.sender);
    }

    // NFT'yi ikinci el satışa koy
    function listNFTForSale(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "You are not the owner of this NFT");
        require(price > 0, "Price must be greater than zero");

        secondaryMarketSellers[tokenId] = msg.sender;
        secondaryMarketPrices[tokenId] = price;

        emit NFTListedForSale(tokenId, price, msg.sender);
    }

    // İkinci el piyasadan NFT satın al
    function buyNFT(uint256 tokenId) public payable {
        require(secondaryMarketPrices[tokenId] > 0, "NFT is not for sale");
        require(msg.value == secondaryMarketPrices[tokenId], "Incorrect payment amount");

        address seller = secondaryMarketSellers[tokenId];
        require(seller != address(0), "Seller address is invalid");
        require(seller != msg.sender, "Cannot buy your own NFT");

        _transfer(seller, msg.sender, tokenId);
        payable(seller).transfer(msg.value);

        delete secondaryMarketPrices[tokenId];
        delete secondaryMarketSellers[tokenId];

        emit NFTSold(tokenId, msg.sender, seller);
    }

    // Kurs detaylarını al
    function getCourseDetails(uint256 courseId)
        public
        view
        returns (string memory, uint256, uint256, uint256)
    {
        Course storage course = courses[courseId];
        require(course.maxSupply > 0, "Course does not exist");
        return (course.uri, course.price, course.maxSupply, course.minted);
    }

    // Belirli bir NFT'nin satış fiyatını al
    function getNFTSalePrice(uint256 tokenId) public view returns (uint256) {
        return secondaryMarketPrices[tokenId];
    }

    // Belirli bir NFT'nin sahibini kontrol et
    function getNFTOwner(uint256 tokenId) public view returns (address) {
        return ownerOf(tokenId);
    }

    function getOwnedNFTs(address owner) public view returns (uint256[] memory) {
        uint256 balance = balanceOf(owner);
        uint256[] memory tokenIds = new uint256[](balance);

        for (uint256 i = 0; i < balance; i++) {
            tokenIds[i] = tokenOfOwnerByIndex(owner, i);
        }
        return tokenIds;
    }
}
