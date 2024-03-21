import { Central } from '@lionrockjs/central';

Central.initConfig(new Map([
  ['auth', require('./config/auth')],
  ['register', require('./config/register')],
]));