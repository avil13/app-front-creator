/*
{
    "gulp": "master",
    "webpack": "webpack",
    "webpack + react": "webpack-react",
    "webpack + typescript": "webpack-ts",
    "anguar-cli + ngrx/store": "anguar-cli_ng-redux"
}
*/
let gulpOrWp = [
    // title
    {
        path: (_folder) => `./${_folder}/public/index.html`,
        cb: (title) => (data) => data.replace(/(<title>).*(<\/title>)/g, `$1${title}$2`)
    },
    // webmanifest
    {
        path: (_folder) => `./${_folder}/public/manifest.webmanifest`,
        cb: (title) => (data) => {
            var _data = JSON.parse(data);
            _data.name = _data.short_name = title;
            return JSON.stringify(_data, null, 4);
        }
    },
    // README
    {
        path: (_folder) => `./${_folder}/README.md`,
        cb: (title) => (data) => data.replace(/^([^\n]+)/g, title)
    },
    // package.json
    {
        path: (_folder) => `./${_folder}/package.json`,
        cb: (title) => (data) => {
            var _data = JSON.parse(data);
            _data.name = title.toLowerCase().replace(/\s/, '-');
            return JSON.stringify(_data, null, 2);
        }
    }
];

let ngCli = [
    // title
    {
        path: (_folder) => `./${_folder}/src/index.html`,
        cb: (title) => (data) => data.replace(/(<title>).*(<\/title>)/g, `$1${title}$2`)
    },
    // webmanifest
    {
        path: (_folder) => `./${_folder}/src/assets/manifest.webmanifest`,
        cb: (title) => (data) => {
            var _data = JSON.parse(data);
            _data.name = _data.short_name = title;
            return JSON.stringify(_data, null, 4);
        }
    },
    // README
    gulpOrWp[2],
    // package.json
    gulpOrWp[3]
];


module.exports = [
    // 
    {
        name: 'gulp',
        branch: 'master',
        replaceNames: gulpOrWp
    },
    {
        name: 'webpack',
        branch: 'webpack',
        replaceNames: gulpOrWp
    },
    {
        name: 'webpack + react',
        branch: 'webpack-react',
        replaceNames: gulpOrWp
    },
    {
        name: 'webpack + typescript',
        branch: 'webpack-ts',
        replaceNames: gulpOrWp
    },
    {
        name: 'anguar-cli + ngrx/store',
        branch: 'anguar-cli_ng-redux',
        replaceNames: ngCli
    },
];