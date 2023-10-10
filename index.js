require('kohanajs').addNodeModule(__dirname);

module.exports = {
  ControllerAccount: require('./classes/controller/Account'),
  ControllerAuth: require('./classes/controller/Auth'),
  ControllerRegister: require('./classes/controller/Register'),

  ControllerMixinRegister: require('./classes/controller-mixin/Register'),
  ControllerMixinAuth: require('./classes/controller-mixin/Auth'),
  ControllerMixinLoginRequire: require('./classes/controller-mixin/LoginRequire'),
  ControllerMixinAccount: require('./classes/controller-mixin/Account'),

  HelperAuth : require('./classes/helper/Auth'),

  Identifier: require('./classes/identifier/Identifier'),
  ModelIdentifierUser: require('./classes/model/IdentifierUser'),
};
