const { KohanaJS } = require('kohanajs');
KohanaJS.initConfig(new Map([
  ['auth', require('./config/auth')],
  ['register', require('./config/register')],
]));