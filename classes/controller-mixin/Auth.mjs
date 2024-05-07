import { Controller, ControllerMixin } from '@lionrockjs/mvc';
import { ControllerMixinDatabase, ORM } from '@lionrockjs/central';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import HelperAuth from '../helper/Auth.mjs';

import DefaultUser from '../model/User.mjs';
const User = await ORM.import('User', DefaultUser);

export default class ControllerMixinAuth extends ControllerMixin {
  static USER = 'user';

  static DATABASE_NAME = 'adminDatabaseName';

  static IDENTIFIER_DATABASE_NAME = 'identifierDatabaseName';

  static init(state) {
    state.set(this.DATABASE_NAME, state.get(this.DATABASE_NAME) || 'admin');
    state.set(this.IDENTIFIER_DATABASE_NAME, state.get(this.IDENTIFIER_DATABASE_NAME) || 'admin');
  }

  static async action_login_post(state) {
    const databases = state.get(ControllerMixinDatabase.DATABASES);
    const database = databases.get(state.get(this.DATABASE_NAME));
    const identifierDatabase = databases.get(state.get(this.IDENTIFIER_DATABASE_NAME));

    const postData = state.get(ControllerMixinMultipartForm.POST_DATA);
    const Identifier = HelperAuth.getIdentifier(postData);
    const identifierName = await Identifier.getName(postData);

    const identifierInstance = await ORM.readBy(Identifier.Model, 'name', [identifierName], { database: identifierDatabase, asArray: false, limit: 1 });
    if (!identifierInstance) throw new Error('Identifier not found');
    Object.assign(identifierInstance, await Identifier.loginFilter(identifierInstance, postData, state));

    try {
      const user = await ORM.factory(User, identifierInstance.user_id, { database });
      await user.eagerLoad({
        with: ['Role'],
      });

      await HelperAuth.do_login(state, user);
      await HelperAuth.redirect(state, postData.destination);
    } catch (e) {
      state.set(this.USER, null);
      await HelperAuth.redirect(state, `/login/fail?cp=${encodeURIComponent(postData.destination)}`);
    }
  }

  static async action_logout(state) {
    const {session} = state.get(Controller.STATE_REQUEST);

    Object.assign(session, {
      logged_in: false,
      user_id: null,
      roles: null,
      role_ids: null,
      user_meta: null,
    });

    state.set(this.USER, null);
  }
}
