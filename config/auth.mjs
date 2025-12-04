import path from 'node:path';
import { Central } from '@lionrockjs/central';

export default {
  databasePath: `${Central.APP_PATH}/../database`,
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