require('./libs/arguments');

var clc = require('cli-color');
var fs = require('fs');

var exec = require('./libs/exec');
var finish = require('./libs/finish-title');
var readStr = require('./libs/read-str');
var write = require('./libs/write-name');

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
        return readStr('Enter name of project: ');
    })
    .then(name => {
        if (fs.existsSync(name)) {
            throw `Folder '${name}' already exists`;
        }
        return name;
    })
    .then(name => {
        options["title"] = name.charAt(0).toUpperCase() + name.slice(1);
        options["name"] = name.replace(/([A-Z])/g, ($1) => { return "-" + $1.toLowerCase() }).replace(/\s/g, '-'); // Set name

        // Выбираем нужную ветку
        console.log(clc.cyan('Enter number of project: '));

        let i = 0;
        while (i < branches.length) {
            console.log((++i) + ') ' + branches[i - 1].name);
        }

        return readStr('Number: ');
    })
    .then(numb => {
        if (process.env.NODE_ENV === 'test' && process.env.NUM) {
            numb = process.env.NUM; /// TEST
        }

        numb = parseInt(numb, 10);

        if (numb > branches.length || numb <= 0) {
            throw 'Need valid number';
        }

        // Получили номер, ветки, Выбираем ее из списка
        options.numb = numb - 1;
        options["branch"] = branches[options.numb].branch;

        return options;
    })
    .then(res => {
        return exec(`git clone ${repo} ${options.name}`, 'Make folder');
    })
    .then(res => {
        if (options.branch === 'master') {
            return res;
        }
        return exec(`cd ./${options.name} && git checkout ${options.branch}`);
    })
    .then(res => {
        // Устанавливать ли пакеты?
        return readStr('Run npm install [y/N]: ');
    })
    .then(res => {
        if (res.toLowerCase() !== 'y') {
            return false;
        }

        return exec(`cd ./${options.name} && npm install`, 'Install package');
    })
    .then(res => {
        return exec(`cd ./${options.name} && rm -rf ./.git && git init`, 'Init git');
    })
    .then(res => {
        let replaces = require('./libs/branch-file-replaces');

        let arrForReplace = replaces[branches[options.numb].replaceNames];
        let promises = [];

        for (let i = 0; i < arrForReplace.length; i++) {
            promises.push(write(
                arrForReplace[i].path(options.name),
                arrForReplace[i].cb(options.title, options.name)
            ));
        }

        return Promise.all(promises);
    })
    .then(res => {
        console.log('\n', clc.green(finish));
        console.log('\n', clc.green('Finish!!!'));
        console.log('\n', clc.green(`Project "${ clc.underline(options.name)}" created!`), '\n');

        require('./libs/command-list')(options.name);
    })
    .catch((err) => {
        console.log(clc.red('---===| Error! |===---'), '\n');
        console.log(clc.red(err));
    });