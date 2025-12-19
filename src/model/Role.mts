import { Model } from '@lionrockjs/central';

export default class Role extends Model{
  name = null;

  static joinTablePrefix = 'role';
  static tableName = 'roles';

  static fields = new Map([
    ["name", "String"]
  ]);
}