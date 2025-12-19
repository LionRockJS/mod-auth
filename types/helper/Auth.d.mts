import DefaultUser from '../model/User.mjs';
export default class HelperAuth {
    static getIdentifier(postData: any): any;
    static redirect(state: any, destination?: any): Promise<void>;
    static do_login(state: any, user: DefaultUser): Promise<void>;
}
