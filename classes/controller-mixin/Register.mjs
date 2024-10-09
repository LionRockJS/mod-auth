import { ControllerMixin, Central, ORM, ControllerMixinDatabase } from '@lionrockjs/central';
import { ControllerMixinMultipartForm } from '@lionrockjs/mixin-form';
import ControllerMixinAuth from './Auth.mjs';
import HelperAuth from "../helper/Auth.mjs";

import DefaultUser from '../model/User.mjs';
import DefaultPerson from '../model/Person.mjs';
import DefaultRole from '../model/Role.mjs';

const User = await ORM.import('User', DefaultUser);
const Person = await ORM.import('Person', DefaultPerson);
const Role = await ORM.import('Role', DefaultRole);

export default class ControllerMixinRegister extends ControllerMixin {
  static DATABASE_NAME = ControllerMixinAuth.DATABASE_NAME;
  static IDENTIFIER_DATABASE_NAME = ControllerMixinAuth.IDENTIFIER_DATABASE_NAME;

  static init(state) {
    state.set(this.DATABASE_NAME, state.get(this.DATABASE_NAME) || Central.config.auth.databaseMapName);
    state.set(this.IDENTIFIER_DATABASE_NAME, state.get(this.IDENTIFIER_DATABASE_NAME) || Central.config.auth.databaseMapName);
  }

  static async action_register_post(state) {
    const databases = state.get(ControllerMixinDatabase.DATABASES);
    const database = databases.get(state.get(ControllerMixinAuth.DATABASE_NAME));
    const identifierDatabase = databases.get(state.get(ControllerMixinAuth.IDENTIFIER_DATABASE_NAME));

    const postData = state.get(ControllerMixinMultipartForm.POST_DATA);

    //select identifier by post data
    const Identifier = HelperAuth.getIdentifier(postData);

    //check identifier exist
    const identifierName = await Identifier.getName(postData);
    const existIdentifier = await ORM.readBy(Identifier.Model, 'name', [identifierName], { database: identifierDatabase, limit: 1, asArray: false });

    if (existIdentifier){
      throw new Error(`User Name ${identifierName} already registered.`);
    }

    //determine roles
    let roles = [];
    if (Central.config.register.allowPostAssignRoleID && postData.roles) {
      roles = postData.roles;
    }

    if (roles.length === 0) {
      roles = [Central.config.register.defaultRole || 'member'];
    }

    // create default Person to get person id
    const person = ORM.create(Person, { database });
    //:extract personal info from post data;
    person.first_name = postData.first_name || identifierName;
    person.last_name = postData.last_name ?? '';

    //:store personal info/
    await person.write();

    //create user with person id
    const user = ORM.create(User, { database });
    user.person_id = person.id;
    user.activated = !Central.config.auth.requireActivate;
    await user.write();

    //user add roles
    const records = await ORM.readBy(Role, 'name', roles, { database, asArray: true });
    await Promise.all(
      records.map(async role => {
        await user.add(role);
      }),
    );

    user.person = person;
    user.roles = records;

    //save identifier to database
    const result = ORM.create(Identifier.Model, { database: identifierDatabase });
    result.user_id = user.id;
    result.name = identifierName;
    Object.assign(result, await Identifier.registerFilter(result, postData, state));
    await result.write();

    state.set(ControllerMixinAuth.USER, user);
  }
}