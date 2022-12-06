const path = require('path');
const fs = require('fs');
const solc = require('solc');

const sourcePath = path.resolve(__dirname, 'contracts','Inbox.sol');
const inboxPath = fs.readFileSync(sourcePath,'utf8');



module.exports = solc.compile(inboxPath, 1).contracts[':Inbox'];
