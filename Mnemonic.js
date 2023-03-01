// Load the english words from the wordList module of the 'npm' package 'an-array-of-english-words'
const englishWords = require('an-array-of-english-words');

const HDKey = require('hdkey');

const ethereumUtil = require('ethereumjs-util');

const Buffer = require('buffer').Buffer;


//Generate a list of 24 random words
const randomWords = Array.from({length: 24}, () => englishWords[Math.floor(Math.random() * englishWords.length)]);

//create two 12-word mnemonic from the random words
const mnemonic1 = randomWords.slice(0,12).join(" ");
const mnemonic2 = randomWords.slice(12).join(" ");

//define a function to generate Ethereum addresses from a mnemonic
function generateAddressesFromMnemonic(mnemonic) {
    //Derive a master seed from the mnemonic
    const masterSeed = ethereumUtil.keccak256(Buffer.from(mnemonic));

    //Derive an HD wallet from the master seed
    const hdWallet = HDKey.fromMasterSeed(masterSeed);

    //Derive the first two child keys from the HD wallet
    const childKey1 = hdWallet.derive("m/44'/60'/0'/0/0");
    const childKey2 = hdWallet.derive("m/44'/60'/0'/0/1");

    //Derive Ethereum addresses from the child keys
    const address1 = ethereumUtil.pubToAddress(childKey1.publicKey,true).toString('hex');
    const address2 = ethereumUtil.pubToAddress(childKey2.publicKey,true).toString('hex');

    return [address1,address2];
}

//generate Ethereum addresses from each mnemonic
const addresses1 = generateAddressesFromMnemonic(mnemonic1);
const addresses2 = generateAddressesFromMnemonic(mnemonic2);

//log the mnemonic to the console
console.log("The first Mnemonic:",mnemonic1);
console.log("The second Mnemonic:",mnemonic2);

//log the addresses to the console
console.log("Addresses from mnemonic1 :",addresses1);
console.log("Addresses from mnemonic2 :",addresses2);


