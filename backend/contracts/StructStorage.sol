pragma solidity ^0.7.0;

contract StructStorage {
    
    address public owner;
    constructor () {
        owner = msg.sender;
    }
    
    modifier onlyOwner {
        require(owner == msg.sender, 'Should be the owner of the contract');
        _;
    }
    
    struct transaction {
        uint256 transactionId;
        uint256 wholesalerId;
        uint256 goodsId;
        uint256 status;
        bytes deliverySendDate;
        bytes deliveryReceiveDate;
        bytes deliveryDesc;
    }

    struct review {
        uint256 reviewId;
        uint256 userId;
        uint256 score;
        bytes reviewDesc;
    }

    mapping(uint256 => transaction) public transactions;
    event decodedTransaction(
        uint256 transactionId,
        uint256 wholesalerId,
        uint256 goodsId,
        uint256 status,
        bytes deliverySendDate,
        bytes deliveryReceiveDate,
        bytes deliveryDesc
    );

    mapping(uint256 => review) public reviews;
    event decodedReview(
        uint256 reviewId,
        uint256 userId,
        uint256 score,
        bytes reviewDesc
    );

    function decodeTransaction(bytes memory _encodedData) public onlyOwner returns (bool) {
        (
            uint256 transactionId,
            uint256 wholesalerId,
            uint256 goodsId,
            uint256 status,
            bytes memory deliverySendDate,
            bytes memory deliveryReceiveDate,
            bytes memory deliveryDesc
        ) = abi.decode(
            _encodedData,
            (uint256, uint256, uint256, uint256, bytes, bytes, bytes)
        );

        transaction memory _transaction = transaction(
            transactionId,
            wholesalerId,
            goodsId,
            status,
            deliverySendDate,
            deliveryReceiveDate,
            deliveryDesc
        );
        transactions[transactionId] = _transaction;
        emit decodedTransaction(
            transactionId,
            wholesalerId,
            goodsId,
            status,
            deliverySendDate,
            deliveryReceiveDate,
            deliveryDesc
        );
        return true;
    }

    function decodeReview(bytes memory _encodedData) public onlyOwner returns (bool) {
        (
            uint256 reviewId,
            uint256 userId,
            uint256 score,
            bytes memory reviewDesc
        ) = abi.decode(_encodedData, (uint256, uint256, uint256, bytes));

        review memory _review = review(reviewId, userId, score, reviewDesc);
        reviews[reviewId] = _review;
        emit decodedReview(reviewId, userId, score, reviewDesc);
        return true;
    }
}
