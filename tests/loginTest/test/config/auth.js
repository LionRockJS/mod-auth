const { KohanaJS } = require('kohanajs');

module.exports = {
  databasePath: `${KohanaJS.EXE_PATH}/../db`,
  userDatabase: 'user.sqlite',
  salt: 'thisislonglonglonglongtextover32bytes',

  destination: '/account',
  requireActivate: true,
  rootRole: 'root',

  identifiers: {
    email: {
      requireVerify: true,
    },
    phone: {
      requireVerify: true,
    },
  },
  verified: {}
};
