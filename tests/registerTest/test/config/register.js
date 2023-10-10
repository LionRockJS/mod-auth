module.exports = {
  allowPostAssignRoleID: false,
  defaultRole: 'member',

  identifiers: {
    email: {
      requireVerify: true,
    },
    phone: {
      requireVerify: true,
    },
  },
};
