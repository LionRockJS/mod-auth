import { ControllerMixin } from '@lionrockjs/central';
export default class ControllerMixinAccount extends ControllerMixin {
    static PERSON: string;
    static DATABASE_NAME: string;
    static init(state: any): void;
    static setup(state: any): Promise<void>;
    static action_change_person(state: any): Promise<void>;
    static action_change_person_post(state: any): Promise<void>;
}
