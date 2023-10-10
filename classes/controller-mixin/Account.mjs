import { Controller, ControllerMixin } from '@lionrockjs/mvc';
import { ControllerMixinDatabase, ORM } from '@lionrockjs/central';
import { ControllerMixinMultipartForm } from '@lionrockjs/mod-form';
import ControllerMixinAuth from './Auth.mjs';

import User from '../model/User.mjs';
import Person from '../model/Person.mjs';

export default class ControllerMixinAccount extends ControllerMixin {
  static PERSON = 'accountPerson';
  static DATABASE_NAME = ControllerMixinAuth.DATABASE_NAME;

  static init(state) {
    state.set(this.DATABASE_NAME, state.get(this.DATABASE_NAME) || 'admin');
  }

  static async setup(state){

  }

  static async action_change_person (state) {
    const client = state.get(Controller.STATE_CLIENT);
    const database = state.get(ControllerMixinDatabase.DATABASES).get(state.get(this.DATABASE_NAME));

    const userId = client.request.session.user_id;
    const user = await ORM.factory(User, userId, { database });
    await user.eagerLoad({
      with: [Person],
      person: { with: null },
    });

    state.set(this.PERSON, user.person);
  }

  static async action_change_person_post(state) {
    const client = state.get(Controller.STATE_CLIENT);
    const request = state.get(Controller.STATE_REQUEST);
    const database = state.get(ControllerMixinDatabase.DATABASES).get(state.get(this.DATABASE_NAME));
    const userId = client.request.session.user_id;
    const user = await ORM.factory(User, userId, { database });
    await user.eagerLoad({
      with: [Person],
      person: { with: null },
    });

    const $_POST = state.get(ControllerMixinMultipartForm.POST_DATA);
    const $_GET  = state.get(ControllerMixinMultipartForm.GET_DATA);

    Person.fields.forEach((v, k)=>{
      if(!$_POST[`:${k}`])return;
      user.person[k] = $_POST[`:${k}`];
    })

    await user.person.write();

    const user_meta = request.session.user_meta;
    if(user_meta){
      request.session.user_meta = Object.assign({}, user_meta, {full_name: false});
    }

    if($_POST['destination'] || $_GET['cp']){
      await client.redirect($_POST['destination'] || $_GET['cp']);
    }
  }
}
