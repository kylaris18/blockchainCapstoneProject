const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Web3EthAbi = require('web3-eth-abi');
const web3 = new Web3(new Web3.providers.HttpProvider('https://k0f4t9ijn8:mhgnvoiufJIluLq13524UVn-GsFREZd3sw0aCmrpsmo@k0bxwsq5nt-k0u9skam76-rpc.kr0-aws.kaleido.io/'));
const CryptoJS = require("crypto-js");

const structStorageABI = [
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

const structStorageAddress = '0x0fC5025C764cE34df352757e82f7B5c4Df39A836';
const structStorageContract = new web3.eth.Contract(structStorageABI, structStorageAddress);

const acct = '0x470e0e6CB89EEB1570a673Bf3A92806260f52aAb';
const acctKey = Buffer.from('e7d7076ed237872e6e28dad3971c5d4eb2a3ec47cf1ca9552537de7c705a6cff', 'hex');

let desc = "ahdkjahdkjahdkjahdkjdjkahdkjdhkjahdkjahdkjahdkjadhkajdhakjdhakjdhakjdhakjdshajksdhakjdah"

var transactionId = 4;
var wholesalerId = 1;
var goodsId = 1;
var status = 1;
var deliverySendDate = Web3.utils.asciiToHex('08-12-20');
var deliveryReceiveDate = Web3.utils.asciiToHex('N/A');
var deliveryDesc = "0x"+ CryptoJS.SHA1(desc).toString(CryptoJS.enc.Hex);

let transactionData = Web3EthAbi.encodeParameters(['uint256', 'uint256', 'uint256', 'uint256', 'bytes', 'bytes', 'bytes'], [transactionId, wholesalerId, goodsId, status, deliverySendDate, deliveryReceiveDate, deliveryDesc]);
// console.log(transactionData)
(async () => {
	let decodeTransactionData = await structStorageContract.methods.decodeTransaction(transactionData).encodeABI();
	const decodeTransaction = await buildSendTransaction(acct, acctKey, decodeTransactionData)
})();

async function buildSendTransaction(account, accountKey, data) {
	// Build Params
	const txParams = {
		from: account, // sender of the transaction
		nonce: await web3.eth.getTransactionCount(account),// incremental value
		to: structStorageAddress, // address - erc20Address
		value: 0,// if you're sending ether
		gasLimit: web3.utils.toHex(10000000),// limit of gas willing to spend
		gasPrice: web3.utils.toHex(web3.utils.toWei('6', 'gwei')),// transaction fee
		data, // instructions - function, values
	};

	// Initilize a new Transaction
	const tx = new Tx(txParams);

	// Sign the Transaction
	tx.sign(accountKey);

	const serializedTx = tx.serialize();

	// Send signed transaction to the chain
	const rawTx = '0x' + serializedTx.toString('hex');
	const transaction = await web3.eth.sendSignedTransaction(rawTx);
	return transaction.transactionHash;
}