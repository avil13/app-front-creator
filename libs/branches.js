/*
{
    "gulp": "master",
    "webpack": "webpack",
    "webpack + react": "webpack-react",
    "webpack + typescript": "webpack-ts",
    "anguar-cli + ngrx/store": "anguar-cli_ng-redux"
}
*/

module.exports = [
    // 
    {
        name: 'gulp',
        branch: 'master',
        replaceNames: 'gulp_or_wp'
    },
    {
        name: 'webpack',
        branch: 'webpack',
        replaceNames: 'gulp_or_wp'
    },
    {
        name: 'webpack + react',
        branch: 'webpack-react',
        replaceNames: 'gulp_or_wp'
    },
    {
        name: 'webpack + typescript',
        branch: 'webpack-ts',
        replaceNames: 'gulp_or_wp'
    },
    {
        name: 'anguar-cli + ngrx/store',
        branch: 'anguar-cli_ng-redux',
        replaceNames: 'ng_cli'
    },
    {
        name: 'a2-boilerplate',
        branch: 'a2-boilerplate',
        replaceNames: 'a2'
    }
];