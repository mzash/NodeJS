var log = require('logger')(module);
var operations = require('operations');

function Polish(){
    operations.legend['('] = {function: function () {}, elements: -1, order:  -2};
    operations.legend[')'] = {function: function () {}, elements: -1, order:  -1};
}

Polish.prototype.eval = function(expression){

    expression = expression.replace(/\(\-/g, '(0-').replace(/^-/, '0-');
    var array = expression.match(/(\d*\.\d*|\d+)|[+,\-,*,/,^,(,),!]{1}|nroot|sqrt|abs/g);

    var polishArray = toPolish(array);
    return doCalculation(polishArray);
};

function toPolish(inputArray){
    var result = [];
    var stack = [];
    for(var i = 0; i<inputArray.length;i++){
        var literal = inputArray[i];
        if(!operations.legend[literal]){
            result.push(literal);
        } else {
            if(stack.length == 0){
                stack.push(literal);
            } else {
                if(operations.legend[literal]) {
                    if (operations.legend[literal].order == -1) {
                        var previosLiteral = stack.pop();
                        while (operations.legend[previosLiteral].order != -2) {
                            result.push(previosLiteral);
                            previosLiteral = stack.pop();
                        }
                    } else if (operations.legend[literal].order == -2) {
                        stack.push(literal);
                    } else {
                        var previosLiteral = stack.pop();
                        if(!previosLiteral){
                            log(previosLiteral);
                        }
                        if(!operations.legend[previosLiteral]){
                            log(previosLiteral);
                        }
                        while (previosLiteral && (operations.legend[previosLiteral].order >= operations.legend[literal].order)) {
                            result.push(previosLiteral);
                            previosLiteral = stack.pop();
                        }
                        if (previosLiteral) {
                            stack.push(previosLiteral);
                        }
                        stack.push(literal);
                    }
                }
            }
        }
    }
    while(stack.length>0){
        result.push(stack.pop());
    }
    return result;
};
function doCalculation(polishArray){
    var stack = new Array();
    var result;
    for(var i = 0; i < polishArray.length; i++) {
        if(operations.legend[polishArray[i]]){
            try{
                var operation = operations.legend[polishArray[i]];
                var args;
                var a;
                if(operation.elements == 2){
                    a = stack.pop();
                    var b = stack.pop();
                    args = [b, a];
                } else {
                    a = stack.pop();
                    args = [a];
                }
                var c = operation.function.apply(operations, args);
                stack.push(c);
            }
            catch(ex){
                return ex.message;
            }
        } else {
            stack.push(parseFloat(polishArray[i]));
        }
    }
    result = stack.pop();
    return result;
};

module.exports = Polish;

log('polish.js is required');