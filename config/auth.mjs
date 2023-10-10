import { Central } from '@lionrockjs/central';

export default {
  databasePath: `${Central.EXE_PATH}/../database`,
  userDatabase: 'user.sqlite',
  salt: 'thisislonglonglonglongtextover32bytes',

  destination: '/account',
  requireActivate: true,
  rootRole: 'root',

  identifiers: [],
  verified: {}
};