var log = require('logger')(module);
var operations = require('operations');

function Polish(){
}

Polish.prototype.eval = function(expression){
    this.toArray(expression);
    return this.doCalculation();
};

Polish.prototype.toArray = function (expression) {
    this.expressionArray = expression.split(' ');
};

Polish.prototype.doCalculation = function(){
    var stack = new Array();
    var result;
    for(var i = 0; i < this.expressionArray.length; i++) {
        if(operations.legend[this.expressionArray[i]]){
            try{
                var operation = operations.legend[this.expressionArray[i]];
                var args;
                if(operation.elements == 2){
                    var a = stack.pop();
                    var b = stack.pop();
                    args = [b, a];
                } else {
                    var a = stack.pop();
                    args = [a];
                }
                var c = operation.function.apply(operations, args);
                stack.push(c);
            }
            catch(ex){
                return ex.message;
            }
        } else {
            stack.push(parseFloat(this.expressionArray[i]));
        }
    }
    result = stack.pop();
    return result;
};

module.exports = Polish;

log('polish.js is required');