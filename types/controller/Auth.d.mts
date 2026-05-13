import { Controller } from '@lionrockjs/mvc';
export default class ControllerAuth extends Controller {
    static mixins: typeof import("@lionrockjs/central").ControllerMixin[];
    constructor(request: any);
    action_login(): Promise<void>;
    action_login_post(): Promise<void>;
    action_fail(): Promise<void>;
    action_logout(): Promise<void>;
}
