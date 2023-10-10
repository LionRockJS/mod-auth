/* Controller auth handle login, logout */
import { Central, ControllerMixinDatabase, ControllerMixinMime, ControllerMixinView } from '@lionrockjs/central';
import { Controller } from '@lionrockjs/mvc';
import { ControllerMixinMultipartForm } from '@lionrockjs/form';
import { ControllerMixinSession } from '@lionrockjs/session';
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

    this.state.get(ControllerMixinDatabase.DATABASE_MAP)
      .set('session', `${Central.config.auth.databasePath}/session.sqlite`)
      .set('admin', `${Central.config.auth.databasePath}/${Central.config.auth.userDatabase}`);
  }

  async action_login() {
    this.setTemplate('templates/login', {
      destination: this.request.query.cp || Central.config.auth.destination,
      message: '',
    });
  }

  async action_login_post() {}

  async action_fail() {
    this.setTemplate('templates/login', {
      destination: this.request.query.cp,
      message: 'Login fail.',
    });
  }

  async action_logout() {
    this.setTemplate('templates/login', {
      destination: Central.config.auth.destination,
      message: 'User Log Out Successfully.',
    });
  }
}