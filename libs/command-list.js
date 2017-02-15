let clc = require('cli-color');
let fs = require('fs');

let dictionary = {
    start: 'run project',
    test: 'run test',
    ng: 'ng in angular-cli',
    lint: 'linting roject',
    pree2e: 'testing',
    e2e: 'testing',
    test: 'testing',
    build: 'build a project',
    wp: 'webpack',
    c: 'create file',
    create: 'create file',
    dev: 'run dev server'
};


let read = function(file, callback) {
    fs.readFile(file, 'utf8', function(err, data) {
        if (err) {
            throw err;
        }

        callback(data);
    });
};

/**
 * Отображение списка доступных npm команд
 */
module.exports = function(folder) {
    read(`./${folder}/package.json`, (data) => {
        var pkg = JSON.parse(data);
        let list = Object.keys(pkg.scripts);

        if (list.length) {
            console.log(clc.cyan('List of commands:'));

            for (let i = 0; i < list.length; i++) {
                let name = list[i];
                if(dictionary[name]){
                    console.log(` ${clc.green('npm run ' + name)}\t- ${(dictionary[name] || '')}`);
                }else{
                    console.log(` ${clc.green('npm run ' + name)}`);
                }
            }
        }

    });
};