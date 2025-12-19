import { ControllerMixin } from '@lionrockjs/central';
export default class ControllerMixinLoginRequire extends ControllerMixin {
    static REJECT_LANDING: string;
    static ALLOW_ROLES: string;
    static init(state: any): void;
    static before(state: any): Promise<void>;
}
