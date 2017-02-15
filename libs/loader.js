let isRun = true;
let state = 0;
let list = [
    '❲⋮ ❳',
    '❲⋰ ❳',
    '❲⋯ ❳',
    '❲⋱ ❳'
];

let load = function() {
    if (isRun) {
        if (state >= list.length) {
            state = 0;
        }
        process.stdout.write('\0338' + list[state++]);
        setTimeout(load, 100);
    }
};



module.exports = {
    start: function() {
        isRun = true;
        load();
    },
    stop: function() {
        isRun = false;
        process.stdout.write('\0338');
    }
};