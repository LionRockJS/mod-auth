import { ControllerMixin } from '@lionrockjs/central';
export default class ControllerMixinAuth extends ControllerMixin {
    static USER: string;
    static DATABASE_NAME: string;
    static IDENTIFIER_DATABASE_NAME: string;
    static init(state: any): void;
    static action_login_post(state: any): Promise<void>;
    static action_logout(state: any): Promise<void>;
}
