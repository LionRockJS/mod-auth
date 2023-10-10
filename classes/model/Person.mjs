import { ORM } from '@lionrockjs/central';

export default class Person extends ORM{
  first_name = null;
  last_name = null;

  static joinTablePrefix = 'person';
  static tableName = 'persons';

  static fields = new Map([
    ["first_name", "String!"],
    ["last_name", "String"]
  ]);
  static hasMany = [
    ["person_id", "PersonalInfo"],
    ["person_id", "User"]
  ];
}