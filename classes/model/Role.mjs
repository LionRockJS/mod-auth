import { ORM } from '@lionrockjs/central';

export default class Role extends ORM{
  name = null;

  static joinTablePrefix = 'role';
  static tableName = 'roles';

  static fields = new Map([
    ["name", "String"]
  ]);
}