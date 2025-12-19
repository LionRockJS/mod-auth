import { Model } from '@lionrockjs/central';
export default class PersonalInfo extends Model {
    person_id: any;
    name: any;
    value: any;
    static joinTablePrefix: string;
    static tableName: string;
    static fields: Map<string, string>;
    static belongsTo: Map<string, string>;
}
