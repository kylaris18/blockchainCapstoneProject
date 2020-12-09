pragma solidity ^0.7.0;

contract StructStorage {

    struct transaction {
        uint256 transactionId;
        bytes status;
        bytes deliverySendDate;
        bytes deliveryReceiveDate;
        bytes deliveryDesc;
    }

    mapping(uint256 => transaction) public transactions;
    event decodedTransaction(
        uint256 transactionId,
        bytes status,
        bytes deliverySendDate,
        bytes deliveryReceiveDate,
        bytes deliveryDesca
    );

    function decodeTransaction(bytes memory _encodedData)
        public
        returns (bool)
    {
        (
            uint256 transactionId,
            bytes memory status,
            bytes memory deliverySendDate,
            bytes memory deliveryReceiveDate,
            bytes memory deliveryDesc
        ) = abi.decode(
            _encodedData,
            (uint256, bytes, bytes, bytes, bytes)
        );

        transaction memory _transaction = transaction(
            transactionId,
            status,
            deliverySendDate,
            deliveryReceiveDate,
            deliveryDesc
        );
        transactions[transactionId] = _transaction;
        emit decodedTransaction(
            transactionId,
            status,
            deliverySendDate,
            deliveryReceiveDate,
            deliveryDesc
        );
        return true;
    }
}
