import { Controller } from '@lionrockjs/mvc';
import { Central, ORM, ControllerMixinDatabase } from '@lionrockjs/central';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import DefaultIdentifier from "../identifier/Identifier.mjs";
import ControllerMixinAuth from '../controller-mixin/Auth.mjs';

import DefaultLogin from '../model/Login.mjs';
const Login = await ORM.import('Login', DefaultLogin);

export default class HelperAuth {
  static getIdentifier(postData){
    for(let i=0; i<Central.config.auth.identifiers.length; i++){
      const it = Central.config.auth.identifiers[i];
      if(it.isPostDataContainsIdentifierField(postData)) return it;
    }
    return DefaultIdentifier;
  }

  static async redirect(state, destination=null){
    const $_GET  = state.get(ControllerMixinMultipartForm.GET_DATA);
    const $_POST = state.get(ControllerMixinMultipartForm.POST_DATA);
    const client = state.get(Controller.STATE_CLIENT);

    await client.redirect($_POST['destination'] || $_GET['cp'] || destination || Central.config.auth.destination);
  }

  static async do_login(state, user) {
    const databases = state.get(ControllerMixinDatabase.DATABASES);
    const database = databases.get(state.get(ControllerMixinAuth.DATABASE_NAME));

    const request = state.get(Controller.STATE_REQUEST);

    const login = ORM.create(Login, { database });
    login.ip = state.get(Controller.STATE_CLIENT_IP);
    login.user_id = user.id;
    await login.write();

    const full_name = user.person ?
      (user.person.first_name + (user.person.last_name ? (" "+ user.person.last_name) : '')): ''

    Object.assign(request.session, {
      logged_in: true,
      user_id: user.id,
      roles: user.roles.map(it => it.name),
      role_ids: user.roles.map(it => it.id),
      user_meta: {
        full_name
      },
    });

    state.set('user', user);
  }
}