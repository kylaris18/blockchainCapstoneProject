[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "transactionId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "status",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "deliverySendDate",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "deliveryReceiveDate",
				"type": "bytes"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "deliveryDesc",
				"type": "bytes"
			}
		],
		"name": "decodedTransaction",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes",
				"name": "_encodedData",
				"type": "bytes"
			}
		],
		"name": "decodeTransaction",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "transactions",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "transactionId",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "status",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "deliverySendDate",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "deliveryReceiveDate",
				"type": "bytes"
			},
			{
				"internalType": "bytes",
				"name": "deliveryDesc",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]