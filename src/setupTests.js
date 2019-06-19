const scheduler = typeof setImmediate === 'function' ? setImmediate : setTimeout;

global.flushPromises = function () {
    return new Promise(function (resolve) {
        scheduler(resolve);
    });
}