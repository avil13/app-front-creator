var loader = require('./loader');
// var loader = require('snake-cli-loader');
var exec = require('child_process').exec;
var clc = require('cli-color');


function Exec(command, msg) {
    if (msg) {
        console.log(clc.green(msg));
    }

    if (process.env.NODE_ENV !== 'test') {
        loader.start();
    }

    return new Promise(function(resolve, reject) {
        exec(command, function(err, out, code) {
            if (err instanceof Error) {
                throw err;
            }
            loader.stop();
            process.stdout.write(out);
            resolve({
                out: out || '',
                code: code || 0
            });
        });
    });
}


module.exports = Exec;