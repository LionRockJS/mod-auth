import url from "node:url";
const dirname = url.fileURLToPath(new URL('.', import.meta.url)).replace(/\/$/, '');
export default {dirname}

import ControllerAccount from './classes/controller/Account.mjs';
import ControllerAuth from './classes/controller/Auth.mjs';
import ControllerRegister from './classes/controller/Register.mjs';
import ControllerMixinRegister from './classes/controller-mixin/Register.mjs';
import ControllerMixinAuth from './classes/controller-mixin/Auth.mjs';
import ControllerMixinLoginRequire from './classes/controller-mixin/LoginRequire.mjs';
import ControllerMixinAccount from './classes/controller-mixin/Account.mjs';
import HelperAuth from './classes/helper/Auth.mjs';
import Identifier from './classes/identifier/Identifier.mjs';
import ModelIdentifierUser from './classes/model/IdentifierUser.mjs';
import ModelUser from './classes/model/User.mjs';
import ModelRole from './classes/model/Role.mjs';
import ModelLogin from './classes/model/Login.mjs';

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
