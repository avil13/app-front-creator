var inquirer = require('inquirer');
var exec = require('child_process').exec;
var loader = require('snake-cli-loader');
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
        // var list = Object.keys(branches);

        return inquirer.prompt([{
                type: 'list',
                name: 'proj_type',
                message: 'Choose type of new element',
                choices: list
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
        console.log(clc.green('Make folder'));
        return Exec(`git clone ${repo} ${options.proj_name}`);
    })
    .then((res) => {
        return Exec(`cd ./${options.proj_name} && git checkout ${branches[options.proj_type]}`);
    })
    .then((res) => {
        console.log(clc.green('Install package'));
        return Exec(`cd ./${options.proj_name} && npm install`);
    })
    .then((res) => {
        console.log(clc.green('Init git'));
        return Exec(`cd ./${options.proj_name} && rm -rf ./.git && git init`);
    })
    .then((res) => {
        // README.md
        return Exec(`cd ./${options.proj_name} && rm README.md && touch README.md && echo '# ${options.proj_name + "\n***\nnpm start" }' >> README.md `);
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


//*/ // ===================================================== //





var finish =
"\n|-------------------------------------------------------------|"+
"\n|          ___           ___           ___           ___      |"+
"\n|         /\\  \\         /\\  \\         /\\  \\         /\\__\\     |"+
"\n|        /::\\  \\       /::\\  \\       /::\\  \\       /:/  /     |"+
"\n|       /:/\\:\\  \\     /:/\\:\\  \\     /:/\\:\\  \\     /:/__/      |"+
"\n|      /::\\~\\:\\  \\   /:/  \\:\\  \\   /:/  \\:\\  \\   /::\\__\\____  |"+
"\n|     /:/\\:\\ \\:\\__\\ /:/__/ \\:\\__\\ /:/__/ \\:\\__\\ /:/\\:::::\\__\\ |"+
"\n|     \\/_|::\\/:/  / \\:\\  \\ /:/  / \\:\\  \\  \\/__/ \\/_|:|~~|~    |"+
"\n|        |:|::/  /   \\:\\  /:/  /   \\:\\  \\          |:|  |     |"+
"\n|        |:|\\/__/     \\:\\/:/  /     \\:\\  \\         |:|  |     |"+
"\n|        |:|  |        \\::/  /       \\:\\__\\        |:|  |     |"+
"\n|         \\|__|         \\/__/         \\/__/         \\|__|     |"+
"\n|-------------------------------------------------------------|"
;
