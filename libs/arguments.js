arg = process.argv.slice(2);

if ((~arg.indexOf('-v')) || (~arg.indexOf('--version'))) {
    var package = require('../package');

    console.log(`Version: ${package.version}`);

    process.exit(0);
}