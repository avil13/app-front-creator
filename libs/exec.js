var loader = require('snake-cli-loader');
var exec = require('child_process').exec;


function Exec(command) {
    loader.start();

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