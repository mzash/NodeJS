var log = require('logger')();

log('init of modules start');
var Polish = require('polish');
log('init of modules end\n\n')
var polish = new Polish();

var expresions = 'abs(-1)+3!-2*sqrt(4)/5^6';

log(expresions+'=' + polish.eval(expresions));

var expresions = 'nroot(8 3)';

log(expresions+'=' + polish.eval(expresions));