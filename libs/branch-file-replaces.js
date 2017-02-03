let gulp_or_wp = [
    // title
    {
        path: (_folder) => `./${_folder}/public/index.html`,
        cb: (title, name) => (data) => data.replace(/(<title>).*(<\/title>)/g, `$1${title}$2`)
    },
    // webmanifest
    {
        path: (_folder) => `./${_folder}/public/manifest.webmanifest`,
        cb: (title, name) => (data) => {
            var _data = JSON.parse(data);
            _data.name = _data.short_name = title;
            return JSON.stringify(_data, null, 4);
        }
    },
    // README
    {
        path: (_folder) => `./${_folder}/README.md`,
        cb: (title, name) => (data) => data.replace(/^([^\n]+)/g, title)
    },
    // package.json
    {
        path: (_folder) => `./${_folder}/package.json`,
        cb: (title, name) => (data) => {
            var _data = JSON.parse(data);
            _data.name = name;
            return JSON.stringify(_data, null, 2);
        }
    }
];

let ng_cli = [
    // title
    {
        path: (_folder) => `./${_folder}/src/index.html`,
        cb: (title, name) => (data) => data.replace(/(<title>).*(<\/title>)/g, `$1${title}$2`)
    },
    // webmanifest
    {
        path: (_folder) => `./${_folder}/src/assets/manifest.webmanifest`,
        cb: (title, name) => (data) => {
            var _data = JSON.parse(data);
            _data.name = _data.short_name = title;
            return JSON.stringify(_data, null, 4);
        }
    },
    // README
    gulp_or_wp[2],
    // package.json
    gulp_or_wp[3],
    // nav Title
    {
        path: (_folder) => `./${_folder}/src/app/parts/nav/nav.component.html`,
        cb: (title, name) => (data) => data.replace(/(class="navbar-brand"[^>]+>)([^<]+)(<\/a)/g, `$1${title}$3`)
    },
    // angular-cli
    {
        path: (_folder) => `./${_folder}/angular-cli.json`,
        cb: (title, name) => (data) => {
            var _data = JSON.parse(data);
            _data.project.name = name;
            return JSON.stringify(_data, null, 2);
        }
    }
];


let a2 = [
    // title
    {
        path: (_folder) => `./${_folder}/src/index.html`,
        cb: (title, name) => (data) => data.replace(/(<title>).*(<\/title>)/g, `$1${title}$2`)
    },
    // README
    gulp_or_wp[2],
    // package.json
    gulp_or_wp[3],
    // angular-cli
    ng_cli[5]
];

module.exports = {
    gulp_or_wp: gulp_or_wp,
    ng_cli: ng_cli,
    a2: a2
};