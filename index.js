var clc = require('cli-color');

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
        console.log(clc.cyan('Enter name of project: '));

        var num = 1;
        for (var k in branches) {
            console.log((num++) + ') ' + k);
        }
        console.log(clc.cyan('Number: '));

        return readStr();
    })
    .then(numb => {
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
        if(res.toLowerCase() !== 'y'){
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
    .then(function(res) {
        console.log('\n', clc.green(finish));
        console.log('\n', clc.green('Finish!!!'));
        console.log('\n', clc.green(`Project "${ clc.underline(options.name)}" created!`));
    })
    .catch((err) => {
        console.log(clc.red('---===| Error! |===---'), '\n');
        console.log(clc.red(err));
    });