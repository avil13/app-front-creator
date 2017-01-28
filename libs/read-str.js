var readline = require('readline');
var fs = require('fs');
var clc = require('cli-color');


if (process.env.NODE_ENV === 'test') {
    deleteFolderRecursive('testFolder');
}


module.exports = function(msg) {
    if (msg) {
        console.log(clc.cyan(msg));
    }

    if (process.env.NODE_ENV === 'test') {
        return 'testFolder';
    }

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


function deleteFolderRecursive(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) { // recurse
                deleteFolderRecursive(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};