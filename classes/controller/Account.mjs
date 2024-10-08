import { Controller, Central, ControllerMixinDatabase, ControllerMixinMime, ControllerMixinView, ORM } from '@lionrockjs/central';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import { ControllerMixinSession } from '@lionrockjs/mixin-session';
import ControllerMixinLoginRequire from '../controller-mixin/LoginRequire.mjs';
import ControllerMixinAccount from "../controller-mixin/Account.mjs";

import DefaultUser from '../model/User.mjs';
const User = await ORM.import('User', DefaultUser);

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
      databaseMap = new Map(),
      allowRoles = ['*'],
      rejectLanding = '/login',
      layout = 'layout/account',
    } = opts;

    const dbMap = this.state.get(ControllerMixinDatabase.DATABASE_MAP);
    dbMap.set(
      Central.config.auth.databaseMapName,
      Central.config.auth.databasePath + '/' + Central.config.auth.userDatabase
    );

    databaseMap.forEach((value, key) => {
      dbMap.set(key, value);
    });

    this.state.set(ControllerMixinView.LAYOUT_FILE, layout);
    this.state.set(ControllerMixinLoginRequire.REJECT_LANDING, rejectLanding);
    this.state.set(ControllerMixinLoginRequire.ALLOW_ROLES, new Set(allowRoles));
  }

  async before() {
    this.state.get(ControllerMixinView.LAYOUT).data.user_role = this.state.get(Controller.STATE_REQUEST).session.user_role;
  }

  async action_index() {
    const userId = this.state.get(Controller.STATE_REQUEST).session.user_id;
    const databaseMapName = this.state.get(ControllerMixinAccount.DATABASE_NAME);
    const database = this.state.get(ControllerMixinDatabase.DATABASES).get(databaseMapName);
    const user = await ORM.factory(User, userId, {database});
    const person = await user.parent('person_id');

    const identifiers = {};

    await Promise.all(Central.config.auth.identifiers.map(async it => {
      identifiers[it.name] = await ORM.readBy(it.Model, 'user_id', [parseInt(userId)], {database, asArray: true});
    }));

    ControllerMixinView.setTemplate(this.state, 'templates/account/dashboard', {
      person,
      identifiers,
      activated: !!user.activated
    });
  }

  async action_change_person(){}
  async action_action_change_person_post(){}
}
