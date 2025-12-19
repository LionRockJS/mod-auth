import { Controller } from '@lionrockjs/central';
export default class ControllerRegister extends Controller {
    static mixins: typeof import("@lionrockjs/central").ControllerMixin[];
    constructor(request: any);
    action_register_post(): Promise<void>;
}
