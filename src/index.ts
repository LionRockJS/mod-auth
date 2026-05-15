import ConfigAuth from './config/auth.mjs';
import ConfigRegister from './config/register.mjs';

export default {
  configs: {
    auth: ConfigAuth,
    register: ConfigRegister,
  }
}

import ControllerAccount from './controller/Account.mjs';
import ControllerAuth from './controller/Auth.mjs';
import ControllerRegister from './controller/Register.mjs';
import ControllerMixinRegister from './controller-mixin/Register.mjs';
import ControllerMixinAuth from './controller-mixin/Auth.mjs';
import ControllerMixinLoginRequire from './controller-mixin/LoginRequire.mjs';
import ControllerMixinAccount from './controller-mixin/Account.mjs';
import HelperAuth from './helper/Auth.mjs';
import Identifier from './identifier/Identifier.mjs';
import ModelIdentifierUser from './model/IdentifierUser.mjs';
import ModelUser from './model/User.mjs';
import ModelRole from './model/Role.mjs';
import ModelLogin from './model/Login.mjs';

import {Central, RuntimeAdapterBun} from '@lionrockjs/central';
Central.controllerFiles.set('controller/Account', ControllerAccount);
Central.controllerFiles.set('controller/Auth', ControllerAuth);
Central.controllerFiles.set('controller/Register', ControllerRegister);

import routes from './routes.mjs';

export {
  ControllerAccount,
  ControllerAuth,
  ControllerRegister,
  ControllerMixinRegister,
  ControllerMixinAuth,
  ControllerMixinLoginRequire,
  ControllerMixinAccount,
  HelperAuth,
  Identifier,
  ModelIdentifierUser,
  ModelUser,
  ModelRole,
  ModelLogin,
  routes
};

Central.viewFiles.set('templates/home', {
  package: '@lionrockjs/auth',
  payload: await import('../views/templates/home.liquid', { with: { type: 'text' } })
});

Central.viewFiles.set('snippets/card-signup', {
  package: '@lionrockjs/auth',
  payload: await import('../views/snippets/card-signup.liquid', { with: { type: 'text' } })
});

Central.viewFiles.set('snippets/card-login', {
  package: '@lionrockjs/auth',
  payload: await import('../views/snippets/card-login.liquid', { with: { type: 'text' } })
});