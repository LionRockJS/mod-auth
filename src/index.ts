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
};
