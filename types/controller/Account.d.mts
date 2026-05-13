import { Controller } from '@lionrockjs/mvc';
export default class ControllerAccount extends Controller {
    static mixins: typeof import("@lionrockjs/central").ControllerMixin[];
    /**
     *
     * @param request
     * @param opts
     * @param opts.databaseMap
     * @param opts.allowRoles
     * @param opts.rejectLanding
     * @param opts.layout
     */
    constructor(request: any, opts?: any);
    before(): Promise<void>;
    action_index(): Promise<void>;
    action_change_person(): Promise<void>;
    action_action_change_person_post(): Promise<void>;
}
