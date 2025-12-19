import { Model } from '@lionrockjs/central';
import Person from './Person.mjs';
import Role from './Role.mjs';

export default class User extends Model{
  person: Person;
  roles: Role[];
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
  static hasMany: [string, string][] = [
    ["user_id", "IdentifierUser"],
    ["user_id", "Login"]
  ];
  static belongsToMany = new Set([
    "Role"
  ]);
}