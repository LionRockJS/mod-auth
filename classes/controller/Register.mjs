/* Controller auth handle login, logout */
import { Controller } from '@lionrockjs/mvc';
import { Central, ControllerMixinDatabase, ControllerMixinMime, ControllerMixinView, ORM } from '@lionrockjs/central';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import { ControllerMixinSession } from '@lionrockjs/mixin-session';
import ControllerMixinAuth from '../controller-mixin/Auth.mjs';
import ControllerMixinRegister from '../controller-mixin/Register.mjs';
import HelperAuth from '../helper/Auth.mjs';

export default class ControllerRegister extends Controller {
  static mixins = [...Controller.mixins,
    ControllerMixinMultipartForm,
    ControllerMixinDatabase,
    ControllerMixinSession,
    ControllerMixinMime,
    ControllerMixinView,
    ControllerMixinRegister
  ];

  constructor(request) {
    super(request);

    this.state.get(ControllerMixinDatabase.DATABASE_MAP)
      .set('session', `${Central.config.auth.databasePath}/session.sqlite`)
      .set(Central.config.auth.databaseMapName, `${Central.config.auth.databasePath}/${Central.config.auth.userDatabase}`);
  }

  async action_register_post() {
    const postData = this.state.get(ControllerMixinMultipartForm.POST_DATA);
    //assign login object to session
    await HelperAuth.do_login(this.state, this.state.get(ControllerMixinAuth.USER));
    await HelperAuth.redirect(this.state, postData.destination);
  }
}
