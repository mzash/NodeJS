var log = require('logger')(module);

function Operations() {
    this.legend = {
        '+': {function: this.addition, elements: 2},
        '-': {function: this.difference, elements: 2},
        '*': {function: this.multiplication, elements: 2},
        '/': {function: this.divide, elements: 2},
        'sqrt': {function: this.sqrt, elements: 1},
        '!' : {function: this.factorial, elements:1},
        'abs' : {function: this.absoluteValue, elements:1},
        '^': {function: this.raising, elements: 2}
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

Operations.prototype.raising = function (a, b) {
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
    return result;
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

log('polish.js is required');