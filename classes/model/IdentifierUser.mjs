import { ORM } from '@lionrockjs/central';

export default class IdentifierUser extends ORM{
  user_id = null;
  name = null;

  static joinTablePrefix = 'identifier_user';
  static tableName = 'identifier_users';

  static fields = new Map([
    ["name", "String!"]
  ]);
  static belongsTo = new Map([
    ["user_id", "User"]
  ]);
}