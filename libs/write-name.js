var fs = require('fs');

/**
 * метод для изменения содержимого исходных файлов скачиваемой ветки
 */
module.exports = function(file, callback) {
    return new Promise((resolve, reject) => {

            fs.readFile(file, 'utf8', function(err, data) {
                if (err) {
                    throw err;
                }

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