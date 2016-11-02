var inquirer = require('inquirer');
var clc = require('cli-color');

var exec = require('./libs/exec');
var argv = require('./libs/arguments');
var finish = require('./libs/finish-title');


var branches = require('./libs/branches');
var repo = 'https://github.com/avil13/empty-project.git';
var options = {};


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
        var list = [].concat([new inquirer.Separator()], Object.keys(branches), [new inquirer.Separator()]);

        if (argv.n && argv.u) {
            // Получаем ключ названия ветки
            var key = Object.keys(branches)[argv.u];

            return {
                proj_type: key,
                proj_name: argv.n
            };
        } else {
            return inquirer.prompt([{
                    type: 'list',
                    name: 'proj_type',
                    message: 'Choose type of new element',
                    choices: list
                },
                {
                    type: 'input',
                    name: 'proj_name',
                    message: 'Name of project',
                    validate: function(str) {
                        return str.lenght !== 0;
                    }
                }
            ]);
        }
    })
    .then(res => {
        options["proj_type"] = branches[res.proj_type];
        options["proj_name"] = res.proj_name;
        return res;
    })
    .then(res => {
        console.log(clc.green('Make folder'));
        return exec(`git clone ${repo} ${options.proj_name}`);
    })
    .then(res => {
        if(options.proj_type === 'master'){
            return res;
        }
        return exec(`cd ./${options.proj_name} && git checkout ${options.proj_type}`);
    })
    .then(res => {
        console.log(clc.green('Install package'));
        return exec(`cd ./${options.proj_name} && npm install`);
    })
    .then(res => {
        console.log(clc.green('Init git'));
        return exec(`cd ./${options.proj_name} && rm -rf ./.git && git init`);
    })
    .then(res => {
        // README.md
        return exec(`cd ./${options.proj_name} && rm README.md && touch README.md && echo '# ${options.proj_name + "\n***\nnpm start" }' >> README.md `);
    })
    .then(function(res) {
        console.log('\n', clc.green(finish));
        console.log('\n', clc.green('Finish!!!'));
        console.log('\n', clc.green(`Project "${ clc.underline(options.proj_name)}" created!`));
    })
    .catch((err) => {
        console.log(clc.red('---===| Error! |===---'), '\n');
        console.log(clc.red(err));
    });