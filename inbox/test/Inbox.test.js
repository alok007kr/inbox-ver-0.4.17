// contract test code will go here
const assert = require('assert')
const ganache = require('ganache-cli')
const Web3 = require('web3')
const web3 = new Web3(ganache.provider())
const { interface, bytecode } = require('../compile')

let inbox;
let fetchedAccounts;

beforeEach(async() => {
    // Getting all the accounts that has some ethereum to work with
    fetchedAccounts = await web3.eth.getAccounts();
    // console.log(fetchedAccounts)
    // We will take only one account to deploy the contract
    inbox = await new web3.eth.Contract(JSON.parse(interface))
     .deploy({data: bytecode, arguments: ['Hello world!'] })
     .send({ from: fetchedAccounts[0], gas:1000000});
});

describe('Inbox', () => {
    it('deploy the contract', () => {
        //console.log(inbox)`
        assert.ok(inbox.options.address)
    })

    // retirieve the message
    it('has a default value', async() => {
        const message = await inbox.methods.message().call()
        assert.equal(message, 'Hello world!')
    })

    // Change the message
    it('change the message', async() => {
        await inbox.methods.setMessage("Hello Alok").send({from: fetchedAccounts[0]})
        const message = await inbox.methods.message().call()
        assert.equal(message,'Hello Alok')
    })
});



// https://goerli.infura.io/v3/fd4cd7711532434f91fd4638a1764122