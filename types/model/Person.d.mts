import { Model } from '@lionrockjs/central';
export default class Person extends Model {
    first_name: any;
    last_name: any;
    static joinTablePrefix: string;
    static tableName: string;
    static fields: Map<string, string>;
    static hasMany: [string, string][];
}
