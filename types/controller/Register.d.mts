import { Controller } from '@lionrockjs/central';
export default class ControllerRegister extends Controller {
    static mixins: any[];
    constructor(request: any);
    action_register_post(): Promise<void>;
}
