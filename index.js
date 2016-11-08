require('./libs/arguments');

var clc = require('cli-color');
var fs = require('fs'); 

var exec = require('./libs/exec');
var finish = require('./libs/finish-title');
var readStr = require('./libs/read-str');


var branches = require('./libs/branches');
var repo = 'https://github.com/avil13/empty-project.git';
var options = {};


process.stdin.setEncoding('utf8');
// ======= Run ========

Promise.resolve({})
    .then(res => {
        return exec('git --version');
    })
    .then(res => {
        // если не установлен Git то ругаемся
        if (res.code != 0) {
            throw 'Please install git!!!';
        }
        return res;
    })
    //*
    .then(res => {
        // получаем имя проекта
        console.log(clc.cyan('Enter name of project: '));

        return readStr();
    })
    .then(name => {
        options["name"] = name; // Set name

        // Выбираем нужную ветку
        console.log(clc.cyan('Enter number of project: '));

        var num = 1;
        for (var k in branches) {
            console.log((num++) + ') ' + k);
        }
        console.log(clc.cyan('Number: '));

        return readStr();
    })
    .then(numb => {
        numb = numb | 0; // Integer

        var list = Object.keys(branches);

        if (numb > list.length || numb <= 0) {
            throw 'Need valid number';
        }

        // Получили номер, ветки, Выбираем ее из списка
        options["type"] = branches[list[numb - 1]];

        return options;
    })
    .then(res => {
        console.log(clc.green('Make folder'));
        return exec(`git clone ${repo} ${options.name}`);
    })
    .then(res => {
        if (options.type === 'master') {
            return res;
        }
        return exec(`cd ./${options.name} && git checkout ${options.type}`);
    })
    .then(res => {
        // Устанавливать ли пакеты?
        console.log(clc.cyan('Run npm install [y/N]: '));

        return readStr();
    })
    .then(res => {
        if (res.toLowerCase() !== 'y') {
            return false;
        }

        console.log(clc.green('Install package'));
        return exec(`cd ./${options.name} && npm install`);
    })
    .then(res => {
        console.log(clc.green('Init git'));
        return exec(`cd ./${options.name} && rm -rf ./.git && git init`);
    })
    .then(res => {
        // README.md
        return exec(`cd ./${options.name} && rm README.md && touch README.md && echo '# ${options.name + "\n***\nnpm start" }' >> README.md `);
    })
    .then(res => {
        // Title
        return new Promise((resolve, reject) => {
            var indexFile = `${options.name}/public/index.html`;
            var title = options.name.charAt(0).toUpperCase() + options.name.slice(1);

            fs.readFile(indexFile, 'utf8', function(err, data) {
                if (err) {
                    return reject(err);
                }
                var result = data.replace(/(<title>).*(<\/title>)/g, `$1${title}$2`);

                fs.writeFile(indexFile, result, 'utf8', function(err) {
                    if (err) return reject(err);
                    resolve(true);
                });
            });
        });
    })
    .then(res => {
        console.log('\n', clc.green(finish));
        console.log('\n', clc.green('Finish!!!'));
        console.log('\n', clc.green(`Project "${ clc.underline(options.name)}" created!`));
    })
    .catch((err) => {
        console.log(clc.red('---===| Error! |===---'), '\n');
        console.log(clc.red(err));
    });