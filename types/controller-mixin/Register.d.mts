import { ControllerMixin } from '@lionrockjs/central';
export default class ControllerMixinRegister extends ControllerMixin {
    static DATABASE_NAME: string;
    static IDENTIFIER_DATABASE_NAME: string;
    static STATE_ALLOW_POST_ASSIGN_ROLE: string;
    static init(state: any): void;
    static action_register_post(state: any): Promise<void>;
}
