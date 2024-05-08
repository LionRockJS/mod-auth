import { Central } from '@lionrockjs/central';

export default {
  databasePath: `${Central.EXE_PATH}/../database`,
  userDatabase: 'user.sqlite',
  databaseMapName: 'user',
  defaultRoles: ['user'],
  salt: 'thisislonglonglonglongtextover32bytes',

  destination: '/account',
  requireActivate: true,
  rootRole: 'root',

  identifiers: [],
  verified: {}
};