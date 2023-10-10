import { Central, ControllerMixinDatabase, ControllerMixinMime, ControllerMixinView, ORM } from '@lionrockjs/central';
import { Controller } from '@lionrockjs/mvc';
import { ControllerMixinMultipartForm } from '@lionrockjs/form';
import { ControllerMixinSession } from '@lionrockjs/session';
import ControllerMixinLoginRequire from '../controller-mixin/LoginRequire';
import ControllerMixinAccount from "../controller-mixin/Account";

import User from '../model/User';

export default class ControllerAccount extends Controller {
  static mixins = [...Controller.mixins,
    ControllerMixinDatabase,
    ControllerMixinSession,
    ControllerMixinLoginRequire,
    ControllerMixinMultipartForm,
    ControllerMixinMime,
    ControllerMixinView,
    ControllerMixinAccount
  ]

  /**
   *
   * @param request
   * @param opts
   * @param opts.databaseMap
   * @param opts.allowRoles
   * @param opts.rejectLanding
   * @param opts.layout
   */
  constructor(request, opts = {}) {
    super(request);

    const {
      databaseMap = new Map([
        ['session', `${Central.config.auth.databasePath}/session.sqlite`],
        ['admin', `${Central.config.auth.databasePath}/${Central.config.auth.userDatabase}`],
      ]),
      allowRoles = ['*'],
      rejectLanding = '/login',
      layout = 'layout/account',
    } = opts;

    this.state.get(ControllerMixinDatabase.DATABASE_MAP)
      .set('session', databaseMap.get('session'))
      .set('admin', databaseMap.get('admin'));

    this.state.set(ControllerMixinView.LAYOUT_FILE, layout);
    this.state.set(ControllerMixinLoginRequire.REJECT_LANDING, rejectLanding);
    this.state.set(ControllerMixinLoginRequire.ALLOW_ROLES, new Set(allowRoles));
  }

  async before() {
    this.state.get(ControllerMixinView.LAYOUT).data.user_role = this.request.session.user_role;
  }

  async action_index() {
    const userId = this.request.session.user_id;
    const database = this.state.get(ControllerMixinDatabase.DATABASES).get('admin');
    const user = await ORM.factory(User, userId, {database});
    const person = await user.parent('person_id');

    const identifiers = {};

    await Promise.all(Central.config.auth.identifiers.map(async it => {
      identifiers[it.name] = await ORM.readBy(it.Model, 'user_id', [parseInt(userId)], {database, asArray: true});
    }));

    this.setTemplate('templates/account/dashboard', {
      person,
      identifiers,
      activated: !!user.activated
    });
  }

  async action_change_person(){}
  async action_action_change_person_post(){}
}
