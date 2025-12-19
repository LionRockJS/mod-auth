import { Model } from '@lionrockjs/central';
export default class IdentifierUser extends Model {
    user_id: any;
    name: any;
    static joinTablePrefix: string;
    static tableName: string;
    static fields: Map<string, string>;
    static belongsTo: Map<string, string>;
}
