import { Central } from '@lionrockjs/central';

const databaseMapName = 'user';
const userDatabase = 'user.sqlite';

export default {
  databasePath: `${Central.EXE_PATH}/../database`,
  databaseMap: new Map([
    [databaseMapName, `${Central.EXE_PATH}/../database/${userDatabase}`]
  ]),

  userDatabase,
  databaseMapName,
  defaultRoles: ['user'],
  salt: 'thisislonglonglonglongtextover32bytes',

  destination: '/account',
  requireActivate: true,
  rootRole: 'root',

  identifiers: [],
  verified: {}
};