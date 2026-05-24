import { ControllerMixin, Central, ControllerMixinDatabase, ORM } from '@lionrockjs/central';
import { Controller, ControllerState } from '@lionrockjs/mvc';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import HelperAuth from '../helper/Auth.mjs';
import {
  DATABASE_NAME as AUTH_DATABASE_NAME,
  IDENTIFIER_DATABASE_NAME as AUTH_IDENTIFIER_DATABASE_NAME,
  USER as AUTH_USER,
} from '../constants/auth.mjs';

import DefaultUser from '../model/User.mjs';
import IdentifierUser from '../model/IdentifierUser.mjs';
const User = await ORM.import('User', DefaultUser);

export default class ControllerMixinAuth extends ControllerMixin {
  static USER = AUTH_USER;

  static DATABASE_NAME = AUTH_DATABASE_NAME;

  static IDENTIFIER_DATABASE_NAME = AUTH_IDENTIFIER_DATABASE_NAME;

  static init(state) {
    state.set(this.DATABASE_NAME, state.get(this.DATABASE_NAME) || Central.config.auth.databaseMapName);
    state.set(this.IDENTIFIER_DATABASE_NAME, state.get(this.IDENTIFIER_DATABASE_NAME) || Central.config.auth.databaseMapName);
  }

  static async action_login_post(state) {
    const databases = state.get(ControllerMixinDatabase.DATABASES);
    const database = databases.get(state.get(this.DATABASE_NAME));
    const identifierDatabase = databases.get(state.get(this.IDENTIFIER_DATABASE_NAME));

    const postData = state.get(ControllerMixinMultipartForm.POST_DATA);
    const Identifier = HelperAuth.getIdentifier(postData);
    const identifierName = await Identifier.getName(postData);

    /**
     * @type {Model}
     */
    const identifierInstance = await ORM.readBy(Identifier.Model, 'name', [identifierName], { database: identifierDatabase, asArray: false, limit: 1 }) as IdentifierUser;
    if (!identifierInstance) throw new Error('Identifier not found');
    Object.assign(identifierInstance, await Identifier.loginFilter(identifierInstance, postData, state));

    try {
      const user = await ORM.factory(User, identifierInstance.user_id, { database }) as DefaultUser;
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
    const {session} = state.get(ControllerState.REQUEST);

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
