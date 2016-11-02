var inquirer = require('inquirer');
var exec = require('child_process').exec;
var loader = require('snake-cli-loader')();
var clc = require('cli-color');

var branches = {
    'gulp': 'master',
    'webpack': 'webpack',
    'webpack + react': 'webpack-react',
    'webpack + typescript': 'webpack-ts'
};
var repo = 'https://github.com/avil13/empty-project.git';

var options = {};


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





/*`
|-------------------------------------------------------------|
|          ___           ___           ___           ___      |
|         /\  \         /\  \         /\  \         /\__\     |
|        /::\  \       /::\  \       /::\  \       /:/  /     |
|       /:/\:\  \     /:/\:\  \     /:/\:\  \     /:/__/      |
|      /::\~\:\  \   /:/  \:\  \   /:/  \:\  \   /::\__\____  |
|     /:/\:\ \:\__\ /:/__/ \:\__\ /:/__/ \:\__\ /:/\:::::\__\ |
|     \/_|::\/:/  / \:\  \ /:/  / \:\  \  \/__/ \/_|:|~~|~    |
|        |:|::/  /   \:\  /:/  /   \:\  \          |:|  |     |
|        |:|\/__/     \:\/:/  /     \:\  \         |:|  |     |
|        |:|  |        \::/  /       \:\__\        |:|  |     |
|         \|__|         \/__/         \/__/         \|__|     |
---------------------------------------------------------------
`;
*/


Promise.resolve({})
    .then(res => {
        return Exec('git --version');
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

        return inquirer.prompt([{
                type: 'list',
                name: 'proj_type',
                message: 'Choose type of new element',
                choices: list,
                filter: function(val) {
                    return val.toLowerCase();
                }
            },
            {
                type: 'input',
                name: 'proj_name',
                message: 'Name of project'
            }
        ]);
    })
    .then((res) => {
        options["proj_type"] = res.proj_type;
        options["proj_name"] = res.proj_name;
        return res;
    })
    .then((res) => {
        return Exec(`rm -rf ${options.proj_name}`);
    })
    .then((res) => {
        return Exec(`git clone ${repo} ${options.proj_name}`);
    })
    .then((res) => {
        return Exec(`cd ./${options.proj_name} && git checkout ${branches[options.proj_type]}`);
    })
    .then((res) => {
        return Exec(`npm install --prefix ./${options.proj_name}`);
    })
    .then((res) => {
        return Exec(`cd ./${options.proj_name} && rm -rf ./.git && git init`);
    })
    .then(function(res) {
        console.log('\n', clc.green('Finish!!!'));
    })
    .catch((err) => {
        console.log(clc.red('---===| Error! |===---'), '\n');
        console.log(clc.red(err));
    });
//*/