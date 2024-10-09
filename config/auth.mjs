import { Central } from '@lionrockjs/central';

export default {
  databasePath: `${Central.APP_PATH}/../database`,
  userDatabase: 'user.sqlite',
  databaseMapName : 'user',
  defaultRoles: ['user'],

  destination: '/account',
  requireActivate: true,
  rootRole: 'root',

  identifiers: [],
  verified: {}
};