/* Controller auth handle login, logout */
import { Controller, Central, ControllerMixinDatabase, ControllerMixinMime, ControllerMixinView } from '@lionrockjs/central';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import { ControllerMixinSession } from '@lionrockjs/mixin-session';
import ControllerMixinAuth from '../controller-mixin/Auth.mjs';

export default class ControllerAuth extends Controller {
  static mixins = [...Controller.mixins,
    ControllerMixinMultipartForm,
    ControllerMixinDatabase,
    ControllerMixinSession,
    ControllerMixinAuth,
    ControllerMixinMime,
    ControllerMixinView
  ]

  constructor(request) {
    super(request);

    const dbMap = this.state.get(ControllerMixinDatabase.DATABASE_MAP);
    dbMap.set(
      Central.config.auth.databaseMapName,
      Central.config.auth.databasePath + '/' + Central.config.auth.userDatabase
    );
  }

  async action_login() {
    const {cp} = this.state.get(Controller.STATE_QUERY);

    ControllerMixinView.setTemplate(this.state, 'templates/login', {
      destination: cp || Central.config.auth.destination,
      message: '',
    });
  }

  async action_login_post() {}

  async action_fail() {
    const {cp} = this.state.get(Controller.STATE_QUERY);
    ControllerMixinView.setTemplate(this.state, 'templates/login', {
      destination: cp,
      message: 'Login fail.',
    });
  }

  async action_logout() {
    ControllerMixinView.setTemplate(this.state, 'templates/login', {
      destination: Central.config.auth.destination,
      message: 'User Log Out Successfully.',
    });
  }
}