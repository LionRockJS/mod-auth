import path from 'node:path';
import { Central } from '@lionrockjs/central';

export default {
  databaseMap: new Map([
    ['user', path.normalize(Central.EXE_PATH + '/../database/user.sqlite')],
  ]),

  databaseMapName : 'user',
  defaultRoles: ['user'],

  destination: '/account',
  requireActivate: true,
  rootRole: 'root',

  identifiers: [],
  verified: {}
};
