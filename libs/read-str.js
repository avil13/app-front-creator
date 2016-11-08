var readline = require('readline');

module.exports = function() {

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return new Promise((resolve, reject) => {
        rl.on('line', (answer) => {
            resolve(answer);
            rl.close();
        });
    });
};