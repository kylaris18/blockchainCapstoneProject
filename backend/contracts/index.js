const Web3 = require('web3');
const Tx = require('ethereumjs-tx');
const Web3EthAbi = require('web3-eth-abi');
const web3 = new Web3(new Web3.providers.HttpProvider('https://k0f4t9ijn8:mhgnvoiufJIluLq13524UVn-GsFREZd3sw0aCmrpsmo@k0bxwsq5nt-k0u9skam76-rpc.kr0-aws.kaleido.io/'));
const CryptoJS = require("crypto-js");
const config = require("config")

const structStorageABI = require ('../config/structStorageABI.json');

const structStorageAddress = config.blockchain.structStorageAddress;
const structStorageContract = new web3.eth.Contract(structStorageABI, structStorageAddress);

const acct = config.blockchain.acct;
const acctKey = Buffer.from(config.blockchain.acctKey, 'hex');

async function callTransaction(transactionData){
	let decodeTransactionData = await structStorageContract.methods.decodeTransaction(transactionData).encodeABI();
	const decodeTransaction = await buildSendTransaction(acct, acctKey, decodeTransactionData);
}

async function getTransaction(transactionId){
	let transaction = await structStorageContract.methods.transactions(transactionId).call()
	return transaction
}

async function callReviews(reviewData){
	let decodeReviewData = await structStorageContract.methods.decodeReview(reviewData).encodeABI();
	const decodeReview = await buildSendTransaction(acct, acctKey, decodeReviewData);
}

async function getReviews(reviewId){
	let review = await structStorageContract.methods.reviews(reviewId).call()
	return review
}

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

module.exports.callTransaction = callTransaction;
module.exports.getTransaction = getTransaction;

module.exports.callReviews = callReviews;
module.exports.getReviews = getReviews;