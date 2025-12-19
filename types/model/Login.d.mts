import { Model } from '@lionrockjs/central';
export default class Login extends Model {
    user_id: any;
    ip: any;
    note: any;
    static joinTablePrefix: string;
    static tableName: string;
    static fields: Map<string, string>;
    static belongsTo: Map<string, string>;
}
