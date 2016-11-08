var fs = require('fs');


module.exports = function(file, callback) {

    return new Promise((resolve, reject) => {

            // var title = options.name.charAt(0).toUpperCase() + options.name.slice(1);

            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                    throw err;
                }
                // var result = data.replace(/(<title>).*(<\/title>)/g, `$1${title}$2`);

                resolve(callback(data));
            });

        })
        .then(result => {

            return new Promise((resolve, reject) => {
                fs.writeFile(file, result, 'utf8', function(err) {
                    if (err) {
                        throw err;
                    }

                    resolve(true);
                });
            });

        });
};