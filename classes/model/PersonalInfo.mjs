import { Model } from '@lionrockjs/central';

export default class PersonalInfo extends Model{
  person_id = null;
  name = null;
  value = null;

  static joinTablePrefix = 'personal_info';
  static tableName = 'personal_infos';

  static fields = new Map([
    ["name", "String!"],
    ["value", "String!"]
  ]);
  static belongsTo = new Map([
    ["person_id", "Person"]
  ]);
}