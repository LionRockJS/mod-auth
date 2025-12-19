import { Model } from '@lionrockjs/central';
import Person from './Person.mjs';
import Role from './Role.mjs';
export default class User extends Model {
    person: Person;
    roles: Role[];
    person_id: any;
    activated: boolean;
    static joinTablePrefix: string;
    static tableName: string;
    static fields: Map<string, string>;
    static belongsTo: Map<string, string>;
    static hasMany: [string, string][];
    static belongsToMany: Set<string>;
}
