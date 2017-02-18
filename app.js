var log = require('logger')(module);
var Polish = require('polish');

var polish = new Polish();

log('(2 + 2) / sqrt(100) = ' + polish.eval('2 2 + 100 sqrt /'));