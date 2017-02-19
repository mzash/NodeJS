module.exports = function (module) {
    return function () {
        var args;
        if(module){
            args = [module.filename].concat([].slice.call(arguments));
        } else {
            args = [].slice.call(arguments);
        }
        console.log.apply(console, args);
    }
};