import { Model } from '@lionrockjs/central';

export default class Login extends Model{
  user_id = null;
  ip = null;
  note = null;

  static joinTablePrefix = 'login';
  static tableName = 'logins';

  static fields = new Map([
    ["ip", "String"],
    ["note", "String"]
  ]);
  static belongsTo = new Map([
    ["user_id", "User"]
  ]);
}