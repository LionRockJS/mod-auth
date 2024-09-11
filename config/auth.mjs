import { Central } from '@lionrockjs/central';

const databaseMapName = 'user';
const userDatabase = 'user.sqlite';

export default {
  databasePath: `${Central.APP_PATH}/../database`,
  databaseMap: new Map([
    [databaseMapName, `${Central.APP_PATH}/../database/${userDatabase}`]
  ]),

  userDatabase,
  databaseMapName,
  defaultRoles: ['user'],

  destination: '/account',
  requireActivate: true,
  rootRole: 'root',

  identifiers: [],
  verified: {}
};