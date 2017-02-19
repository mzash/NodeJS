var log = require('logger')(module);
var Polish = require('polish');

var polish = new Polish();

var expresions = 'abs(-1)+3!-2*sqrt(4)/5^6';

log(expresions+'=' + polish.eval(expresions));