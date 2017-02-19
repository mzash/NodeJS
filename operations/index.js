var log = require('logger')(module);

function Operations() {
    this.legend = {
        '+': {function: this.addition, elements: 2, order:  1},
        '-': {function: this.difference, elements: 2, order: 1 },
        '*': {function: this.multiplication, elements: 2, order: 2 },
        '/': {function: this.divide, elements: 2, order: 2 },
        '^': {function: this.raising, elements: 2, order: 3 },
        'sqrt': {function: this.sqrt, elements: 1, order: 4 },
        'nroot': {function: this.nroot, elements: 2, order: 4 },
        '!' : {function: this.factorial, elements:1, order: 4 },
        'abs' : {function: this.absoluteValue, elements:1, order: 4 }
    }
}

Operations.prototype.addition = function (a, b) {
    return a + b;
};

Operations.prototype.difference  = function(a, b){
    return a - b;
};

Operations.prototype.multiplication = function(a, b){
    return a * b;
};

Operations.prototype.divide = function (a, b) {
    if(b == 0){
        throw new Error('Devision by 0');
    } else {
        return a / b;
    }
};

Operations.prototype.sqrt = function (a) {
    return Math.sqrt(a);
};

Operations.prototype.nroot = function (a, n) {
    return this.raising(a, this.divide(1, n));
};

Operations.prototype.raising = function (a, b) {/*
    var result = 1;
    if(b > 0){
        for (var i=0; i < b; i++){
            result *= a;
        }
    }
    if(b < 0){
        var internalResult = this.raising(a, b * -1);
        result = this.divide(result, internalResult);
    }
    return result;*/
    return Math.pow(a, b);
};

Operations.prototype.factorial = function (a) {
    if(a == 0){
        return 1;
    }
    else{
        return a * this.factorial(a-1);
    }
};

Operations.prototype.absoluteValue = function (a) {
    if(a < 0){
        return a * -1;
    } else {
        return a;
    }
};

module.exports = new Operations();

log('operations.js is required');