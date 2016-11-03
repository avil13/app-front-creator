var branches = require('./branches');
var package = require('../package');

var argv = require('yargs')
    .example('$0 --use=1 --name="new-super-project"')
    .help('h')
    .alias('h', 'help')
    .options('v', {
        alias: 'version',
        describe: 'build version',
        demand: false,
        type: 'boolean'
    })
    .options('n', {
        alias: 'name',
        describe: 'name of new project',
        demand: false
    })
    .options('l', {
        alias: 'list',
        describe: 'List of variants',
        demand: false
    })
    .options('u', {
        alias: 'use',
        describe: 'Use type of project bulder',
        demand: false,
        type: 'string'
    })
    .argv


if (argv.v) {
    console.log(package.version);
    process.exit(0);
}


if (argv.l) {
    console.log('List of variants \n');

    var num = 0;
    for (var k in branches) {
        console.log((num++) + ') ' + k);
    }

    console.log('\nselect number and use command:');
    console.log('afc --use=[number of variants]');
    process.exit(0);
}


if (!!argv.n && !argv.u || !argv.n && !!argv.u) {
    console.log('Need two parameters --use and --name');
    process.exit(0);
}

if (argv.u) {
    var u = parseInt(argv.u, 10);
    if (u < 0 || u >= Object.keys(branches).length) {
        console.log('Not valid --use parameter value');
        process.exit(0);
    }
}


module.exports = argv;