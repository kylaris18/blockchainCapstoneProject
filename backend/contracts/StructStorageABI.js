[
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "reviewId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "userId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "bytes",
				"name": "reviewDesc",
				"type": "bytes"
			}
		],
		"name": "decodedReview",
		"type": "event"
	},
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
				"internalType": "uint256",
				"name": "wholesalerId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "goodsId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "status",
				"type": "uint256"
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
		"name": "decodeReview",
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
		"name": "reviews",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "reviewId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "userId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "score",
				"type": "uint256"
			},
			{
				"internalType": "bytes",
				"name": "reviewDesc",
				"type": "bytes"
			}
		],
		"stateMutability": "view",
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
				"internalType": "uint256",
				"name": "wholesalerId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "goodsId",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "status",
				"type": "uint256"
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