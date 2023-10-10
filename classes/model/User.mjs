import { ORM } from '@lionrockjs/central';

export default class User extends ORM{
  person_id = null;
  activated = false;

  static joinTablePrefix = 'user';
  static tableName = 'users';

  static fields = new Map([
    ["activated", "Boolean"]
  ]);
  static belongsTo = new Map([
    ["person_id", "Person"]
  ]);
  static hasMany = [
    ["user_id", "IdentifierUser"],
    ["user_id", "Login"]
  ];
  static belongsToMany = new Set([
    "Role"
  ]);
}